const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
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

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
