const asyncHandler = require("express-async-handler");
const UserModel = require("../model/User.model");

const protectedRouteMiddleware = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req.auth;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await UserModel.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectedRouteMiddleware:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = protectedRouteMiddleware;
