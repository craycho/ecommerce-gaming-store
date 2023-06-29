import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProductData {
  category: string;
  description: string;
  image: string;
  imageAlt: string;
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

interface StateData {
  allProducts: Product[];
  cart: Product[];
}
const initialState: StateData = {
  allProducts: [],
  cart: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    initProducts(
      state: StateData = initialState,
      action: PayloadAction<Product[]>
    ) {
      const newProducts = action.payload;
      state.allProducts = newProducts;
      // return newProducts;  Neophodno kada state nije objekat (nema automatskog dereferenciranja sa ".")
    },
    addProduct(state: StateData, action: PayloadAction<Product>) {
      state.cart.push(action.payload);
    },
    removeProduct(state: StateData, action: PayloadAction<Product>) {},
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
