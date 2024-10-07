import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const instance = axios.create({
  baseURL: "https://connections-api.goit.global",
});

const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  delete instance.defaults.headers.common.Authorization;
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      if (!credentials.email || !credentials.password || !credentials.name) {
        throw new Error("Please provide all required fields: name, email, password.");
      }

      const { data } = await instance.post("/users/signup", credentials);
      setAuthHeader(data.token);  
      return data;
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Something went wrong!"
      );
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await instance.post("/users/login", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await instance.post("/users/logout");
      clearAuthHeader();  // 
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;  // 

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);  // 
      const { data } = await instance.get("/users/current"); 
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
