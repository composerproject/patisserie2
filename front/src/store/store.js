// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import yamsReducer from "./yamsSlice";
import { pastryApi } from "../features/pastry";
import meReducer from "./meSlice";
import authReducer from "./auth";

export const store = configureStore({
  reducer: {
    yams: yamsReducer,
    me: meReducer,
    auth: authReducer,
    [pastryApi.reducerPath]: pastryApi.reducer, // Include the pastryApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pastryApi.middleware), // Include the pastryApi middleware
});
