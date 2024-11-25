const asyncHandler = require("express-async-handler");
const ProductModel = require("../model/Product.model");
const { publishMessage } = require("../pubsub/publisher");

// Create a new product
const createProducts = asyncHandler(async (req, res, next) => {
  try {
    const { name, description, category, brand, tags, variants } = req.body;

    // Validate required fields
    if (!name || !description || !category || !brand) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = new ProductModel({
      name,
      description,
      category,
      brand,
      tags,
      variants,
    });
    await product.save();

    // Publish message
    publishMessage("create_product", product);

    res.status(201).json({ product, message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Get all products
const getProducts = asyncHandler(async (req, res, next) => {
  try {
    const { category, brand, tags, minPrice, maxPrice, sort, page, limit } =
      req.query;

    // Build the pipeline
    const pipeline = [];

    // Filtering Stage (only add if query parameters exist)
    const matchStage = {};
    if (category) matchStage.category = category;
    if (brand) matchStage.brand = brand;
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
      const sortStage = { [key]: order === "desc" ? -1 : 1 };
      pipeline.push({ $sort: sortStage });
    }

    // Pagination
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: pageSize });

    // Fetch products
    const products = await ProductModel.aggregate(pipeline);

    // Check if products exist
    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    publishMessage("getProducts", products);

    // Respond with products
    res.status(200).json({
      products,
      page: pageNumber,
      limit: pageSize,
      total: products.length,
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
    const product = await ProductModel.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    publishMessage("getProductsId", product);

    res
      .status(200)
      .json({ product, message: "Product retrieved successfully" });
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

    // sorting
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
