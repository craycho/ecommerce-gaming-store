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
  products: Product[];
  cart: Product[];
}

const initialState: StateData = {
  products: [],
  cart: [], // getLocalStorage("cart")
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
    replaceCart(state: StateData, action: PayloadAction<Product[]>) {
      const userCart = action.payload;
      state.cart = userCart;
    },
    addToCartState(state: StateData, action: PayloadAction<Product>) {
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
    },
    removeFromCartState(state: StateData, action: PayloadAction<Product>) {
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
      }
    },
    removeAllFromCartState(state: StateData, action: PayloadAction<Product>) {
      const removedProduct = action.payload;
      const existingProduct = state.cart.find(
        (product) => product.id === removedProduct.id
      );

      if (existingProduct) {
        state.cart = state.cart.filter(
          (product) => product.id !== existingProduct.id
        );
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
