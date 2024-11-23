const asyncHandler = require("express-async-handler");
const { startSession } = require("mongoose");
const { Paystack } = require("paystack-sdk");
const OrderModel = require("../model/Order.model");
const paystack = new Paystack(process.env.PAYSTACK_PRIVATE_KEY);

const initPayment = asyncHandler(async (req, res, next) => {
  const session = await startSession();
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
      return res.status(400).json({
        message: "Invalid order amount",
      });
    }

    //   create payment intent
    const transactionResponse = await paystack.transaction.initialize({
      apiKey: process.env.PAYSTACK_PUBLIC_KEY,
      email: req.user.primaryEmailAddress,
      amount: totalAmount,
      currency: "GHS",
      reference: order._id.toString(),
    });

    if (transactionResponse?.status !== "success") {
      return res
        .status(400)
        .json({ message: "Failed to create payment intent" });
    }

    order.paymentIntentId = transactionResponse?.data.id;
    order.status = "Processing";
    await order.save({ session });

    // Commit transaction
    await session.commitTransaction();

    return res.status(200).json({
      message: "Payment intent created successfully",
      data: transactionResponse.data,
    });
  } catch (error) {
    console.error("Error initializing intent", error);
    await session.abortTransaction();
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    session.endSession();
  }
});

module.exports = { initPayment };
