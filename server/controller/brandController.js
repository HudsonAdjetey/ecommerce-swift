const asyncHandler = require("express-async-handler");
const BrandModel = require("../model/brand.model");

const getBrand = asyncHandler(async (req, res, next) => {
  try {
    const brandId = req.params.brandId;
    const brand = await BrandModel.findById(brandId).populate("products");
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({
      message: "Brand retrieved successfully",
      brand,
    });
  } catch (error) {
      console.error(error?.message)
      res.status(500).json({
          message: "Error fetching brands"
      })
  }
});
