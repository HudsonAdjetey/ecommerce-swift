const express = require("express");
const upload = require("../utils/upload"); // Import your multer configuration
const protectedRouteMiddleware = require("../middleware/authMiddleware");
const ProductRouter = express.Router();

// Endpoint to handle product creation with image upload
ProductRouter.post("/create-product", upload, (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Extract image paths
    const imagePaths = req.file;

    // Extract product data from the request body
    const { name, description, price, category } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save the product
    const newProduct = {
      name,
      description,
      price,
      category,
      images: imagePaths, // Attach image paths to the product
    };

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving product", error });
  }
});

module.exports = ProductRouter;
