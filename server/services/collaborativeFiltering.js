const { default: mongoose } = require("mongoose");
const UserInteractionModel = require("../model/UserInteraction.model");
const ProductModel = require("../model/Product.model");

const getCollaborativeRecommendation = async (productId) => {
  try {
    // Convert the productId to an ObjectId
    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Finding users who interacted with the product
    const userInteractions = await UserInteractionModel.aggregate([
      {
        $match: {
          productId: productObjectId,
          interactionType: { $in: ["like", "purchase", "favorite", "view"] },
        },
      },
      {
        $group: {
          _id: "$userId", 
        },
      },
    ]);

    const userIds = userInteractions.map((interaction) => interaction._id);

    const collaborativeProducts = await UserInteractionModel.aggregate([
      {
        $match: {
          userId: { $in: userIds },
          productId: { $ne: productObjectId },
        },
      },
      {
        $group: {
          _id: "$productId",
          interactionCount: { $sum: 1 },
        },
      },
      {
        $sort: { interactionCount: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    const productIds = collaborativeProducts.map((product) => product._id);

    const recommendedProducts = await ProductModel.find({
      _id: { $in: productIds },
    });

    return recommendedProducts;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching collaborative recommendations.");
  }
};

module.exports = { getCollaborativeRecommendation };
