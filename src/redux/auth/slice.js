import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';

import toast from 'react-hot-toast';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: (builder) => {
    builder
    .addCase(register.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    })
    .addCase(register.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.token = payload.token;
      state.user = payload.user;
    })
    .addCase(register.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    })

      .addCase(logIn.pending, (state) => {
        state.error = null;

      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;  
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Unknown error';  
      })

      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null; 
      })

      .addCase(refreshUser.pending, (state) => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
      });
  },
});

export default authSlice.reducer;





