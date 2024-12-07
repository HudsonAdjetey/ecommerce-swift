const asyncHandler = require("express-async-handler");
const UserInteractionModel = require("../model/UserInteraction.model");
const TrendingProductModel = require("../model/TrendingTemp.model");
const ProductModel = require("../model/Product.model");

const trendingProducts = asyncHandler(async (req, res, next) => {
  try {
    // fetching mostly interacted products
    const mostInteractedProducts = await UserInteractionModel.find()
      .select(["-__v"])
      .exec();
    // get the products
    const products = await ProductModel.find({
      _id: { $in: mostInteractedProducts.map((product) => product.productId) },
    }).sort({ viewCount: -1 });

    // filter out the product with view count greate than 4
    const highCountedViewCount = products.filter(
      (product) => product.viewCount > 4
    );

    //   10 products to be listed
    let trendingProducts = highCountedViewCount.slice(0, 10);

    //   if not create additional ones
    if (trendingProducts.length < 10) {
      //   if fewer than the 10 expected products, create additional ones
      const additionalProducts = await ProductModel.find({
        _id: { $nin: trendingProducts.map((product) => product._id) },
      })
        .sort({ viewCount: -1 })
        .limit(10 - trendingProducts.length);

      const trendContainer = [...trendingProducts, ...additionalProducts];
      trendingProducts = trendContainer.map((prod) => {
        console.log(prod._id.toString());
        return {
          productName: prod.name,
          variants: prod.variants[0],
          productId: prod._id.toString(),
          viewCount: prod.viewCount,
          typeMain: prod.typeMain,
          category: prod.category,
          brand: prod.brand,
        };
      });
    }

    //   check for if there are any temporary products
    const temporaryProducts = await TrendingProductModel.findOne({
      expiresAt: { $gte: new Date() },
    });

    if (temporaryProducts) {
      return res.status(200).json({
        trendingProducts: temporaryProducts.products,
        message: "Trending products fetched",
      });
    }
    if (trendingProducts.length === 0) {
      // creating  temporary products
      const placeholderProduts = await ProductModel.find().limit(10);
      const filteredProducts = placeholderProduts.map((prod) => {
        return {
          productName: prod.name,
          variants: prod.variants[0],
          productId: prod._id.toString(),
          viewCount: prod.viewCount,
          typeMain: prod.typeMain,
          category: prod.category,
          brand: prod.brand,
        };
      });
      const temporaryProducts = new TrendingProductModel({
        products: filteredProducts,
        expiresAt: new Date(new Date().getTime() + 60 * 60 * 24 * 3 * 1000),
      });
      await temporaryProducts.save();

      return res.status(200).json({
        trendingProducts: filteredProducts,
      });
    }

    res.status(200).json({
      trendingProducts,
      message: "Trending products fetched",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching trending products" });
    next(error);
  }
});

module.exports = trendingProducts;
