const ProductModel = require("../model/Product.model");

const getSimilarProduct = async (productId) => {
  try {
    const product = await ProductModel.findById(productId);
    if (!product) return [];

    const similarProducts = await ProductModel.aggregate([
      {
        $match: {
          _id: { $ne: productId },
          $or: [
            { category: product.category },
            { brand: product.brand },
            { tags: { $in: product.tags } },
          ],
        },
      },
      {
        $sample: { size: 5 },
      },
    ]);
    return similarProducts;
  } catch (error) {
    console.log("error fetching similar products ", error);
  }
};

module.exports = getSimilarProduct;