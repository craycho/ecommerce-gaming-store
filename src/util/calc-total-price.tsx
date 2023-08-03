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

const calcTotalPrice = (cartArray: Product[] = []) => {
  let totalPrice: number = 0;

  if (cartArray.length < 1) {
    return 0;
  } else {
    for (const item of cartArray) {
      const itemPrice = item.data?.onSale
        ? +(item.data?.price - item.data?.price * 0.3).toFixed(2)
        : +item.data?.price.toFixed(2);

      const totalItemPrice = itemPrice * (item?.quantity ?? 1);

      totalPrice += totalItemPrice;
    }

    return +totalPrice.toFixed(2);
  }
};

export default calcTotalPrice;

/* export function getTotalPrice(
  onSale: boolean,
  price: number,
  amount: number,
  totalPrice: number,
  addedToCart: boolean
) {
  const productPrice = onSale
    ? +(price - price * 0.3).toFixed(2)
    : +price.toFixed(2);

  if (amount > 1) {
    const finalPrice = +(totalPrice - productPrice * amount).toFixed(2);
    localStorage.setItem("totalPrice", JSON.stringify(finalPrice));
    return finalPrice;
  }

  if (addedToCart) {
    const finalPrice = +(totalPrice + productPrice).toFixed(2);
    localStorage.setItem("totalPrice", JSON.stringify(finalPrice));
    return finalPrice;
  } else {
    const finalPrice = +(totalPrice - productPrice).toFixed(2);
    localStorage.setItem("totalPrice", JSON.stringify(finalPrice));
    return finalPrice;
  }
} */
