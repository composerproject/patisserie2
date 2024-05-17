// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { pastryApi } from "../features/pastry";
import yamsReducer from "../store/yamsSlice";
import authReducer from "./auth";

export const store = configureStore({
  reducer: {
    yams: yamsReducer,
    auth: authReducer,
    [pastryApi.reducerPath]: pastryApi.reducer, // Include the pastryApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pastryApi.middleware), // Include the pastryApi middleware
});
