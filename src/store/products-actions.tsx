import { Dispatch } from "redux";
import { AnyAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/index";
import { productsActions } from "./products-slice";

export const fetchProducts = function () {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    );

    if (!response.ok) {
      throw new Error("Could not fetch product data.");
    }
    const productData = await response.json();
    const productsArray = Object.keys(productData).map((productId) => ({
      id: productId,
      data: productData[productId],
    }));

    dispatch(productsActions.initProducts(productsArray));
  };
};
