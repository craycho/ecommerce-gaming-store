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

const updateLocalCart = (cart: Product[]) => {
  const cartData = JSON.stringify(cart);
  localStorage.setItem("cart", cartData);
};

export default updateLocalCart;
