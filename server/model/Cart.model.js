const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        subtotal: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },

        image: String,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    coupon: {
      code: { type: String, default: null },
      discount: { type: Number, default: 0 },
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

// Middleware to calculate subtotal and total price
CartSchema.pre("save", function (next) {
  // Calculate subtotals for each item
  this.items.forEach((item) => {
    item.subtotal = item.quantity * item.price;
  });

  // Calculate total price for the cart
  this.totalPrice = this.items.reduce((sum, item) => sum + item.subtotal, 0);

  next();
});

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = CartModel;
