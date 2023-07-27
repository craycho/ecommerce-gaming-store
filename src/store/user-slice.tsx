import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../util/get-localStorage";
// import { useRouteLoaderData } from "react-router-dom";

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
interface UserData {
  loggedIn: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  allowExtraEmails: boolean;
  profilePicture: string;
  orders: Order[];
  id: string;
}

interface LoginProps {
  userData: UserData;
  rememberMe: boolean;
}

interface ChangeUserData {
  dataType: string;
  currentInput: string;
}

const initialState: UserData = getUserData();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state: UserData, action: PayloadAction<LoginProps>): UserData {
      return { ...action.payload.userData, loggedIn: true };
    },
    logoutUser(state: UserData): UserData {
      const emptyUserData = {
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

      return emptyUserData;
    },
    changeProfilePicture(state: UserData, action: PayloadAction<string>) {
      state.profilePicture = action.payload;
    },
    changeUserData(state: UserData, action: PayloadAction<ChangeUserData>) {
      const inputValue = action.payload.currentInput;

      switch (action.payload.dataType) {
        case "firstName":
          state.firstName = inputValue;
          break;

        case "lastName":
          state.lastName = inputValue;
          break;

        case "email":
          state.email = inputValue;
          break;

        case "password":
          state.password = inputValue;
          break;
      }
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
