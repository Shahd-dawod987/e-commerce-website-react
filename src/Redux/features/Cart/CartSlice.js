import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addToCart = createAsyncThunk("cart/addToCart", async (product, { getState }) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const state = getState();
  const existingProduct = state.cart.cartItems.find(item => item.productId === product.productId);

  if (existingProduct) {
    const updatedProducts = state.cart.cartItems.map(item =>
      item.productId === product.productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    const response = await axios.put(`https://fakestoreapi.com/carts/3`, {
      userId: 2,
      date: currentDate,
      products: updatedProducts,
    });

    return response?.data;
  } else {
    const response = await axios.put(`https://fakestoreapi.com/carts/3`, {
      userId: 2,
      date: currentDate,
      products: [...state.cart.cartItems, { ...product, quantity: 1 }],
    });

    return response?.data;
  }
});

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, { getState }) => {
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

    return { ...response?.data, totalPrice: calculateTotalPrice(updatedItems) };
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
        state.cartItems = action.payload.products;  
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
      });
  },
});

export {addToCart};
export const { removeFromCart } = cartReducer.actions;

export default cartReducer.reducer;
