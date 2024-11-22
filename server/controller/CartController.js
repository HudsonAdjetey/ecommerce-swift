const asyncHandler = require("express-async-handler");
const CartModel = require("../model/Cart.model");
const ProductModel = require("../model/Product.model");
const Redis = require("ioredis");
const { generateCacheKey, setCache, getCache } = require("../utils/cacheUtils");

// Add Product to Cart
const addToCart = asyncHandler(async (req, res) => {
  const cacheKey = generateCacheKey("cart", req.user.userId);

  try {
    const { productId, variantId } = req.body;

    if (!productId || !variantId) {
      return res
        .status(400)
        .json({ message: "Product ID and Variant ID are required." });
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const matchingVariant = product.variants.find(
      (variant) => variant._id.toString() === variantId
    );
    if (!matchingVariant) {
      return res.status(404).json({ message: "Variant not found." });
    }

    let cart = await CartModel.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new CartModel({ userId: req.user.userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.variantId.toString() === variantId
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += 1;
      cart.items[existingItemIndex].subtotal =
        cart.items[existingItemIndex].quantity * matchingVariant.price;
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

    // Update cache
    await setCache(cacheKey, cart);

    res.status(200).json({ message: "Item added to cart.", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

// Get Products from Cart
const getProductFromCart = asyncHandler(async (req, res) => {
  const cacheKey = generateCacheKey("cart", req.user.userId);

  try {
    const userId = req.user.userId;

    // Check Redis cache
    const cachedCart = await getCache(cacheKey);
    if (cachedCart) {
      return res.status(200).json({ cart: JSON.parse(cachedCart) });
    }

    const cart = await CartModel.findOne({ userId }).populate(
      "items.productId"
    );
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart is empty." });
    }

    // Cache the cart data
    await setCache(cacheKey, cart);

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

// Remove Product from Cart
const removeProductFromCart = asyncHandler(async (req, res) => {
  const cacheKey = generateCacheKey("cart", req.user.userId);

  try {
    const { productId, variantId } = req.body;

    if (!productId || !variantId) {
      return res
        .status(400)
        .json({ message: "Product ID and Variant ID are required." });
    }

    const cart = await CartModel.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.variantId.toString() === variantId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart." });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    // Update cache
    await setCache(cacheKey, cart);

    res.status(200).json({ message: "Item removed from cart.", cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = { addToCart, getProductFromCart, removeProductFromCart };
