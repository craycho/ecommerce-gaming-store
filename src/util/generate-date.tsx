export const generateDate = (deliveryMethod: number | null) => {
  let date: Date = new Date();

  if (deliveryMethod !== null) {
    const deliveryDays =
      deliveryMethod === 0 ? 7 : deliveryMethod === 1 ? 5 : 3;
    date.setDate(date.getDate() + deliveryDays);
  }

  const day = `${date.getDate()}`.padStart(2, "0");
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
