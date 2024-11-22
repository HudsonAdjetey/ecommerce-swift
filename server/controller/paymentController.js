const asyncHandler = require("express-async-handler");
const { startSession } = require("mongoose");
const CartModel = require("../model/Cart.model");
const OrderModel = require("../model/Order.model");
const { Paystack } = require("paystack-sdk");
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

const initPayment = asyncHandler(async (req, res, next) => {
  const session = await startSession();
  // Start a session
  try {
    session.startTransaction();

    const order = await OrderModel.findOne({ userId: req.user.userId })
      .populate("items")
      .session(session);
    if (!order || order.items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const totalAmount = order.totalAmount;
    if (totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid total amount" });
    }

    // Create payment intent
    const transactionResponse = await paystack.transaction.initialize({
      apiKey: process.env.PUBLIC_KEY,
      email: req.user.primaryEmailAddress,
      amount: totalAmount * 100,
      reference: req.body.reference,
    });

    if (transactionResponse?.status !== "success") {
      throw new Error("Payment initialization failed");
    }

    // Update order with payment details
    order.paymentIntentId = transactionResponse.data.id;
    await order.save({ session });

    // Remove order and cart
    await OrderModel.deleteOne({ userId: req.user.userId }).session(session);
    await CartModel.findOneAndDelete({ userId: req.user.userId }).session(
      session
    );

    // Commit transaction
    await session.commitTransaction();

    return res.status(200).json({
      message: "Payment intent created successfully",
      data: transactionResponse.data,
    });
  } catch (error) {
    console.error("Error initializing payment: ", error);
    // Abort transaction in case of failure
    await session.abortTransaction();
    return res.status(500).json({
      message: "Error initializing payment intent",
    });
  } finally {
    // Always end session
    session.endSession();
  }
});

module.exports = { initPayment };
