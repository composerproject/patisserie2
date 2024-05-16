import { createSlice } from '@reduxjs/toolkit';

// Initial state of the auth slice
const initialState = {
  isLoggedIn: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

// Slice definition
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer to change login status
    changeloggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    // Reducer to set error
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    // Reset the auth state
    resetAuth: (state) => {
      state.isLoggedIn = false;
      state.status = 'idle';
      state.error = null;
    }
  }
});

export const { changeloggedIn, setAuthError, resetAuth } = authSlice.actions;
export default authSlice.reducer;
