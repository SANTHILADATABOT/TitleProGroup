import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie } from "../../utils/lib/Cookie"; // Import cookie utility functions

export const login = createAsyncThunk(
  "auth/login",
  async ({ response }, { rejectWithValue }) => {
    console.log("response", response);
    try {
      const responseData = await new Promise((resolve, reject) => {
        if (!response) return reject("Invalid username or password");
        resolve(response);
      });
      // const valid = {
      //   ...responseData,
      //   expiresIn: Math.floor(Date.now() / 1000) + 180,
      // };
      localStorage.setItem("authData", JSON.stringify(responseData));
      setCookie("user", JSON.stringify(responseData), 1);
      return responseData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false,
};

const storedAuthData = localStorage.getItem("authData");
if (storedAuthData) {
  initialState.isAuthenticated = true;
  initialState.user = JSON.parse(storedAuthData);
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem("authData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const isAuthenticated = (state) => state.auth.isAuthenticated;
export const user = (state) => state.auth.user;
export default authSlice.reducer;
