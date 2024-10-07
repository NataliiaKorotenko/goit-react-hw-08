import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,  // Флаг загрузки
  error: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;  
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Unknown error'; 
      })

      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
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
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null; 
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.error.message || 'Unknown error'; 
      });
  },
});

export default authSlice.reducer;





