import { AppDispatch } from "../store/index";
import { userActions } from "./user-slice";
import { User } from "../util/type-definitions";

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

export const logoutUserLocal = function () {
  return async (dispatch: AppDispatch) => {
    // Cleara postojeci cart da bi fetch novi
    localStorage.setItem("cart", JSON.stringify([]));
    dispatch(userActions.logoutUser());
  };
};

export const subscribeToNewsletter = function (userData: User) {
  return async (dispatch: AppDispatch) => {
    const patchResponse = await fetch(
      `https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users/${userData.id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ allowExtraEmails: true }),
      }
    );
    if (!patchResponse.ok) {
      throw new Error("Could not subscribe to newsletter.");
    }

    dispatch(userActions.subscribeToNewsLetter());

    const cachedData = JSON.stringify({ ...userData, allowExtraEmails: true });
    localStorage.setItem("userData", cachedData);
    sessionStorage.setItem("userData", cachedData);
  };
};

export const addToSubscribersList = function (enteredEmail: string) {
  return async () => {
    const patchResponse = await fetch(
      `https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/subscribers.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: enteredEmail }),
      }
    );
    if (!patchResponse.ok) {
      throw new Error("Could not subscribe to newsletter.");
    }
  };
};
