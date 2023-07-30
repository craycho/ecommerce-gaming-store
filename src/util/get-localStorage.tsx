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

export const getLocalTotalPrice = (): number => {
  const totalPrice = localStorage.getItem("totalPrice");
  if (totalPrice) return JSON.parse(totalPrice);
  else return 0;
};

interface Order {
  selectedCountry: string;
  firstName: string;
  lastName: string;
  address: string;
  postcode: string;
  email: string;
  allowExtraEmails: boolean;
  cart: string[];
}

interface User {
  id: string;
  loggedIn: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  allowExtraEmails: boolean;
  profilePicture: string;
  orders: Order[];
}

const defaultUserData = {
  loggedIn: false,
  allowExtraEmails: true,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  profilePicture: "",
  orders: [],
  id: "",
};

export const getUserData = (): User => {
  const localUserData = localStorage.getItem("userData");
  const parsedLocalData: User = localUserData
    ? JSON.parse(localUserData)
    : defaultUserData;

  const sessionUserData = sessionStorage.getItem("userData");
  const parsedSessionData: User = sessionUserData
    ? JSON.parse(sessionUserData)
    : defaultUserData;

  if (parsedSessionData.loggedIn) {
    return parsedSessionData;
  } else if (parsedLocalData.loggedIn) {
    return parsedLocalData;
  } else return defaultUserData;
};
