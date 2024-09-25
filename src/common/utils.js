import axios from "axios";

// Function to set default headers for axios
const setAxiosDefaults = () => {
  let token = localStorage.getItem("token");
  if (token !== null) {
    axios.defaults.headers.common["_token"] = `Bearer ${token}`;
  }
  axios.defaults.headers.common["Content-Type"] = "application/json";
};

// Optionally, reset the headers
const clearAxiosDefaults = () => {
  delete axios.defaults.headers.common["_token"];
  delete axios.defaults.headers.common["Content-Type"];
};

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

export { setAxiosDefaults, clearAxiosDefaults, setCustomHeaders };
