const express = require("express");
const upload = require("../utils/upload"); // Import your multer configuration
const protectedRouteMiddleware = require("../middleware/authMiddleware");
const {
  createProducts,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  performProductSearch,
  searchProduct,
  getFetchSearch,
} = require("../controller/ProductController");
const checkAuthMiddleware = require("../middleware/authCheckMiddleware");
const ProductRouter = express.Router();

// Endpoint to handle product creation with image upload
ProductRouter.post("/create-product", createProducts);
ProductRouter.get("/get-products", getProducts);
ProductRouter.get(
  "/get-productsId/:productId",
  checkAuthMiddleware,
  getProductById
);
ProductRouter.put("/update-product/:productId", updateProductById);
ProductRouter.delete("/delete-product/:productId", deleteProductById);
// ProductRouter.get("/search-products", performProductSearch);
ProductRouter.get("/search-products", searchProduct);
module.exports = ProductRouter;
