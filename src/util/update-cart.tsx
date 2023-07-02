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

export const updateLocalCart = (cart: Product[]) => {
  const cartData = JSON.stringify(cart);
  localStorage.setItem("cart", cartData);
};

export const updateLocalWishlist = (wishlist: Product[]) => {
  const wishlistData = JSON.stringify(wishlist);
  localStorage.setItem("wishlist", wishlistData);
};
