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
        productName: String,
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
          set: (value) => {
            return parseFloat(value).toFixed(2);
          },
        },
        size: {
          type: String,
          required: true,
        },
        color: {
          type: String,
        },
        sku: {
          type: String,
        },

        image: String,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
      set: (value) => {
        return parseFloat(value).toFixed(2);
      },
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

function roundToTwo(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

CartSchema.pre("save", function (next) {
  console.log("Items before saving:", this.items);

  // Calculate subtotals for each item
  this.items.forEach((item) => {
    item.subtotal = roundToTwo(item.quantity * item.price);
  });

  // Calculate total price for the cart
  this.totalPrice = roundToTwo(
    this.items.reduce((sum, item) => sum + item.subtotal, 0)
  );

  console.log("Subtotal and Total calculated:", this.totalPrice);
  next();
});

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = CartModel;
