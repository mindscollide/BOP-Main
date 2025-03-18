import { emailValidation } from "@/common/utils";

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
  setCredentials((prev) => ({
    ...prev,
    email: username,
    hasErrroOnUserName: username !== "" ? false : true,
  }));
};
export { updateEmail, updatePassword, updateUsername };
