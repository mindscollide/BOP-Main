// src/utils/refreshHandler.js
import { refreshTokenFn } from "@/container/loginScreens/authActions/refreshToken";

let isRefreshing = false;
let refreshPromise = null;

export const ensureTokenRefreshed = async () => {
  if (isRefreshing) return refreshPromise;

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const newToken = await refreshTokenFn();
      return newToken;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};
