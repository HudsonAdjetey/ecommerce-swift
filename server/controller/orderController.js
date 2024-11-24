const asyncHandler = require("express-async-handler");
const CartModel = require("../model/Cart.model");
const OrderModel = require("../model/Order.model");
const { generateCacheKey, deleteCache } = require("../utils/redisUtils");
const { startSession } = require("mongoose");
const { publishMessage } = require("../pubsub/publisher");

const createOrder = asyncHandler(async (req, res, next) => {
  const session = await startSession();

  try {
    session.startTransaction();

    const { paymentStatus, shippingAddress } = req.body;
    const validPaymentStatuses = [
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];
    if (!validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }
    // find the user's cart
    const cart = await CartModel.findOne({ userId: req.user.userId })
      .populate("items")
      .session(session);
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty or not found",
      });
    }

    // Calculate the total
    const totalAmount = cart.totalAmount;

    // Create and save the order
    const order = new OrderModel({
      userId: req.user.userId,
      items: cart.items,
      totalAmount,
      paymentStatus: paymentStatus || "Pending",
      shippingAddress,
      orderStatus: "Processing",
    });
    await order.save({ session });

    await CartModel.findOneAndDelete({ userId: req.user.userId }).session(
      session
    );

    //   Invalidate cached orders for the user
    const cacheKey = generateCacheKey("usersOrder", req.user.userId);
    await deleteCache(cacheKey);
    publishMessage("create_order", order);
    await session.commitTransaction();

    res.status(200).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order", error);
    await session.abortTransaction();

    res.status(500).json({
      message: "Error creating order",
    });
  } finally {
    session.endSession();
  }
});

const getUserOrder = asyncHandler(async (req, res, next) => {
  try {
    const cacheKey = generateCacheKey("usersOrder", req.user.userId);
    const cachedOrder = await getCache(cacheKey);
    if (cachedOrder) {
      console.log("Retrieved order from cache");

      return res.status(200).json({
        message: "Order retrieved from cache",
        order: cachedOrder,
      });
    }
    console.log("Cache miss");
    const order = await OrderModel.findOne({
      userId: req.user.userId,
    }).populate("items");

    if (!order || order.items.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    await setCache(cacheKey, order);
    publishMessage("get_order", order);
    res.status(200).json({
      message: "Order retrieved successfully",
      order,
    });
  } catch (error) {
    console.error("Error retrieving order", error);
    res.status(500).json({
      message: "Error retrieving order",
    });
    next(error);
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    await setCache(generateCacheKey("usersOrder", order.userId), order);
    publishMessage("order_updated", order);

    res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order", error);
    res.status(500).json({
      message: "An error occurred while updating the order",
      error: error.message,
    });
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    await setCache(generateCacheKey("usersOrder", order.userId), null);
    publishMessage("order_deleted", order);
    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order", error);
    res.status(500).json({
      message: "An error occurred while deleting the order",
    });
  }
});

module.exports = {
  createOrder,
  getUserOrder,
  updateOrder,
  deleteOrder,
};
