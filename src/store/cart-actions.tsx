import { AppDispatch } from "../store/index";
import { cartActions } from "./cart-slice";

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

export const addToCart = function (productData: Product, userId: string) {
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

    // Checks if the product already exists in cart. If it does, only updates quantity.
    if (existingProduct && existingProduct.quantity) {
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
      dispatch(cartActions.addToCartState(productData));
    } else {
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
      dispatch(cartActions.addToCartState(productData)); // Redux cart update (w/o sideeffects)
    }
  };
};

export const removeFromCart = function (productData: Product, userId: string) {
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

    // Checks if the product already exists in cart. If it does, only updates quantity.
    if (existingProduct && existingProduct.quantity) {
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
        dispatch(cartActions.removeFromCartState(productData));
      } else {
        const deleteResponse = await fetch(
          `https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/cart/${productData.id}.json`,
          {
            method: "DELETE",
          }
        );

        if (!deleteResponse.ok) {
          throw new Error("Could not remove product from cart.");
        }
        dispatch(cartActions.removeAllFromCartState(productData));
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
      const deleteResponse = await fetch(
        `https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/cart/${productData.id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!deleteResponse.ok) {
        throw new Error("Could not remove product from cart.");
      }

      dispatch(cartActions.removeAllFromCartState(productData));
    } else {
      throw new Error("Could not remove product from cart.");
    }
  };
};

// export const fetchCart = function (userId: string) {
//   return async (dispatch: AppDispatch) => {
//     const response = await fetch(
//       `https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/cart.json`
//     );

//     if (!response.ok) {
//       throw new Error("Could not fetch cart data.");
//     }
//     const cartData = await response.json();

//     console.log(cartData);
//   };
// };
