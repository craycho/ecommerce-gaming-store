import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface productInfo {
  category: string;
  description: string;
  id: string;
  image: string;
  price: number;
  title: string;
}

const initialState: productInfo[] = [];

const productsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addProduct(state: productInfo[], action: PayloadAction<productInfo>) {},
    removeProduct(state: productInfo[], action: PayloadAction<productInfo>) {},
  },
});

export const cartActions = productsSlice.actions;
export default productsSlice.reducer;

// <{
//     name: string;
//     initialState: { productsList: productsInfo[] };
//     reducers: reducersType;
//   }>
