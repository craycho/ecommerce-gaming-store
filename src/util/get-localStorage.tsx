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

export const getLocalStorage = (selector: string): Product[] => {
  const localData = localStorage.getItem(selector);
  if (localData) return JSON.parse(localData);
  else return [];
};
