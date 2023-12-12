import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getInTouchOpen: false,
  socialMediaOpen: false,
  earningsOpen: false,
  accountOpen: false,
};

const footerReducer = createSlice({
  name: "footer",
  initialState,
  reducers: {
    toggleSection: (state, action) => {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { toggleSection } = footerReducer.actions;
export default footerReducer.reducer;
