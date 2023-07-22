export function getTotalPrice(
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
}
