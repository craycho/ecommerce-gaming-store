import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../util/get-localStorage";

interface User {
  loggedIn: boolean;
  name: string;
  email: string;
}
interface PayloadData {
  existingName: string;
  existingUserEmail: string;
}

const initialState: User = { loggedIn: false, name: "", email: "" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state: User, action: PayloadAction<PayloadData>) {
      state.loggedIn = true;
      state.name = action.payload.existingName;
      state.email = action.payload.existingUserEmail;
    },
    logoutUser(state: User) {
      state.loggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
