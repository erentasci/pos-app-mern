import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).cartItems
      : [],
    total: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).total
      : 0,
    tax: 8,
  },
  reducers: {
    addProduct: (state, action) => {
      let foundedItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (foundedItem) {
        foundedItem.quantity++;
      } else {
        state.cartItems.push(action.payload);
      }
      state.total += action.payload.price;
    },
    deleteProduct: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity;
    },
    increaseProductQuantity: (state, action) => {
      let foundedItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      foundedItem.quantity++;
      state.total += action.payload.price;
    },
    decreaseProductQuantity: (state, action) => {
      let foundedItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (foundedItem.quantity === 0) {
        foundedItem.quantity = 0;
        state.total = action.payload.price * action.payload.quantity;
      } else {
        foundedItem.quantity--;
        state.total -= action.payload.price;
      }
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
