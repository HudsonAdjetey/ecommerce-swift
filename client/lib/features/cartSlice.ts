import { createSlice } from "@reduxjs/toolkit";

const CART_KEY = "guest_user";

const loadCartFromSession = () => {
  if (typeof window !== undefined && window.sessionStorage) {
    const cartFetch = window.sessionStorage.getItem(CART_KEY);
    return cartFetch ? JSON.parse(cartFetch) : [];
  }
  return [];
};

export const saveCartItemsToSessionStorage = (items: CartItemProps) => {
  if (typeof window !== undefined && window.sessionStorage) {
    window.sessionStorage.setItem(CART_KEY, JSON.stringify(items));
  }
};

const updateCartTotals = (items: CartProps[]) => {
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  return {
    totalItems,
    totalPrice,
  };
};

const initialState: CartItemProps = {
  items: loadCartFromSession(),
  totalItems: 0,
  subtotal: 0,
  isLoading: false,
  error: null,
  currency: "Ghs",
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.variantId === action.payload.variantId
      );
      if (existingItem) {
        state.items[existingItem].quantity += action.payload.quantity;
        state.items[existingItem].subtotal =
          state.items[existingItem].price * state.items[existingItem].quantity;
        state.items[existingItem].name = action.payload.name;
      } else {
        state.items.push({
          ...action.payload,
          subtotal: action.payload.price * action.payload.quantity,
        });
      }
      const totals = updateCartTotals(state.items);
      state.totalItems = totals.totalItems;
      state.subtotal = totals.totalPrice;
      state.totalPrice = totals.totalPrice;
      saveCartItemsToSessionStorage({
        items: state.items,
        totalItems: totals.totalItems,
        subtotal: totals.totalPrice,
        totalPrice: totals.totalPrice,
        currency: state.currency,
      });
    },
    removeFromCart: (state, action) => {
      const itemToRemove = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.variantId === action.payload.variantId
      );
      if (itemToRemove) {
        state.items = state.items.filter(
          (item) => item.variantId !== action.payload.variantId
        );
        const totals = updateCartTotals(state.items);
        state.totalItems = totals.totalItems;
        state.subtotal = totals.totalPrice;
        state.totalPrice = totals.totalPrice;
        saveCartItemsToSessionStorage({
          items: state.items,
          totalItems: totals.totalItems,
          subtotal: totals.totalPrice,
          totalPrice: totals.totalPrice,
          currency: state.currency,
        });
      }
    },
    updateCart: (state, action) => {
      const itemToupdate = state.items.find(
        (item) => item.variantId === action.payload.variantId
      );
      if (itemToupdate) {
        itemToupdate.quantity = action.payload.quantity;
        itemToupdate.subtotal = itemToupdate.price * itemToupdate.quantity;
      }
      const totals = updateCartTotals(state.items);
      state.totalItems = totals.totalItems;
      state.subtotal = totals.totalPrice;
      state.totalPrice = totals.totalPrice;
      saveCartItemsToSessionStorage({
        items: state.items,
        totalItems: totals.totalItems,
        subtotal: totals.totalPrice,
        totalPrice: totals.totalPrice,
        currency: state.currency,
      });
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.subtotal = 0;
      state.totalPrice = 0;
      saveCartItemsToSessionStorage({
        items: state.items,
        totalItems: 0,
        subtotal: 0,
        totalPrice: 0,
        currency: state.currency,
      });
    },
  },
});

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const { addToCart, clearCart, removeFromCart, updateCart } =
  cartSlice.actions;
export default cartSlice.reducer;
