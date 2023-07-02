import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cart-slice";
import {
  updateLocalCart,
  updateLocalWishlist,
} from "../util/update-localStorage";
import wishlistReducer from "./wishlist-slice";

const store = configureStore({
  reducer: { cart: cartReducer, wishlist: wishlistReducer },
});

store.subscribe(() => {
  const {
    cart: { cart },
    wishlist,
  } = store.getState();

  updateLocalCart(cart);
  updateLocalWishlist(wishlist);
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
