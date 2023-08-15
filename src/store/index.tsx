import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./products-slice";
import cartReducer from "./cart-slice";
import wishlistReducer from "./wishlist-slice";
import userReducer from "./user-slice";
import {
  updateLocalCart,
  updateLocalWishlist,
} from "../util/update-local-storage";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
  },
});

store.subscribe(() => {
  const { cart, wishlist } = store.getState();

  updateLocalCart(cart);
  updateLocalWishlist(wishlist);
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Neophodno za dispatch action creatora (actions)
