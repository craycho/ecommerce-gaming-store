import { useReducer } from "react";

const enum ActionType {
  NAME = "NAME",
  LASTNAME = "LASTNAME",
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD",
}

interface ReducerAction {
  type: ActionType;
  inputValue: string;
}

const initialState = {
  value: "",
  isTouched: false,
};

const inputReducer = function (
  state: typeof initialState,
  action: ReducerAction
): typeof initialState {
  switch (action.type) {
    case "NAME": // Moze i ActionType.NAME
      return { value: "", isTouched: true };
    case "LASTNAME":
      return { value: "", isTouched: true };
    case "EMAIL":
      return { value: "", isTouched: true };
    case "PASSWORD":
      return { value: "", isTouched: true };
    default:
      throw new Error();
  }
};

function useValidateInput(inputType: string, inputValue: string) {
  const [state, dispatch] = useReducer(inputReducer, initialState);

  if (inputType === "name")
    dispatch({ type: ActionType.NAME, inputValue: inputValue });

  //   dispatch({ type: "NAME", dispatchValue: someValue });
}

export default useValidateInput;
