import { Product } from "./type-definitions";

export const updateLocalCart = (cart: Product[]) => {
  const cartData = JSON.stringify(cart);
  localStorage.setItem("cart", cartData);
};

export const updateLocalWishlist = (wishlist: Product[]) => {
  const wishlistData = JSON.stringify(wishlist);
  localStorage.setItem("wishlist", wishlistData);
};
