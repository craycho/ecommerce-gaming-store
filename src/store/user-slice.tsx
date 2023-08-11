import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../util/get-local-storage";

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

// interface LoginProps {
//   userData: UserData;
//   rememberMe: boolean;
// }

interface ChangeUserData {
  dataType: string;
  currentInput: string;
}

const initialState: UserData = getUserData();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state: UserData, action: PayloadAction<UserData>): UserData {
      return { ...action.payload, loggedIn: true };
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
    subscribeToNewsLetter(state: UserData) {
      state.allowExtraEmails = true;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
