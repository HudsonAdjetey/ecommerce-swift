const express = require("express");
const { initPayment } = require("../controller/paymentController");
const PaymentRouter = express.Router();

PaymentRouter.post("/init-payment", initPayment);

module.exports = PaymentRouter;
