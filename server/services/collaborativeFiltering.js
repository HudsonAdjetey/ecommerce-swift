const { default: mongoose } = require("mongoose");
const UserInteractionModel = require("../model/UserInteraction.model");
const ProductModel = require("../model/Product.model");

const getCollaborativeRecommendation = async (productId) => {
  // finding users who interacted with the product
  const userInteractions = await UserInteractionModel.aggregate([
    {
      $match: {
        productId,
        interactionType: { $in: ["like", "purchase", "favorite"] },
      },
    },
    {
      $group: {
        _id: "$userId",
      },
    },
  ]);

  const userIds = userInteractions.map((interaction) => interaction._id);

  // get products that users interacted with
  const collaborativeProducts = await UserInteractionModel.aggregate([
    {
      $match: {
        userId: { $in: userIds },
        productId: { $ne: mongoose.Types.ObjectId(productId) },
      },
      $group: {
        _id: "$productId",
        // counting interactions
        interactionCount: { $sum: 1 },
      },
    },
    {
      // sorting by the most interacted products
      $sort: { interactionCount: -1 },
    },
    //   returning the top 5 recommendations
    {
      $limit: 5,
    },
  ]);
  const productIds = collaborativeProducts.map((product) => product._id);
  const recommendedProducts = await ProductModel.find({
    _id: { $in: productIds },
  });

  return recommendedProducts;
};

module.exports = { getCollaborativeRecommendation };
