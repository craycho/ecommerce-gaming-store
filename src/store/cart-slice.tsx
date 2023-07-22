import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, getLocalTotalPrice } from "../util/get-localStorage";
import { getTotalPrice } from "../util/get-total-price";
import { truncate } from "fs";

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
  products: Product[];
  cart: Product[];
  totalPrice: number;
}

const initialState: StateData = {
  products: [],
  cart: getLocalStorage("cart"),
  totalPrice: getLocalTotalPrice(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initProducts(
      state: StateData = initialState,
      action: PayloadAction<Product[]>
    ) {
      const newProducts = action.payload;
      state.products = newProducts;
      // return newProducts;  Neophodno kada state nije objekat (nema automatskog dereferenciranja sa ".")
    },
    addToCart(state: StateData, action: PayloadAction<Product>) {
      const addedProduct = action.payload;
      // existingProduct je pointer (reference value)
      const existingProduct = state.cart.find(
        (product) => product.id === addedProduct.id
      );

      if (!existingProduct) {
        state.cart.push({ ...addedProduct, quantity: 1 });
      } else {
        existingProduct.quantity
          ? existingProduct.quantity++
          : (existingProduct.quantity = 1);
      }

      const totalPrice = getTotalPrice(
        addedProduct.data.onSale,
        addedProduct.data.price,
        1,
        state.totalPrice,
        true
      );

      state.totalPrice = totalPrice;
    },
    removeFromCart(state: StateData, action: PayloadAction<Product>) {
      const removedProduct = action.payload;
      const existingProduct = state.cart.find(
        (product) => product.id === removedProduct.id
      );

      if (existingProduct && existingProduct.quantity) {
        if (existingProduct.quantity === 1) {
          state.cart = state.cart.filter(
            (product) => product.id !== existingProduct.id
          );
        } else {
          existingProduct.quantity--;
        }

        const totalPrice = getTotalPrice(
          removedProduct.data.onSale,
          removedProduct.data.price,
          1,
          state.totalPrice,
          false
        );
        state.totalPrice = totalPrice;
      }
    },
    removeAllFromCart(state: StateData, action: PayloadAction<Product>) {
      const removedProduct = action.payload;
      const existingProduct = state.cart.find(
        (product) => product.id === removedProduct.id
      );

      if (existingProduct) {
        state.cart = state.cart.filter(
          (product) => product.id !== existingProduct.id
        );

        const totalPrice = getTotalPrice(
          removedProduct.data.onSale,
          removedProduct.data.price,
          existingProduct.quantity as number,
          state.totalPrice,
          false
        );
        state.totalPrice = totalPrice;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
