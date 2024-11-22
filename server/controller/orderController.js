const asyncHandler = require("express-async-handler");
const OrderModel = require("../model/Order.model");

const createOrder = asyncHandler(async (req, res, next) => {
  try {
    const { shippingAddress, paymentStatus } = req.body;

    // Find the user's cart
    const cart = await CartModel.findOne({ userId: req.user.userId }).populate(
      "items.productId"
    );
    if (!cart || cart.length === 0) {
      return res.status(400).json({
        message: "Cart is empty. Cannort create an order",
      });
    }
    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const order = new OrderModel({
      userId: req.user.userId,
      items: cart.items.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          variantId: item.variantId,
        };
      }),
    });
  } catch (error) {}
});
