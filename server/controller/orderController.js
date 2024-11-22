const asyncHandler = require("express-async-handler");
const OrderModel = require("../model/Order.model");
const CartModel = require("../model/Cart.model");
const { generateCacheKey, setCache, getCache } = require("../utils/cacheUtils"); 

// Create Order
const createOrder = asyncHandler(async (req, res, next) => {
  try {
    const { shippingAddress, paymentStatus } = req.body;

    // Find the user's cart
    const cart = await CartModel.findOne({ userId: req.user.userId }).populate(
      "items.productId"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty. Cannot create an order.",
      });
    }

    // Calculate the total amount
    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    // Create and save the order
    const order = new OrderModel({
      userId: req.user.userId,
      items: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        variantId: item.variantId,
        // subtotal
        subtotal: item.quantity * item.price,
      })),
      totalAmount,
      paymentStatus: paymentStatus || "Pending",
      shippingAddress,
      orderStatus: "Processing",
    });

    await order.save();

    // Invalidate cached orders for the user
    const cacheKey = generateCacheKey("userOrders", req.user.userId);
    await deleteCache(cacheKey);

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "Error creating order.",
    });
    next(error);
  }
});

// Get User Orders
const getUserOrders = asyncHandler(async (req, res, next) => {
  try {
    const cacheKey = generateCacheKey("userOrders", req.user.userId);

    // Check for cached data
    let orders = await getCache(cacheKey);
    if (!orders) {
      console.log("Cache miss: fetching orders from database...");
      orders = await OrderModel.find({ userId: req.user.userId }).populate(
        "items.productId"
      );

      if (!orders || orders.length === 0) {
        return res.status(404).json({
          message: "No orders found.",
        });
      }

      // Cache the orders
      await setCache(cacheKey, orders);
    } else {
      console.log("Cache hit: serving cached orders.");
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      message: "Error fetching orders.",
    });
    next(error);
  }
});

module.exports = { createOrder, getUserOrders };
