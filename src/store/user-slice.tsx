import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../util/get-localStorage";

interface UserData {
  loggedIn: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  allowExtraEmails: boolean;
  profilePicture: string | null;
}

interface LoginProps {
  userData: UserData;
  rememberMe: boolean;
}

const initialState: UserData = getUserData();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state: UserData, action: PayloadAction<LoginProps>): UserData {
      const userData = { ...action.payload.userData, loggedIn: true };
      return userData;
    },
    logoutUser(state: UserData): UserData {
      const emptyUserData = {
        loggedIn: false,
        allowExtraEmails: true,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        profilePicture: null,
      };

      return emptyUserData;
    },
    changeProfilePicture(state: UserData, action: PayloadAction<string>) {
      state.profilePicture = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
