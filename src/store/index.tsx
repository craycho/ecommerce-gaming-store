import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./products-slice";

const store = configureStore({
  reducer: { products: productsReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
