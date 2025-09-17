// src/utils/apiCaller.js
import { setCustomHeaders } from "@/common/utils";
import axios from "axios";
import { ensureTokenRefreshed } from "./refreshHandler";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // adjust to your backend
});

// 🔑 Request interceptor → attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers = {
      ...config.headers,
      ...(setCustomHeaders(false) || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  async (response) => {

    console.log(response, "response from interceptor");
    // 🔎 Check for token expired inside success case
    if (response.data?.responseCode === 417) {
      const originalRequest = response.config;

      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newToken = await ensureTokenRefreshed();

          // Update token header
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          // Retry the request
          return api(originalRequest);
        } catch (err) {
          console.error("Refresh failed → redirecting to login", err);
          localStorage.clear();
          window.location.href = "/";
          return Promise.reject(err);
        }
      }
    }
    if (response.data?.responseCode === 401) {
      try {
        localStorage.clear();
        window.location.href = "/";
        return;
      } catch (error) {
        return Promise.reject("error");
      }
    }

    return response; // Normal response
  },
  (error) => {
    // Network errors, HTTP 4xx/5xx still handled here
    return Promise.reject(error);
  }
);

const createPostAPI =
  (url, requestMethod) => async (bodyData, isDoc, fileName, ext) => {
    try {
      const headers = setCustomHeaders(isDoc, fileName, ext);

      const form = new FormData();
      form.append("RequestMethod", requestMethod);

      if (bodyData && typeof bodyData === "object") {
        form.append("RequestData", JSON.stringify(bodyData));
      }

      if (isDoc && bodyData?.file instanceof File) {
        form.append("File", bodyData.file);
      }

      const config = {
        method: "POST",
        url,
        data: form,
        headers,
        ...(isDoc ? { responseType: "arraybuffer" } : {}),
      };

      const response = await api(config);

      console.log(response, "responseresponse");
      return response;
    } catch (error) {
      console.error(`Error calling ${url}:`, error);
      throw error.response?.data || error;
    }
  };

export default createPostAPI;
