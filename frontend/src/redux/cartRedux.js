import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartQuantity: 0,
    cartTotal: 0,
  },
  reducers: {
    addProduct: (state, action) => {
        state.products.push(action.payload);
        state.cartQuantity += action.payload.quantity;
        state.cartTotal += action.payload.price * action.payload.quantity;
       
    },
    removeProduct: (state) => {
      state.products = [];
      state.cartQuantity = 0;
      state.cartTotal = 0;
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;