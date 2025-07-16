// src/utils/apiCaller.js
import { setCustomHeaders } from "@/common/utils";
import axios from "axios";

/**
 * Higher-order function for making POST API calls
 * @param {string} url - The endpoint URL
 * @returns {function} - A function that takes bodyData and makes a POST request
 */
const createPostAPI =
  (url, requestMethod) => async (bodyData, isDoc, fileName, ext) => {
    try {
      const headers = setCustomHeaders(isDoc, fileName, ext);

      const form = new FormData();
      form.append("RequestMethod", requestMethod);

      // ✅ Always append RequestData as JSON string if it's an object
      if (bodyData && typeof bodyData === "object") {
        form.append("RequestData", JSON.stringify(bodyData));
      }

      // ✅ Only add a file if bodyData contains an actual File
      if (isDoc && bodyData?.file instanceof File) {
        form.append("File", bodyData.file);
      }

      const axiosConfig = {
        method: "post",
        url,
        data: form,
        headers,
      };

      // ✅ Add responseType for Excel or file downloads
      if (isDoc) {
        axiosConfig.responseType = "arraybuffer";
      }

      const response = await axios(axiosConfig);
      return response;
    } catch (error) {
      console.error(`Error calling ${url}:`, error);
      throw error.response?.data || error;
    }
  };

export default createPostAPI;
