const asyncHandler = require("express-async-handler");
const UserModel = require("../model/UserModel");
const { publishMessage } = require("../pubsub/publisher");

const userAuthenticate = asyncHandler(async (req, res) => {
  try {
    const { emailAddress, firstName, lastName, userId, imageUrl, fullName } =
      req.body;
    // Find user by email
    const findUser = await UserModel.findOne({
      email: emailAddress,
    });

    if (!findUser) {
      // register the user in the database
      const newUser = new UserModel({
        firstName: firstName,
        lastName: lastName,
        userId: userId,
        email: emailAddress,
        imageUrl: imageUrl,
        fullName: fullName,
      });
      await newUser.save();
      publishMessage("user_created", newUser);

      return res.status(201).json({
        message: "User created successfully",
        data: {
          fullName: findUser.fullName,
          email: findUser.email,
          imageUrl: findUser.imageUrl,
          fullName: findUser.fullName,
        },
      });
    }
    publishMessage("user_created", findUser);
    return res.status(200).json({
      message: "User authenticated successfully",
      data: {
        fullName: findUser.fullName,
        email: findUser.email,
        imageUrl: findUser.imageUrl,
        fullName: findUser.fullName,
      },
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
