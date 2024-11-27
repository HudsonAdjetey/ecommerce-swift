const mongoose = require("mongoose");

const VariantSchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    attributes: {
      type: Map,
      of: String,
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
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  // Tracks when the variant is added or updated
  { timestamps: true }
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
      type: "string",
      required: true,
      set: function (value) {
        return value.toLowerCase();
      },
    },
    brand: {
      type: "string",
      required: true,
      set: function (value) {
        return value.toLowerCase();
      },
    },
    tags: [
      // For SEO and filtering (e.g., "shoes", "formal", "leather")
      {
        type: String,
        trim: true,
      },
    ],
    // Embedding the VariantSchema
    variants: [VariantSchema],
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
    type: String,
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
