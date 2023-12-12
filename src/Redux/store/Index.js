import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./RootReducer";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

});

store.subscribe(() => {
  const state = store.getState();
  const isLoggedIn = state.user.isLoggedIn;

});

export default store;
