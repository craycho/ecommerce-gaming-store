function containsSpecialChars(str: string) {
  const specialChars = /[`!@#$%^&*()_+\=\[\]{};:"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

const validateInput = (type: string, inputValue: string): boolean => {
  if (type === "firstName") {
    const isValid =
      !containsSpecialChars(inputValue) && inputValue.trim() !== "";
    return isValid;
  } else if (type === "lastName") {
    const isValid =
      !containsSpecialChars(inputValue) && inputValue.trim() !== "";
    return isValid;
  } else if (type === "email") {
    const validEmail = inputValue.includes("@") && inputValue.trim() !== "";
    return validEmail;
  } else if (type === "password") {
    return !(inputValue.trim().length < 8);
  } else {
    return false;
  }
};
export default validateInput;
