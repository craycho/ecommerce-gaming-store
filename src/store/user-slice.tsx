import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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

const initialState: User = {
  loggedIn: false,
  allowExtraEmails: true,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state: User, action: PayloadAction<LoggedInUserData>) {
      state.loggedIn = true;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    logoutUser(state: User) {
      state.loggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
