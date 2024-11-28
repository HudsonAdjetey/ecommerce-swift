const mongoose = require("mongoose");
const { Schema } = mongoose;

// Variant Schema
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
      validate: {
        validator: (value) => value > 0,
        message: "Price must be greater than zero.",
      },
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: (value) => value >= 0,
        message: "Stock cannot be negative.",
      },
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      // match: /^[A-Z0-9]{8,12}$/,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    size: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const ProductInfoSchema = new mongoose.Schema({
  infoId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  features: [
    {
      header: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
});

// Main Product Schema
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    typeMain: {
      type: String,
      set: function (val) {
        return val.toLowerCase();
      },
    },
    availableSizes: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    contentInfo: ProductInfoSchema,
    category: {
      type: String,
      required: true,
      set: function (value) {
        return value.toLowerCase();
      },
      index: true, // Adding index for faster querying
    },
    brand: {
      type: String,
      required: true,
      set: function (value) {
        return value.toLowerCase();
      },
    },
    tags: [
      {
        type: String,
        trim: true,
        index: true, // Index tags for faster search
      },
    ],
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
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    discount: {
      type: Number,
      min: 0,
      max: 100, // Discount percentage
      default: 0,
    },
    metaData: {
      title: String,
      description: String,
      keywords: [String],
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

// Virtual field for the product rating
ProductSchema.virtual("productRating").get(function () {
  if (this.ratings.totalRatings > 0) {
    return this.ratings.averageRating;
  }
  return 0;
});

// Pre-save hook to update the product ratings when variants change
ProductSchema.pre("save", async function (next) {
  if (this.isModified("variants")) {
    // Recalculate the ratings and total ratings based on the variants
    const totalRatings = this.variants.reduce(
      (acc, variant) => acc + variant.ratings.totalRatings,
      0
    );
    const averageRating = totalRatings / this.variants.length;

    this.ratings.totalRatings = totalRatings;
    this.ratings.averageRating = averageRating.toFixed(2);
  }
  next();
});

ProductSchema.index({ name: 1, category: 1, tags: 1 });

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
