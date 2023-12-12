import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchProductDetails = createAsyncThunk(
  "productDetails/fetchProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );

      if (response == null) {
        return rejectWithValue("Response is null or undefined");
      }
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else 
      {
        return rejectWithValue(
          `Failed to fetch product details. Status: ${response.status}`
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response.data||error.message || "Failed to fetch product details"
      );
    }
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
