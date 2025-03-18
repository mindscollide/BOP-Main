import axios from "axios";

// Function to set custom headers
const setCustomHeaders = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    return {
      _token: token,
      "Content-Type": "multipart/form-data",
    };
  } else {
    return {
      "Content-Type": "multipart/form-data",
    };
  }
};

const emailValidation = (text) => {
  // Correct regex pattern for email validation
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test if the input text matches the regex pattern
  const isValid = emailRegex.test(text);

  return isValid; // Return true if valid, false otherwise
};

const roleBasedNavigation = (navigate, roleID) => {
  // 1	Bank
  // 2	Corporate
  // 3	Broker
  // 6	Auditor
  // 7	Dealer
  // 8	Treasury
  // 9	Branch
  if (roleID === 1) {
  } else if (roleID === 2) {
    navigate("/BOP/corporate");
  } else if (roleID === 3) {
  } else if (roleID === 6) {
  } else if (roleID === 7) {
    navigate("/BOP/dealer");
  } else if (roleID === 8) {
    navigate("/BOP/treasury");
  } else if (roleID === 9) {
    navigate("/BOP/branch");
  }
};
export { setCustomHeaders, emailValidation, roleBasedNavigation };
