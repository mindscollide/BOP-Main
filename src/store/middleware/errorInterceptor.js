import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";

// src/store/middleware/errorInterceptor.js
export const errorInterceptor = ({ dispatch, getState }) => (next) => async (action) => {
    // Only handle rejected thunks
    if (action.type.endsWith("/rejected")) {
      const error = action.payload;
  
      if (typeof error === "string" && error.includes("401")) {
        // Unauthorized: navigate to login or dispatch logout
        window.location.href = "/";
      }
  
      if (typeof error === "string" && error.includes("417") && action.meta?.originalAction ) {
        // Token expired: attempt to refresh token
        const result = await dispatch(refreshTokenAction({}));
  
        if (refreshTokenAction.fulfilled.match(result)) {
            dispatch(action.meta.originalAction); // Retry original
          // Optionally re-dispatch the failed action (careful of infinite loops)
          // You may store the original action in metadata to retry it
        } else {
          window.location.href = "/";
        }
      }
    }
  
    return next(action);
  };
  