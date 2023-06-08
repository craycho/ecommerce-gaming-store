import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProductData {
  category: string;
  description: string;
  image: string;
  new: boolean;
  onSale: boolean;
  price: number;
  thumbnail: string;
  title: string;
}

interface Product {
  id: string;
  data: ProductData;
}

const initialState: Product[] = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    initProducts(state: Product[], action: PayloadAction<Product[]>) {
      const newProducts = action.payload;
      // state = newProducts;
      return newProducts;
    },
    addProduct(state: Product[], action: PayloadAction<Product>) {},
    removeProduct(state: Product[], action: PayloadAction<Product>) {},
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
