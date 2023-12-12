// rootReducer.js
import { combineReducers } from "redux";
import userReducer from "../features/User/UserSlice";
import footerReducer from "../features/Footer/FooterSlice";
import displayProductReducer from '../features/Product/DisplayProductSlice';
import  cartReducer  from "../features/Cart/CartSlice";
import singleProductReducer from "../features/Product/SingleProductSlice";

const rootReducer = combineReducers({
  user: userReducer,
  footer: footerReducer,
  views :displayProductReducer,
  cart : cartReducer,
  singleProduct:singleProductReducer,

});

export default rootReducer;
