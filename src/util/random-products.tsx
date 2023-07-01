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

const getRandomProducts = (
  products: Product[],
  amount: number = 1,
  isNew: boolean,
  onSale: boolean
): Product[] => {
  const randomProducts: Product[] = [];

  while (randomProducts.length < amount) {
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProduct = products[randomIndex];

    if (randomProducts.includes(randomProduct)) {
      continue;
    }
    if (onSale && !randomProduct.data.onSale) {
      continue;
    }
    if (isNew && !randomProduct.data.new) {
      continue;
    }

    randomProducts.push(randomProduct);
  }

  return randomProducts;
};

export default getRandomProducts;
