import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "user",
  initialState: { user: null,userId: null, isLoggedIn: false },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.user = null;
       state.userId = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userReducer.actions;
export default userReducer.reducer;
