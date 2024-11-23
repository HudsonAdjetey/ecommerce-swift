const asyncHandler = require("express-async-handler");
const ReviewModel = require("../model/Review.model");
const { generateCacheKey, setCache } = require("../utils/redisUtils");

const createAreview = asyncHandler(async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const cacheKey = generateCacheKey("review", productId);
    const userId = req.user.userId;
    // edge cases
    if (!userId || !producId) {
      res.status(400).json({
        message: "Please provide a valid user id and product id",
      });
    }
    if (!rating || !comment) {
      res.status(400).json({
        message: "Please provide a valid rating and comment",
      });
    }
    // create a new comment or review
    const review = new ReviewModel({
      userId,
      productId,
      rating,
      comment,
    });
    await setCache(cacheKey, review);
    await review.save();
    res.status(201).json({ message: "Created a review", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating a review" });
  }
});

// get the review of the specified product
const getReviews = asyncHandler(async (req, res) => {
  try {
    const cacheKey = generateCacheKey("reviews", req.params.productId);
    const cachedReviews = await getCache(cacheKey);
    if (cachedReviews) {
      res.json(cachedReviews);
      return;
    }
    const reviews = await ReviewModel.find({ productId: req.params.productId });

    // 


    await setCache(cacheKey, reviews);
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting reviews" });
  }
});
