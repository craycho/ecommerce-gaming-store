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
  quantity?: number;
}

interface StateData {
  cartItems: Product[];
  totalQuantity: number;
}
const initialState: StateData = {
  cartItems: [],
  totalQuantity: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state: StateData, action: PayloadAction<Product>) {
      const existingProduct = state.cartItems.find(
        (product) => product.id === action.payload.id
      );
      state.cartItems.push(action.payload);
    },
    removeProduct(state: StateData, action: PayloadAction<Product>) {},
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
