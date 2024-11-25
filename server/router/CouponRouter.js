const express = require("express");
const protectedRouteMiddleware = require("../middleware/authMiddleware");
const { applyCoupon, removeCoupon } = require("../controller/couponController");
const CouponRouter = express.Router();

CouponRouter.post("/apply-coupon", protectedRouteMiddleware, applyCoupon);
CouponRouter.delete("/remove-coupon", protectedRouteMiddleware, removeCoupon);

module.exports = CouponRouter;
