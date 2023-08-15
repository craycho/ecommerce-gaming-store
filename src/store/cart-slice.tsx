import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../util/type-definitions";

const initialState: Product[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state: Product[], action: PayloadAction<Product[]>) {
      const userCart = action.payload;
      return userCart;
    },
    addToCartState(state: Product[], action: PayloadAction<Product>) {
      const addedProduct = action.payload;
      // existingProduct je pointer (reference value)
      const existingProduct = state.find(
        (product) => product.id === addedProduct.id
      );

      if (!existingProduct) {
        state.push({ ...addedProduct, quantity: 1 });
      } else {
        existingProduct.quantity
          ? existingProduct.quantity++
          : (existingProduct.quantity = 1);
      }
    },
    removeFromCartState(state: Product[], action: PayloadAction<Product>) {
      const removedProduct = action.payload;
      const existingProduct = state.find(
        (product) => product.id === removedProduct.id
      );

      if (existingProduct && existingProduct.quantity) {
        if (existingProduct.quantity === 1) {
          return state.filter((product) => product.id !== existingProduct.id);
        } else {
          existingProduct.quantity--;
        }
      }
    },
    removeAllFromCartState(state: Product[], action: PayloadAction<Product>) {
      const removedProduct = action.payload;
      const existingProduct = state.find(
        (product) => product.id === removedProduct.id
      );

      if (existingProduct) {
        return state.filter((product) => product.id !== existingProduct.id);
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
