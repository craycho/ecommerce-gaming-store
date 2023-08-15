import { Product } from "./type-definitions";

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
