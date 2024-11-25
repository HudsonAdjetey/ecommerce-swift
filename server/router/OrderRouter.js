const express = require("express");
const protectedRouteMiddleware = require("../middleware/authMiddleware");
const {
  createOrder,
  getUserOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");
const OrderRouter = express.Router();

OrderRouter.post("/create-order/", protectedRouteMiddleware, createOrder);
OrderRouter.get("/get-user-order/", protectedRouteMiddleware, getUserOrder);
OrderRouter.put("/update-user-order/", protectedRouteMiddleware, updateOrder);
OrderRouter.delete("/cancel-order/", protectedRouteMiddleware, deleteOrder);

OrderRouter.post("/create-order", protectedRouteMiddleware);

module.exports = OrderRouter;