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

interface ActionProps {
  userData: User;
  dataURL: string;
}

export const patchProfilePicture = function ({
  userData,
  dataURL,
}: ActionProps) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users.json"
    );
    if (!response.ok) {
      throw new Error("Could not fetch product data.");
    }
    const firebaseUsersData = await response.json();

    for (const user in firebaseUsersData) {
      const firebaseUserEmail: string = firebaseUsersData[user].email;

      if (firebaseUserEmail === userData.email) {
        console.log(firebaseUserEmail);
        const postResponse = await fetch(
          `https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users/${user}.json`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ profilePicture: dataURL }), // Updates existing attribute
          }
        );
        console.log(postResponse);
      }
    }
  };
};
