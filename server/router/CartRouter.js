const express = require("express");
const CartRouter = express.Router();
const {
  addToCart,
  getProductFromCart,
  removeProductFromCart,
  updateCart,
} = require("../controller/CartController");
const protectedRouteMiddleware = require("../middleware/authMiddleware");

CartRouter.post(
  "/cart-product/:productId",
  protectedRouteMiddleware,
  addToCart
);
CartRouter.get(
  "/get-product-cart/",
  protectedRouteMiddleware,
  getProductFromCart
);
CartRouter.delete(
  "/remove-product-cart/",
  protectedRouteMiddleware,
  removeProductFromCart
);

CartRouter.put("/update-product-cart/", protectedRouteMiddleware, updateCart);

module.exports = CartRouter;
