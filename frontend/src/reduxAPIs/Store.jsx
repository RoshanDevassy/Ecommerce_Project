import { configureStore } from "@reduxjs/toolkit";
import cartProducts from "./CartSlice";
import Ecommerce_Products from "./ProductsSlice"
import UserCartItems from "./UserCartSlice"
import AuthSlice from "./AuthSlice"

export const Store = configureStore({
  reducer: {
    cartData: cartProducts,
    ecomProducts:Ecommerce_Products,
    userCartItems:UserCartItems,
    auth:AuthSlice
  },
});


