const asyncHandler = require("express-async-handler");
const UserModel = require("../model/UserModel");

const checkAuthMiddleware = asyncHandler(async (req, res, next) => {
  if (!req.auth || !req.auth.userId) {
    return next();
  }

  const { userId } = req.auth;

  const user = await UserModel.findOne({ userId });
  if (user) {
    req.user = user;
    return next();
  } else {
    return next();
  }
});

module.exports = checkAuthMiddleware;
