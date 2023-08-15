import { AppDispatch } from "../store/index";
import { cartActions } from "./cart-slice";
import { Product } from "../util/type-definitions";

export const fetchProducts = function () {
  return async (dispatch: AppDispatch) => {
    try {
      const cachedProducts = localStorage.getItem("cachedProducts");
      if (cachedProducts) {
        const parsedProducts = JSON.parse(cachedProducts);
        const productsArray: Product[] = Object.keys(parsedProducts).map(
          (productId) => parsedProducts[productId]
        );

        dispatch(cartActions.initProducts(productsArray));
      } else {
        const response = await fetch(
          "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/products.json"
        );
        const productData = await response.json();
        const productsArray: Product[] = Object.keys(productData).map(
          (productId) => ({
            id: productId,
            data: productData[productId],
          })
        );

        dispatch(cartActions.initProducts(productsArray));
        localStorage.setItem("cachedProducts", JSON.stringify(productsArray));
      }
    } catch (error) {
      throw new Error(
        "Error fetching product data. Please refresh and try again."
      );
    }
  };
};
