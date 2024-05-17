import { createSlice } from "@reduxjs/toolkit";
import { pastryApi } from "../features/pastry"; // Adjust the import path as needed

// export const fetchMe = () => {
//     console.log("FETCH ME !")
// }

export const fetchMe = () => (dispatch) => {
  // return pastryApi.reducerPath;
  return dispatch(pastryApi.endpoints.getMe.initiate());
};

// Initial state of the user slice
const initialState = {
  user: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(pastryApi.endpoints.getMe.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(pastryApi.endpoints.getMe.matchFulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addMatcher(pastryApi.endpoints.getMe.matchRejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { clearUserData } = meSlice.actions;
export default meSlice.reducer;
