import { AppDispatch } from "../store/index";
import { cartActions } from "./cart-slice";

interface User {
  loggedIn: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  allowExtraEmails: boolean;
  profilePicture: string;
  id: string;
}

interface PictureProps {
  userData: User;
  dataURL: string;
}

export const patchProfilePicture = function ({
  userData,
  dataURL,
}: PictureProps) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users.json"
    );
    if (!response.ok) {
      throw new Error("Could not change profile picture.");
    }
    const firebaseUsersData = await response.json();

    for (const user in firebaseUsersData) {
      const firebaseUserEmail: string = firebaseUsersData[user].email;

      if (firebaseUserEmail === userData.email) {
        // console.log(firebaseUserEmail);
        const patchResponse = await fetch(
          `https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users/${user}.json`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ profilePicture: dataURL }), // Updates existing attribute
          }
        );
        if (!patchResponse.ok) {
          throw new Error("Could not change profile picture.");
        }
      }
    }
  };
};

interface DataProps {
  userData: User;
  dataType: string;
  newValue: string;
}

export const patchUserData = function ({
  userData,
  dataType,
  newValue,
}: DataProps) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users.json"
    );
    if (!response.ok) {
      throw new Error("Could not change profile picture.");
    }
    const firebaseUsersData = await response.json();

    for (const user in firebaseUsersData) {
      const firebaseUserEmail: string = firebaseUsersData[user].email;

      if (firebaseUserEmail === userData.email) {
        console.log(firebaseUserEmail);
        const patchResponse = await fetch(
          `https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users/${user}.json`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ [dataType]: newValue }),
          }
        );
        if (!patchResponse.ok) {
          throw new Error("Could not change profile picture.");
        }
      }
    }
  };
};
