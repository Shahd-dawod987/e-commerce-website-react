import { createSlice } from "@reduxjs/toolkit";

const displayProductReducer = createSlice({
  name: "views",
  initialState: { mode: "grid" },
  
  reducers: {
    setGridView: (state) => {
      state.mode = "grid";
    },
    setListView: (state) => {
      state.mode = "list";
    },
  },
});

export const { setGridView, setListView } = displayProductReducer.actions;
export default displayProductReducer.reducer;
