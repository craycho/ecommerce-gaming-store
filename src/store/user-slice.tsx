import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../util/get-localStorage";

interface User {
  loggedIn: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  allowExtraEmails: boolean;
}

interface LoggedInUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  allowExtraEmails: boolean;
}

interface LoginProps {
  userData: LoggedInUserData;
  rememberMe: boolean;
}

const initialState: User = getUserData();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state: User, action: PayloadAction<LoginProps>): User {
      const userData = { ...action.payload.userData, loggedIn: true };

      if (action.payload.rememberMe) {
        localStorage.setItem("userData", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("userData", JSON.stringify(userData));
      }

      return userData;
    },
    logoutUser(state: User) {
      const emptyUserData = {
        loggedIn: false,
        allowExtraEmails: true,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      };
      localStorage.setItem("userData", JSON.stringify(emptyUserData));
      sessionStorage.setItem("userData", JSON.stringify(emptyUserData));

      return emptyUserData;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
