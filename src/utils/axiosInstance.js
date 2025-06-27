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
const createPostAPI =
  (url, requestMethod) => async (bodyData, isDoc, fileName, ext, navigate, rejectWithValue) => {
    try {
      console.log(bodyData, isDoc, fileName, ext, "createPostAPIcreatePostAPI");
      const headers = setCustomHeaders(isDoc, fileName, ext); // Pass parameters if needed

      const form = new FormData();
      form.append("RequestMethod", requestMethod);

      if (bodyData && !isDoc) {
        form.append("RequestData", JSON.stringify(bodyData));
      }
      if (isDoc) {
        // If the bodyData is a file, append it to the FormData
        if (bodyData) {
          form.append("File", bodyData);
        }
      }

      const axiosConfig = {
        method: "post",
        url,
        data: form,
        headers,
      };

      // Conditionally add responseType if a file exists
      if (bodyData?.isDoc) {
        axiosConfig.responseType = "blob";
      }

      const response = await axios(axiosConfig);
      // if(response.data.responseCode === 401) {
      //   navigate("/");
      //   throw new Error("Unauthorized access, please login again");
      // }
      return response;
    } catch (error) {
      console.error(`Error calling ${url}:`, error);
      throw error.response?.data || error;
    }
  };

export default createPostAPI;
