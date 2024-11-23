const asyncHandler = require("express-async-handler");
const CouponModel = require("../model/Coupon.model");
const CartModel = require("../model/Cart.model");

const applyCoupon = asyncHandler(async (req, res, next) => {
  try {
    const { code } = req.body;

    const coupon = await CouponModel.findOne({ code });
    // check if the coupon has expired
    if (new Date() > coupon.expiresAt) {
      await CouponModel.findOneAndDelete({ code });

      return res.status(400).json({ message: "Coupon has expired" });
    }

    const cart = await CartModel.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    //   check for minimum cart value
    const cartTotal = cart.items.reduce((acc, item) => acc + item.subtotal, 0);
    if (cartTotal < coupon.minValue) {
      return res.status(400).json({ message: "Cart value is too low" });
    }

    //   calculate the discount
    let discount = 0;
    if (coupon.type === "percentage") {
      discount = cartTotal * (coupon.value / 100);
    } else if (coupon.type === "fixed") {
      discount = coupon.value;
    }
    discount = Math.min(discount, cartTotal);

    //   update the cart
    cart.coupon = {
      code,
      discount,
    };
    cart.totalPrice = cart.totalPrice - discount;
    await cart.save();
    res.status(201).json({ message: "Coupon applied successfully" });
  } catch (error) {
    console.error(error?.message || error);
    res.status(500).json({
      message: "Failed to apply coupon",
    });
    next(error);
  }
});

const removeCoupon = asyncHandler(async (req, res, next) => {
  try {
    const cart = await CartModel.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }
    cart.coupon = { discount: 0, code: null };
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.subtotal, 0);
    await cart.save();

    res.status(200).json({
      message: "Coupon removed successfully",
      cart: cart.items.map((item) => ({
        ...item,
        subtotal: item.price * item.quantity,
      })),
    });
  } catch (error) {
    console.error("error removing coupon ", error);
    res.status(500).json({
      message: "Error removing coupon",
    });
    next(error);
  }
});

module.exports = {
  applyCoupon,
  removeCoupon,
};
