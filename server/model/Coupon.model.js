const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ["fixed", "percentage"], required: true },
  value: { type: Number, required: true },
  minCartValue: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true },
  restrictions: {
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    variants: [{ type: mongoose.Schema.Types.ObjectId }],
  },
});

const CouponModel = mongoose.model("Coupon", couponSchema);
module.exports = CouponModel;
