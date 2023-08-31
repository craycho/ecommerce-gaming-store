import { Product } from "./type-definitions";

const getRandomProducts = (
  products: Product[],
  requiredAmount: number = 1,
  isNew: boolean,
  onSale: boolean
): Product[] => {
  const randomProductsArray: Product[] = [];

  while (randomProductsArray.length < requiredAmount) {
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProduct = products[randomIndex];

    if (
      randomProductsArray.some(
        (product) => product.data.title === randomProduct.data.title
      )
    )
      continue;

    if (onSale && !randomProduct.data.onSale) {
      continue;
    }
    if (isNew && !randomProduct.data.new) {
      continue;
    }

    randomProductsArray.push(randomProduct);
  }
  return randomProductsArray;
};

export default getRandomProducts;
