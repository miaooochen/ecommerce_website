import { createSlice } from "@reduxjs/toolkit";

const heartSlice = createSlice({
  name: "heart",
  initialState: {
    products: [],
    heartQuantity: 0,
    
  },
  reducers: {
    addHeart: (state, action) => {
        state.products.push(action.payload);
        state.heartQuantity += action.payload.heart;
    },
    removeHeart: (state) => {
      state.products = [];
      state.heartQuantity = 0;
    },
  },
});

export const { addHeart, removeHeart} = heartSlice.actions;
export default heartSlice.reducer;