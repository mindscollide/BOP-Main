// src/utils/apiCaller.js
import {
  decrypt,
  decryptFormData,
  encrypt,
  encryptFormData,
  setCustomHeaders,
} from "@/common/utils";
import axios from "axios";

/**
 * Higher-order function for making POST API calls
 * @param {string} url - The endpoint URL
 * @returns {function} - A function that takes bodyData and makes a POST request
 */
const createPostAPI = (url, requestMethod) => async (bodyData) => {
  try {
    const headers = setCustomHeaders(bodyData?.isDoc, bodyData?.ext); // Pass parameters if needed

    const form = new FormData();
    form.append("RequestMethod", requestMethod);

    if (bodyData) {
      form.append("RequestData", JSON.stringify(bodyData));
    }

    const axiosConfig = {
      method: "post",
      url,
      data: form,
      headers,
    };

    // Conditionally add responseType if a file exists
    if (bodyData?.file) {
      axiosConfig.responseType = "blob";
    }

    const response = await axios(axiosConfig);
    return response;
  } catch (error) {
    console.error(`Error calling ${url}:`, error);
    throw error.response?.data || error;
  }
};

export default createPostAPI;
