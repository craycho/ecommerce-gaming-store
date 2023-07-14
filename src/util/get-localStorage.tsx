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

interface User {
  loggedIn: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  allowExtraEmails: boolean;
  profilePicture: string | null;
}

const defaultUserData = {
  loggedIn: false,
  allowExtraEmails: true,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  profilePicture: null,
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
