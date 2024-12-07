import { createSlice } from "@reduxjs/toolkit";

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
  items: [],
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
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.subtotal = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const { addToCart, clearCart, removeFromCart, updateCart } =
  cartSlice.actions;
export default cartSlice.reducer;
