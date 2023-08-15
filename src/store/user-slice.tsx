import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../util/get-local-storage";
import { User } from "../util/type-definitions";

interface ChangeUserData {
  dataType: string;
  currentInput: string;
}

const initialState: User = getUserData();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state: User, action: PayloadAction<User>): User {
      return { ...action.payload, loggedIn: true };
    },
    logoutUser(state: User): User {
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
    changeProfilePicture(state: User, action: PayloadAction<string>) {
      state.profilePicture = action.payload;
    },
    changeUserData(state: User, action: PayloadAction<ChangeUserData>) {
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
    subscribeToNewsLetter(state: User) {
      state.allowExtraEmails = true;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
