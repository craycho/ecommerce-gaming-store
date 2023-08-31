import { AppDispatch } from "../store/index";
import { cartActions } from "./cart-slice";
import { Product } from "../util/type-definitions";

export const addToCart = function (productData: Product, userId: string) {
  return async (dispatch: AppDispatch) => {
    // If a cart exists, it's already in local storage
    const localCart = localStorage.getItem("cart");
    if (!localCart) return [];

    let existingProduct: Product | null = null;

    const cartData: Product[] = JSON.parse(localCart);
    for (const cartItem of cartData) {
      if (cartItem.id === productData.id) {
        existingProduct = cartItem;
      }
    }

    // Checks if the product already exists in cart. If it does, only updates quantity.
    if (existingProduct && existingProduct.quantity) {
      dispatch(cartActions.addToCartState(productData)); // Redux cart update (w/o sideeffects)

      const patchResponse = await fetch(
        `https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/cart/${productData.id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: existingProduct.quantity + 1 }), // Updates existing attribute
        }
      );
      if (!patchResponse.ok) {
        throw new Error("Could not add product to cart.");
      }
    } else {
      dispatch(cartActions.addToCartState(productData));

      const patchResponse = await fetch(
        `https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/cart/${productData.id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...productData, quantity: 1 }),
        }
      );
      if (!patchResponse.ok) {
        throw new Error("Could not add product to cart.");
      }
    }
  };
};

export const removeFromCart = function (productData: Product, userId: string) {
  return async (dispatch: AppDispatch) => {
    const localCart = localStorage.getItem("cart");
    if (!localCart) return [];

    let existingProduct: Product | null = null;

    const cartData: Product[] = JSON.parse(localCart);
    for (const cartItem of cartData) {
      if (cartItem.id === productData.id) {
        existingProduct = cartItem;
      }
    }

    // Checks if the product already exists in cart. If it does, only updates quantity.
    if (existingProduct && existingProduct.quantity) {
      dispatch(cartActions.removeFromCartState(productData));

      if (existingProduct.quantity > 1) {
        const patchResponse = await fetch(
          `https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/cart/${productData.id}.json`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: existingProduct.quantity - 1 }), // Updates existing attribute
          }
        );
        if (!patchResponse.ok) {
          throw new Error("Could not add product to cart.");
        }
      } else {
        dispatch(cartActions.removeAllFromCartState(productData));

        const deleteResponse = await fetch(
          `https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/cart/${productData.id}.json`,
          {
            method: "DELETE",
          }
        );

        if (!deleteResponse.ok) {
          throw new Error("Could not remove product from cart.");
        }
      }
    } else {
      throw new Error("Could not remove product from cart.");
    }
  };
};

export const removeAllFromCart = function (
  productData: Product,
  userId: string
) {
  return async (dispatch: AppDispatch) => {
    let existingProduct: Product | null = null;

    const localCart = localStorage.getItem("cart");
    if (!localCart) return [];
    const cartData: Product[] = JSON.parse(localCart);

    for (const cartItem of cartData) {
      if (cartItem.id === productData.id) {
        existingProduct = cartItem;
      }
    }

    if (existingProduct && existingProduct.quantity) {
      dispatch(cartActions.removeAllFromCartState(productData));

      const deleteResponse = await fetch(
        `https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/cart/${productData.id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!deleteResponse.ok) {
        throw new Error("Could not remove product from cart.");
      }
    } else {
      throw new Error("Could not remove product from cart.");
    }
  };
};

export const fetchCart = function (userId: string) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      `https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/cart.json`
    );
    if (!response.ok) {
      throw new Error("Couldn't fetch cart.");
    }
    const cartData = await response.json();
    if (cartData) {
      const cartArray: Product[] = [];

      for (const cartItem in cartData) {
        const currentItem: Product = cartData[`${cartItem}`];
        cartArray.push(currentItem);
      }
      dispatch(cartActions.replaceCart(cartArray));
    } else {
      dispatch(cartActions.replaceCart([]));
    }
  };
};
