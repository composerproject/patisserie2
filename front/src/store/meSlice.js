import { createSlice } from '@reduxjs/toolkit';
import { pastryApi } from '../features/pastry'; // Adjust the import path as needed

// export const fetchMe = () => {
//     console.log("FETCH MEEE !!! ME ME ME ME ME MEEE")
// }


export const fetchMe = () => (dispatch) => {
    // return "Second Fetch ;)";
    // return pastryApi.reducerPath;
    // return dispatch(pastryApi.endpoints.getPastries.initiate());
    return dispatch(pastryApi.endpoints.getMe.initiate());
};


// Initial state of the user slice
const initialState = {
  user: null,
//   user: "I AM A TEST USER FOR USEME HOOK ;)",
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    clearUserData: state => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        pastryApi.endpoints.getMe.matchPending,
        state => {
            // console.log("slice : loading");
          state.status = 'loading';
        }
      )
      .addMatcher(
        pastryApi.endpoints.getMe.matchFulfilled,
        (state, action) => {
        // console.log("slice : succeeded");
          state.status = 'succeeded';
          state.user = action.payload; // assuming the payload is the user object
          // state.user = {id:1,name:"Alice"}; // assuming the payload is the user object
        }
      )
      .addMatcher(
        pastryApi.endpoints.getMe.matchRejected,
        (state, action) => {
          // console.log("slice : failed : ");
          // console.log(action.error)
          state.status = 'failed';
          state.error = action.error; // assuming the error is returned in action.error
        }
      )

  }
});

export const { clearUserData } = meSlice.actions;
export default meSlice.reducer;
