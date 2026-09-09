import { emailValidation, bopEmailValidation } from "@/common/utils";

/**
 * Updates the email field and its related validation states.
 *
 * @param {string} email - The new email value.
 */
const updateEmail = (email, setCredentials) => {
  const isValid = emailValidation(email); // Assuming emailValidation is a defined function
  setCredentials((prev) => ({
    ...prev,
    email: email,
    hasErrorOnEmail: email === "" ? true : false,
    hasEmailisValid: isValid,
  }));
};

const updatePassword = (password, setCredentials) => {
  setCredentials((prev) => ({
    ...prev,
    password,
    hasErrorOnPassword: password === "" ? true : false,
  }));
};

const updateUsername = (username, setCredentials) => {
  const isValid = bopEmailValidation(username);
  setCredentials((prev) => ({
    ...prev,
    email: username,
    hasErrorOnUserName: username === "" ? true : false,
    hasUserNameIsValid: isValid,
  }));
};
export { updateEmail, updatePassword, updateUsername };
