// store.js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
