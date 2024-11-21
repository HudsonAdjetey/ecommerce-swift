const mongoose = require("mongoose");

const VariantSchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId, // Unique identifier for the variant
      auto: true,
    },
    attributes: {
      type: Map,
      of: String, // Example: { color: "Red", size: "M" }
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    sku: {
      type: String, // Unique SKU for the variant
      required: true,
      unique: true,
      trim: true,
    },
    images: [
      {
        type: String, // Image URL for the specific variant
        required: false,
      },
    ],
  },
  { timestamps: true } // Tracks when the variant is added or updated
);

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: false,
    },
    tags: [
      // For SEO and filtering (e.g., "shoes", "formal", "leather")
      {
        type: String, 
        trim: true,
      },
    ],
    variants: [VariantSchema], // Embedding the VariantSchema
    ratings: {
      averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      totalRatings: {
        type: Number,
        default: 0,
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
