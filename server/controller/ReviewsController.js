const asyncHandler = require("express-async-handler");
const ReviewModel = require("../model/Review.model");
const {
  generateCacheKey,
  setCache,
  deleteCache,
  getCache,
} = require("../utils/redisUtils");
const { publishMessage } = require("../pubsub/publisher");
const UserModel = require("../model/UserModel");

const createAreaView = asyncHandler(async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const cacheKey = generateCacheKey("review", productId);
    const userId = req.user.userId;

    // Edge cases
    if (!userId || !productId) {
      return res.status(400).json({
        message: "Please provide a valid user ID and product ID",
      });
    }
    if (!rating || !comment) {
      return res.status(400).json({
        message: "Please provide a valid rating and comment",
      });
    }

    //   create a new comment or review
    const review = new ReviewModel({
      userId,
      productId,
      rating,
      comment,
      imageUrl: req.file.imgUrl,
    });
    const savedReview = await review.save();
    await setCache(cacheKey, savedReview);
    publishMessage(`review_created`, { review: savedReview });
    res.status(201).json({
      message: "Review created successfully",
      review: savedReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// get the reviews of the specified user
const getReviews = asyncHandler(async (req, res, next) => {
  try {
    const cacheKey = generateCacheKey("review", req.params.productId);
    const cachedReviews = await getCache(cacheKey);
    let reviews;

    if (cachedReviews) {
      reviews = JSON.parse(cachedReviews);
      if (process.env.NODE_ENV !== "production") {
        console.log(`Retrieved cache for key: ${cacheKey}`);
      }
    } else {
      reviews = await ReviewModel.findOne({
        productId: req.params.productId,
      }).sort({ createdAt: -1 });
      await setCache(cacheKey, reviews, 600);
    }

    const reviewWithUser = await Promise.all(
      reviews.map(async (review) => {
        const user = await UserModel.findOne({ userId: review.userId });
        return {
          ...review,
          user: user ? `${user.firstName} ${user.lastName}` : "unknown user",
        };
      })
    );
    //   call the publisher
    publishMessage(`reviews_retrieved`, { reviews: reviewWithUser });
    res.status(200).json({
      message: "Reviews retrieved successfully",
      reviews: reviewWithUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// delete a review
const deleteReview = asyncHandler(async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const cacheKey = generateCacheKey("review", req.params.productId);
    const userId = req.user.userId;
    const review = await ReviewModel.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (review.userId !== userId) {
      return res.status(403).json({
        message: "You are not authorized to delete this review",
      });
    }
    if (review.userId !== userId) {
      return res.status(403).json({
        message: "You are not authorized to delete this review",
      });
    }
    await ReviewModel.findByIdAndDelete(reviewId);
    await deleteCache(cacheKey);
    publishMessage(`review_deleted`, { reviewId: reviewId });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { createAreaView, getReviews, deleteReview };
