const asyncHandler = require("express-async-handler");
const ProductModel = require("../model/Product.model");
const CartModel = require("../model/Cart.model");
const { setCache, getCache, generateCacheKey } = require("../utils/redisUtils");
const { publishMessage } = require("../pubsub/publisher");

// add to cart
const addToCart = asyncHandler(async (req, res, next) => {
  try {
    const { productId, variantId } = req.body;

    // check if there are no variantsId or ProductId
    if (!productId || !variantId) {
      return res
        .status(400)
        .json({ message: "Missing productId or variantId" });
    }
    //   find if the product exists
    const products = await ProductModel.findById({ _id: productId }).populate(
      "variants"
    );
    if (!products || products.count() == 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    const matchingVariants = products.variants.find(
      (variant) => variant.variantId === variantId
    );
    if (!matchingVariants) {
      return res.status(404).json({ message: "Variant not found" });
    }

    let cart = await CartModel.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new CartModel({ userId: req.user.userId });
    }
    const productIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId.toString() &&
        item.variantId.toString() === variantId
    );
    const totalSubTotal = cart.items.reduce(
      (total, item) => total + item.subtotal,
      0
    );
    if (productIndex === -1) {
      cart.items.push({
        productId,
        variantId,
        quantity: 1,
        price: matchingVariants.price,
        subtotal: matchingVariants.price,
      });
    } else {
      cart.items[productIndex].quantity++;
      cart.items[productIndex].subtotal =
        cart.items[productIndex].price * cart.items[productIndex].quantity;
      cart.totalPrice = totalSubTotal;
    }
    cart.totalPrice = totalSubTotal;
    await cart.save();
    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
    next(error);
  }
});

const getProductFromCart = asyncHandler(async (req, res, next) => {
  const cacheKey = generateCacheKey("cart", req.user.userId);

  try {
    const userId = req.user.userId;

    const cachedCart = await getCache(cacheKey);
    if (cachedCart) {
      return res.status(200).json({ message: "Cart cached", cart: cachedCart });
    }

    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    await setCache(cacheKey, cart);
    // publisher
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
    cart.totalPrice = cart.totalPrice - cart.items[productIndex].subtotalPrice;
    cart.items.splice(productIndex, 1);

    await cart.save();

    await setCache(cacheKey, cart);
    // publisher
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
    const { quantity } = req.body;
    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === req.body.productId.toString()
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cart.items[productIndex].quantity = quantity;
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    cart.items[productIndex].subtotal =
      quantity * cart.items[productIndex].price;

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
