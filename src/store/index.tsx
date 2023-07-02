import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./cart-slice";
import updateLocalCart from "../util/update-cart";

const store = configureStore({
  reducer: { products: productsReducer },
});

store.subscribe(() => {
  const {
    products: { cart },
  } = store.getState();

  updateLocalCart(cart);
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
