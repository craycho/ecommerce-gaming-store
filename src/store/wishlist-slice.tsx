import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../util/get-local-storage";
import { Product } from "../util/type-definitions";

const initialState: Product[] = getLocalStorage("wishlist");

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state: Product[], action: PayloadAction<Product>) {
      const addedProduct = action.payload;
      const alreadyInWishlist = state.find(
        (product) => product.id === addedProduct.id
      );

      if (alreadyInWishlist) {
        return state.filter((product) => product.id !== alreadyInWishlist.id);
      } else {
        return [...state, addedProduct];
      }
    },
    clearWishlist(state: Product[]) {
      const emptyWishlist = JSON.stringify([]);
      localStorage.setItem("wishlist", emptyWishlist);
      return [];
    },
  },
});

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice.reducer;
