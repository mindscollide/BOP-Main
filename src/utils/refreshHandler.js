// src/utils/refreshHandler.js
import { refreshTokenFn } from "@/container/loginScreens/authActions/refreshToken";

let isRefreshing = false;
let refreshPromise = null;

export const ensureTokenRefreshed = async () => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = await refreshTokenFn()
      .then((res) => {
        const { token, refreshToken } = res;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        return token;
      })
      .finally(() => {
        isRefreshing = false;
      });
  }
  return refreshPromise;
};
