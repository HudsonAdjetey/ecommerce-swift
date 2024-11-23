const asyncHandler = require("express-async-handler");
const UserModel = require("../model/User.model");

const userAuthenticate = asyncHandler(async (req, res) => {
  try {
    const { user } = req.auth;

    // Find user by email
    const findUser = await UserModel.findOne({
      email: user.primaryEmailAddress,
    });

    if (!findUser) {
      // register the user in the database
      const newUser = new UserModel({
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user.id,
        email: user.primaryEmailAddress,
        imageUrl: user.imageUrl,
      });
      await newUser.save();
      return res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    }
    return res.status(200).json({
      message: "User authenticated successfully",
      user: findUser,
    });
  } catch (error) {
    console.error(error?.message || error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

module.exports = {
  userAuthenticate,
};
