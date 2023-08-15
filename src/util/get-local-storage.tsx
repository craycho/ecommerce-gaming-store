import { Product, User } from "./type-definitions";

export const getLocalStorage = (selector: string): Product[] => {
  const localData = localStorage.getItem(selector);
  if (localData) return JSON.parse(localData);
  else return [];
};

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
