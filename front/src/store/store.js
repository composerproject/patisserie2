// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import yamsReducer from "./yamsSlice";
import { pastryApi } from "../features/pastry";

export const store = configureStore({
  reducer: {
    yams: yamsReducer,
    [pastryApi.reducerPath]: pastryApi.reducer, // Include the pastryApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pastryApi.middleware), // Include the pastryApi middleware
});
