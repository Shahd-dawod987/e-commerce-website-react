import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addToCart = createAsyncThunk("cart/addToCart", async (product, { getState }) => {
  try {
    const currentDate = new Date().toISOString().split("T")[0];
    const state = getState();
    const existingProduct = state.cart.cartItems.find(item => item.productId === product.productId);

    let response;
    if (existingProduct) {
      const updatedProducts = state.cart.cartItems.map(item =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      response = await axios.put(`https://fakestoreapi.com/carts/3`, {
        userId: 2,
        date: currentDate,
        products: updatedProducts,
      });
    } else {
      response = await axios.put(`https://fakestoreapi.com/carts/3`, {
        userId: 2,
        date: currentDate,
        products: [...state.cart.cartItems, { ...product, quantity: 1 }],
      });
    }

    return response?.data || {};
  } catch (error) {
    console.error( error.response.data||error.message || "Failed to fetch product details");
    throw error;
  }
});

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, { getState }) => {
    try {
      const currentDate = new Date().toISOString().split("T")[0];
      const state = getState();
      const updatedItems = state.cart.cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );

      const response = await axios.put(`https://fakestoreapi.com/carts/3`, {
        userId: 2,
        date: currentDate,
        products: updatedItems,
      });

      return { ...response?.data, totalPrice: calculateTotalPrice(updatedItems) } || {};
    } catch (error) {
      console.error( error.response.data||error.message || "Failed to fetch product details");
      throw error;
    }
  }
);

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    status: "idle",
    error: null,
    totalPrice: 0,
  },
  reducers: {
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.productId !== productId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.cartItems = action.payload.products || [];
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload.products || [];
        state.totalPrice = action.payload.totalPrice || 0;
      });
  },
});

export { addToCart };
export const { removeFromCart } = cartReducer.actions;

export default cartReducer.reducer;
