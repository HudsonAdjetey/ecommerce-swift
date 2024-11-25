const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    image: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);
const BrandModel = mongoose.model("Brand", BrandSchema);

module.exports = BrandModel;
