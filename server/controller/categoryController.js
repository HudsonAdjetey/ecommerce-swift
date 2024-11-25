const asyncHandler = require("express-async-handler");
const CategoryModel = require("../model/Category.model");

const getCategories = asyncHandler(async (req, res) => {
  try {
    // Fetch categories from your database
    const categories = await CategoryModel.find().exec();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

module.exports = { getCategories };
