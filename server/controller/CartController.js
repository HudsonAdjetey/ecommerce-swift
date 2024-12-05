const asyncHandler = require("express-async-handler");
const ProductModel = require("../model/Product.model");
const CartModel = require("../model/Cart.model");
const { setCache, getCache, generateCacheKey } = require("../utils/redisUtils");
const { publishMessage } = require("../pubsub/publisher");

// add to cart
const addToCart = asyncHandler(async (req, res, next) => {
  try {
    const { variantId, size } = req.body;
    console.log(variantId);
    if (!req.params.productId || !variantId) {
      return res
        .status(400)
        .json({ message: "Missing productId or variantId" });
    }
    const products = await ProductModel.findById(req.params.productId).populate(
      "variants"
    );
    if (!products.name) {
      return res.status(404).json({ message: "Product not found" });
    }
    const matchingVariants = products.variants.find((variant) => {
      return variant.variantId.toString() === variantId.toString();
    });
    if (!matchingVariants) {
      return res.status(404).json({ message: "Variant not found" });
    }

    let cart = await CartModel.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new CartModel({ userId: req.user.userId });
    }

    const productIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === req.params.productId.toString() &&
        item.variantId.toString() === variantId &&
        item.size === size
    );
    if (productIndex === -1) {
      cart.items.push({
        productId: req.params.productId,
        variantId,
        quantity: 1,
        price: matchingVariants.price,
        subtotal: matchingVariants.price,
        size,
        image: matchingVariants.image,
        productName: products.name,
        color: matchingVariants.color,
        sku: matchingVariants.sku,
      });
    } else {
      cart.items[productIndex].quantity++;
      cart.items[productIndex].subtotal =
        cart.items[productIndex].price * cart.items[productIndex].quantity;
      image: matchingVariants.image;
    }

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.subtotal,
      0
    );
    await cart.save();
    res.status(200).json({
      message: "Product added to cart",
      cart: {
        items: cart.items.map((item) => ({
          ...item,
          subtotal: item.price * item.quantity,
          color: matchingVariants.color,
          image: matchingVariants.image,
          price: matchingVariants.price,
          productName: products.name,
          image: matchingVariants.image,
          // quantity
        })),
        totalPrice: cart.totalPrice,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
    next(error);
  }
});

const getProductFromCart = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    publishMessage("get_cart", cart);
    res.status(200).json({ message: "Cart retrieved", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
    next(error);
  }
});

// Remove product from cart
const removeProductFromCart = asyncHandler(async (req, res, next) => {
  const cacheKey = generateCacheKey("cart", req.user.userId);

  try {
    const { productId, variantId } = req.body;

    if (!productId || !variantId) {
      return res
        .status(400)
        .json({ message: "Product ID and variant ID are required" });
    }

    const cart = await CartModel.findOne({ userId: req.user.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId.toString() &&
        item.variantId.toString() === variantId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.totalPrice -= cart.items[productIndex].subtotal;
    cart.items.splice(productIndex, 1);

    await cart.save();
    await setCache(cacheKey, cart);
    publishMessage("remove_cart", cart);
    res.status(200).json({ message: "Items removed from cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
    next(error);
  }
});

const updateCart = asyncHandler(async (req, res, next) => {
  try {
    const cacheKey = generateCacheKey("cart", req.user.userId);
    const cart = await CartModel.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const { productId, quantity } = req.body;
    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.items[productIndex].quantity = quantity;
    cart.items[productIndex].subtotal =
      quantity * cart.items[productIndex].price;
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.subtotal, 0);

    await cart.save();
    await setCache(cacheKey, cart);
    publishMessage("updated_cart", cart);
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = {
  addToCart,
  getProductFromCart,
  removeProductFromCart,
  updateCart,
};
