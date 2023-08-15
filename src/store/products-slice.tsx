import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../util/type-definitions";

const initialState: Product[] = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    initProducts(
      state: Product[] = initialState,
      action: PayloadAction<Product[]>
    ) {
      const newProducts = action.payload;
      //   state.products = newProducts;
      return newProducts; // Neophodno kada state nije objekat (nema automatskog dereferenciranja sa ".")
    },
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
