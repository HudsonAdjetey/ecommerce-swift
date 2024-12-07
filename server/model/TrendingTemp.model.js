const { Schema, model } = require("mongoose");
const VariantSchema = new Schema(
  {
    variantId: {
      type: Schema.Types.ObjectId,
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

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  variant: VariantSchema,
  productId: Schema.Types.ObjectId,
  typeMain: String,
  category: String,
  brand: String,
});

const ProductTempSchema = new Schema({
  products: ProductSchema,
  expiresAt: Date,
});

const TrendingProductModel = model("TrendingProduct", ProductTempSchema);

module.exports = TrendingProductModel;
