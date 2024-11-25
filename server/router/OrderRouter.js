const express = require('express');
const protectedRouteMiddleware = require('../middleware/authMiddleware');
const OrderRouter = express.Router()


OrderRouter.post("/create-order", protectedRouteMiddleware, )