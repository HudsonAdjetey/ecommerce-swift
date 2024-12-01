const mongoose = require("mongoose");

const UserInteractionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  interactionType: {
    type: String,
    enum: ["Like", "Dislike", "Share", "Comment", "view", "purchase"],
    required: true,
  },
});

const UserInteractionModel = mongoose.model(
  "UserInteraction",
  UserInteractionSchema
);
module.exports = UserInteractionModel;
