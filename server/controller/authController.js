const asyncHandler = require("express-async-handler");
const UserModel = require("../model/User.model");

const userAuthenticate = asyncHandler(async (req, res) => {
  try {
    const { user } = req.auth; 

    // Find user by email
    let isUser = await UserModel.findOne({ email: user.primaryEmailAddress });

    if (!isUser) {
      // Register the user in the database
      isUser = new UserModel({
        userId: user.id,
        email: user.primaryEmailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
      });
      await isUser.save();

      return res.status(201).json({
        message: "User registered successfully",
        user: isUser,
      });
    }

    // Return authenticated user
    return res.status(200).json({
      message: "User authenticated successfully",
      user: isUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

module.exports = {
  userAuthenticate,
};
