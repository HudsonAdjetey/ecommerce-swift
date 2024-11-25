const express = require("express");
const upload = require("../utils/upload"); // Import your multer configuration
const protectedRouteMiddleware = require("../middleware/authMiddleware");
const { createProducts, getProducts, getProductById, updateProductById, deleteProductById } = require("../controller/ProductController");
const ProductRouter = express.Router();

// Endpoint to handle product creation with image upload
ProductRouter.post("/create-product", createProducts);
ProductRouter.get("/get-products", getProducts)
ProductRouter.get("/get-productsId/:productId", getProductById)
ProductRouter.put("/update-product/:productId", updateProductById)
ProductRouter.delete("/delete-product/:productId", deleteProductById)
ProductRouter.get("/search-products/:productId", searchProducts)
module.exports = ProductRouter;
