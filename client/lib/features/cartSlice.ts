import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const CART_KEY = "guest_cart";

const loadCartFromSession = (): CartItem[] => {
  if (typeof window !== "undefined" && window.sessionStorage) {
    const cartFetch = sessionStorage.getItem(CART_KEY);
    return cartFetch ? JSON.parse(cartFetch) : [];
  }
  return [];
};

// save cart items to session storage
export const saveCartItemsToSessionStorage = (items: CartItem[]) => {
  if (typeof window !== "undefined" && window.sessionStorage) {
    window.sessionStorage.setItem(CART_KEY, JSON.stringify(items));
  }
};

// Calculate cart totals based on items
const updateCartTotals = (
  items: CartItem[]
): {
  totalItems: number;
  totalPrice: number;
} => {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  return { totalItems, totalPrice };
};

const initialState: CartState = {
  items: loadCartFromSession(),
  totalItems: 0,
  totalPrice: 0,
  subTotal: 0,
  isLoading: false,
  error: null,
  currency: "Ghs",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          ...action.payload,
          totalPrice: action.payload.price * action.payload.quantity,
        });
      }
      const totals = updateCartTotals(state.items);
      state.totalItems = totals.totalItems;
      state.subTotal = totals.totalPrice;
      state.totalPrice = state.subTotal;

      saveCartItemsToSessionStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Update totals
      const totals = updateCartTotals(state.items);
      state.totalItems = totals.totalItems;
      state.subTotal = totals.totalPrice;
      state.totalPrice = state.subTotal;

      saveCartItemsToSessionStorage(state.items);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity = action.payload.quantity;
        item.totalPrice = item.quantity * item.price;
      }

      // Update totals
      const totals = updateCartTotals(state.items);
      state.totalItems = totals.totalItems;
      state.subTotal = totals.totalPrice;
      state.totalPrice = state.subTotal;

      saveCartItemsToSessionStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.subTotal = 0;
      state.totalPrice = 0;

      saveCartItemsToSessionStorage(state.items);
    },
  },
});

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const { addToCart, clearCart, removeFromCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
