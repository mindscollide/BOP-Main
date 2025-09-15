// src/utils/apiCaller.js
import { setCustomHeaders } from "@/common/utils";
import axios from "axios";
import { ensureTokenRefreshed } from "./refreshHandler";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 🔑 Request interceptor
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

// 🔑 Response interceptor
api.interceptors.response.use(
  (response) => response, // success passthrough
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);

    const { status, data } = error.response;
    const code = data?.responseCode || status;

    // ⚠️ Token expired → refresh
    if (code === 417 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await ensureTokenRefreshed();
        localStorage.setItem("token", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        console.error("Token refresh failed:", refreshErr);
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshErr);
      }
    }

    // 🚨 Unauthorized → clear and redirect home
    if (code === 401) {
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject(error);
    }

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
      return response;
    } catch (error) {
      console.error(`Error calling ${url}:`, error);
      throw error.response?.data || error;
    }
  };

export default createPostAPI;
