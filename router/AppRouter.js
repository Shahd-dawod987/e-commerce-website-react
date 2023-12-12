import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../containers/Home/HomePage";
import LoginPage from "../containers/Login/LoginPage";
import ProductDetails from "../containers/ProductDetails/ProductDetails";
import CartPage from "../containers/Cart/CartPage";
import CheckOut from "../containers/Checkout/CheckOut";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/home/:username" element={<HomePage />} />
      <Route
        path="/Details/id/:productId/category/:category"
        element={<ProductDetails />}
      />
      <Route path="/Cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Checkout" element={<CheckOut />} />
    </Routes>
  );
};

export default AppRouter;
