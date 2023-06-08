interface ProductData {
  category: string;
  description: string;
  image: string;
  new: boolean;
  onSale: boolean;
  price: number;
  thumbnail: string;
  title: string;
}

interface Product {
  id: string;
  data: ProductData;
}

const randomProductStack = (products: Product[]): Product[] => {
  const randomProducts: Product[] = [];

  while (randomProducts.length < 5) {
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProduct = products[randomIndex];

    if (randomProducts.includes(randomProduct)) {
      continue;
    }
    randomProducts.push(randomProduct);
  }

  return randomProducts;
};

export default randomProductStack;
