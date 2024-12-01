const asyncHandler = require("express-async-handler");
const ProductModel = require("../model/Product.model");
const { publishMessage } = require("../pubsub/publisher");
const { generateCacheKey, setCache, getCache } = require("../utils/redisUtils");
const UserInteractionModel = require("../model/UserInteraction.model");
const getSimilarProduct = require("../services/similarProductService");
const {
  getCollaborativeRecommendation,
} = require("../services/collaborativeFiltering");
// Create a new product
const createProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }

    // Validate each product's required fields
    for (let product of products) {
      const { name, description, category, brand, variants } = product;

      if (!name || !description || !category || !brand) {
        return res
          .status(400)
          .json({ message: "Missing required fields in one or more products" });
      }
    }

    // Check if any of the products already exist and need variants added
    for (let product of products) {
      const existingProduct = await ProductModel.findOne({
        name: product.name,
      });

      if (existingProduct) {
        // If product exists, ensure no duplicate SKUs in variants
        const existingVariantSkus = existingProduct.variants.map(
          (variant) => variant.sku
        );

        const newVariants = product.variants.filter(
          (variant) => !existingVariantSkus.includes(variant.sku)
        );

        if (newVariants.length > 0) {
          existingProduct.variants.push(...newVariants);
          await existingProduct.save();
        }
      }
    }

    // Insert new products (if they do not exist already)
    const productsToInsert = products.filter(async (product) => {
      const existingProduct = await ProductModel.findOne({
        name: product.name,
      });
      return !existingProduct;
    });

    if (productsToInsert.length > 0) {
      // Insert new products using insertMany
      await ProductModel.insertMany(productsToInsert);
    }

    // Publish message (you can replace with your own messaging system)
    productsToInsert.forEach((product) => {
      publishMessage("create_product", "products created successfully");
    });

    res.status(201).json({
      message: "Products created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Get all products
const getProducts = asyncHandler(async (req, res, next) => {
  const {
    category,
    brand,
    tags,
    minPrice,
    maxPrice,
    sort,
    page,
    limit,
    typeMain,
  } = req.query;

  // Generate a unique cache key based on all query parameters
  const cacheKey = generateCacheKey(`getProducts`, Object.values(req.query));

  try {
    // Check if the cache exists for the current query parameters

    const cachedProducts = await getCache(cacheKey);

    if (cachedProducts) {
      return res.status(200).json({
        message: "Products fetched from cache",
        products: cachedProducts && JSON.parse(cachedProducts),
      });
    }

    const pipeline = [];

    const matchStage = {};
    if (category) matchStage.category = category;
    if (brand) matchStage.brand = brand;
    if (typeMain) matchStage.typeMain = typeMain;
    if (tags) matchStage.tags = { $in: tags.split(",") };
    if (minPrice || maxPrice) {
      matchStage.price = {};
      if (minPrice) matchStage.price.$gte = parseFloat(minPrice);
      if (maxPrice) matchStage.price.$lte = parseFloat(maxPrice);
    }

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    // Sorting Stage
    if (sort) {
      const [key, order] = sort.split(":");
      const validSortKeys = ["name", "price", "rating"];
      if (validSortKeys.includes(key)) {
        const sortStage = { [key]: order === "desc" ? -1 : 1 };
        pipeline.push({ $sort: sortStage });
      }
    }

    // Pagination
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: pageSize });

    // Fetch total count of products without pagination (for pagination UI)
    const totalCount = await ProductModel.countDocuments(matchStage);

    // Fetch the products based on the query parameters
    const products = await ProductModel.aggregate(pipeline);

    // Check if products exist
    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    // Cache the products with the total count for future requests
    await setCache(cacheKey, JSON.stringify(products));
    publishMessage("getProducts", "products fetched successfully");
    res.status(200).json({
      products,
      page: pageNumber,
      limit: pageSize,
      total: totalCount,
      message: "Products retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Get a single product by ID
const getProductById = asyncHandler(async (req, res, next) => {
  try {
    // Generate cache key based on productId
    const cacheKey = generateCacheKey("getProductsId", req.params.productId);
    const recommendCacheKey = generateCacheKey(
      "recommendCacheId",
      req.params.productId
    );
    // Check if product data is in cache
    const cacheProducts = await getCache(cacheKey);
    const recommendedProducts = await getCache(recommendCacheKey);
    if (cacheProducts && recommendedProducts) {
      return res.status(200).json({
        message: "Product fetched from cache",
        products: cacheProducts,
        recommendations: recommendedProducts,
      });
    }

    // Fetch the product from the database
    const product = await ProductModel.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle user interaction for views
    if (req.user && req.user.userId) {
      const userInteractions = await UserInteractionModel.findOne({
        userId: req.user.userId,
      });

      if (userInteractions) {
        // Check if the product is already in the interaction history
        const isProductInInteraction =
          userInteractions.productId.toString() === req.params.productId;

        if (!isProductInInteraction) {
          // Log the view interaction for the product
          const newUserInteraction = new UserInteractionModel({
            userId: req.user.userId,
            productId: req.params.productId,
            interactionType: "view",
          });
          await newUserInteraction.save();
        }

        // Increment view count of the product
        const updateCount = await ProductModel.findByIdAndUpdate(
          req.params.productId,
          {
            $inc: { viewCount: 1 },
          }
        );
        if (updateCount) {
          console.log("Updated");
        }

        // Update the interaction history
        await UserInteractionModel.findByIdAndUpdate(userInteractions._id, {
          $push: { interactionHistory: { type: "view" } },
        });
      } else {
        // Create new interaction record if the user hasn't interacted before
        const newUserInteraction = new UserInteractionModel({
          userId: req.user.userId,
          productId: req.params.productId,
          interactionType: "view",
        });
        await newUserInteraction.save();
      }
    }

    // Set cache for the product data
    await setCache(cacheKey, product, 600);

    // Publish a message about the product view
    publishMessage("getProductsId", product);

    // Get recommendations based on content and collaborative filtering
    const contentBased = await getSimilarProduct(req.params.productId);
    const collaborativeBased = await getCollaborativeRecommendation(
      req.params.productId
    );

    // Combine recommendations without it  duplicating
    const recommendations = [
      ...contentBased,
      ...collaborativeBased.filter(
        (collabProd) =>
          !contentBased.some(
            (contentProd) =>
              contentProd._id.toString() === collabProd._id.toString()
          )
      ),
    ];
    // cache the rcommedations
    const newRecommendation = recommendations.map((recommendation) => {
      // return the first products
      return {
        ...recommendation,
        variants: recommendation.variants[0],
      };
    });
    console.log(recommendations);
    await setCache(recommendCacheKey, newRecommendation, 600);
    // Respond with the product and recommendations
    res.status(200).json({
      products: product,
      recommendations: newRecommendation,
      message: "Product retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Update a product by ID
const updateProductById = asyncHandler(async (req, res, next) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    publishMessage("update_product", product);

    res.status(200).json({
      product: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Delete a product by ID
const deleteProductById = asyncHandler(async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

const performProductSearch = asyncHandler(async (req, res, next) => {
  try {
    const {
      query,
      category,
      brand,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 10,
      autocomplete,
    } = req.query;

    //   Mongodb atlas search aggregation pipeline
    const pipeline = [];

    // Atlas search stage for full-text search or automcomplete
    if (query) {
      //   choose search type - autocomplete or fuzzy search
      if (autocomplete) {
        pipeline.push({
          $search: {
            index: "default",
            autocomplete: {
              query: query,
              path: ["name", "variants", "tags", "description", "attributes"],
              fuzzy: { maxEdits: 2 },
            },
          },
        });
      } else {
        pipeline.push({
          $search: {
            index: "default",
            query: query,
            path: ["name", "variants", "tags", "description", "attributes"],
            fuzzy: { maxEdits: 2 },
          },
        });
      }
    }

    //   Adding additional or optional filters(s) to - (category, brand, price range)
    const matchStage = {};
    if (category) matchStage.category = category;
    if (brand) matchStage.brand = brand;
    if (minPrice || maxPrice) {
      matchStage.price = {};
      if (minPrice) matchStage.price.$gte = parseFloat(minPrice);
      if (maxPrice) matchStage.price.$lte = parseFloat(maxPrice);
    }
    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }
    // Sorting
    if (sort) {
      const [key, order] = sort.split(":");
      pipeline.push({ $sort: { [key]: order === "desc" ? -1 : 1 } });
    } else {
      pipeline.push({ $sort: { _id: -1 } });
    }
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: parseInt(limit) });

    pipeline.push({
      $project: {
        _id: 1,
        name: 1,
        price: 1,
        image: 1,
        brand: 1,
        category: 1,
        tags: 1,
        description: 1,
        attributes: 1,
        searchScore: { $meta: "searchScore" },
      },
    });

    const products = await ProductModel.aggregate(pipeline);
    res.status(200).json({
      products,
      page: parseInt(page),
      limit: parseInt(limit),
      total: products.length,

      message: "Products retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
    next(error);
  }
});

module.exports = {
  createProducts,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  performProductSearch,
};
