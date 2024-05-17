// import { createSlice } from "@reduxjs/toolkit";
// import { pastryApi } from "../features/pastry";

// // Creating a simple action to initiate the fetchMe process.
// export const fetchMe = () => (dispatch, getState) => {
//   return dispatch(pastryApi.endpoints.getMe.initiate());
// };

// // Initial state of the user slice
// const initialState = {
//   user: {},
//   status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,
// };

// const meSlice = createSlice({
//   name: "me",
//   initialState,
//   reducers: {
//     clearUserData: (state) => {
//       state.user = {};
//       state.status = "idle";
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addMatcher(pastryApi.endpoints.getMe.matchPending, (state) => {
//         state.status = "loading";
//       })
//       .addMatcher(
//         pastryApi.endpoints.getMe.matchFulfilled,
//         (state, { payload }) => {
//           state.status = "succeeded";
//           state.user = payload; // Assuming payload directly contains the user data
//         }
//       )
//       .addMatcher(
//         pastryApi.endpoints.getMe.matchRejected,
//         (state, { error }) => {
//           state.status = "failed";
//           state.error = error;
//         }
//       );
//   },
// });

// export const { clearUserData } = meSlice.actions;
// export default meSlice.reducer;
