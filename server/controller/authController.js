const asyncHandler = require("express-async-handler");
const UserModel = require("../model/User.model");
const userAuthenticate = asyncHandler(async (req, res, next) => {
  try {
    const { user } = req.auth;

    let isUser = UserModel.findOne({ email: user.primaryEmailAddress });

    if (!isUser) {
      // register the user in the database
      const registerNewUser = new UserModel({
        userId: user.id,
        email: user.primaryEmailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
      });
      await registerNewUser.save({
        new: true,
      });
      return res.status(200).json({
        message: "User registered successfully",
        user: registerNewUser,
      });
    }
    return res.status(200).json({
      message: "User authenticated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
    next(error);
  }
});

module.exports = {
  userAuthenticate,
};
