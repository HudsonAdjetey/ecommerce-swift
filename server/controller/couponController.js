const asyncHandler = require("express-async-handler");
const CouponModel = require("../model/Coupon.model");
const CartModel = require("../model/Cart.model");

// apply coupon

const applyCoupon = asyncHandler(async (req, res, next) => {
  try {
    const { couponCode } = req.body;

    // validate coupon code
    const coupon = await CouponModel.findOne({ code: couponCode });
    if (!coupon) {
      return res.status(400).json({ message: "Invalid coupon code" });
    }
    // check if coupon has expired
    if (new Date() > coupon.expiresAt) {
      return res.status(400).json({ message: "Coupon has expired" });
    }
    //   fetch users cart
    const cart = await CartModel.findOne({ userId: req.user.userId });
    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    //   check minimum cart value
    const cartTotal = cart.items.reduce((total, item) => total + item.subtotal);
    if (cartTotal < coupon.minCartValue) {
      return res.status(400).json({
        message: "Your cart value is below the minimum required value",
      });
    }

    // calculate the discount value
    let discount = 0;
    if (coupon.type === "percentage") {
      discount = cartTotal * (coupon.value / 100);
    } else if (coupon.type === "fixed") {
      discount = coupon.value;
    }
    discount = Math.min(discount, cartToal);

    //   update the cart with coupon details
    cart.coupon = {
      code: coupon.code,
      discount,
    };
    cart.totalPrice = cartTotal - discount;
    await cart.save();
    res.status(200).json({ message: "Coupon applied successfully" });
  } catch (error) {
    console.error("Error applying coupon ", error);
    res.status(500).json({
      message: "Error applying coupon",
    });
    next(error);
  }
});

const removeCoupon = asyncHandler(async (req, res, next) => {
  try {
    const cart = await CartModel.findOne({ userId: req.user.id });
    if (!cart || !cart.coupon.code) {
      return res.status(400).json({ message: "No coupon applied" });
    }
    //   remove coupon and recalculate the total
    cart.coupon = { code: null, discount: 0 };
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.subtotal,
      0
    );
    res.status(200).json({
      message: "Coupon removed successfully",
      cart: cart.items.map((item) => ({ ...item, subtotal: item.price })),
    });
  } catch (error) {
    console.error("Error removing coupon ", error);
    res.status(500).json({
      message: "Error removing coupon",
    });
  }
});

module.exports = { applyCoupon, removeCoupon };
