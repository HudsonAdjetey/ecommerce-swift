const asyncHandler = require("express-async-handler");
const CartModel = require("../model/Cart.model");
const ProductModel = require("../model/Product.model");

const addToCart = asyncHandler(async (req, res, next) => {
  try {
    const { productId, variantId } = req.body;
    // edge cases
    if (!productId || !variantId) {
      return res.status(404).json({ message: "No product id" });
    }
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const matchingVariant = product.variants.find(
      (variant) => variant._id.toString() === variantId
    );
    if (!matchingVariant) {
      return res.status(404).json({ message: "Variant not found" });
    }
    // create or update cart item
    let cart = await CartModel.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new CartModel({ userId: req.user.userId, items: [] });
    }

    // check if cart contains items
    const existingItem = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.variantId.toString() === variantId
    );
    if (existingItem !== -1) {
      cart.items[existingItem].quantity++;
      //   subtotal
      cart.items[existingItem].subtotal =
        cart.items[existingItem].quantity * matchingVariant.price;
    } else {
      cart.items.push({
        productId,
        variantId,
        quantity: 1,
        price: matchingVariant.price,
        subtotal: matchingVariant.price,
      });
    }
    await cart.save();
    res.json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const getProductFromCart = asyncHandler(async (req, res) => {
  try {
    const cart = await CartModel.findOne({ userId: req.user.userId }).populate(
      "items.productId"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const removeProductFromCart = asyncHandler(async (req, res, next) => {
  try {
    const { productId, variantId } = req.body;
    if (!productId || !variantId) {
      return res
        .status(400)
        .json({ message: "Both productId and variantId are required" });
    }
    const cart = await CartModel.findOneAndUpdate(
      {
        userId: req.user.userId,
      },
      {
        $pull: { variantId, productId },
      },
      {
        new: true,
      }
    ).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
});

module.exports = { addToCart, getProductFromCart, removeProductFromCart };
