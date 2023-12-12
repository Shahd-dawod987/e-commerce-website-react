import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductDetails = createAsyncThunk(
  "productDetails/fetchProductDetails",
  async (productId) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
    return response.data;
  }
);

const singleProductReducer = createSlice({
  name: "singleProduct",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      const { id, title, description, category, price, image, rating } = action.payload;
      state[id] = { id, title, description, category, price, image, rating };
    });
  },
});

export default singleProductReducer.reducer;
