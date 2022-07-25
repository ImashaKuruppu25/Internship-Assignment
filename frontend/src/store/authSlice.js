import { createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userId: null,
    userName: null,
    userType: null,
    token: null,
  },
  reducers: {
    login(state, action) {
      const token = action.payload;

      const tokenPayload = jwt(token);
   
      state.isLoggedIn = true;
      state.userId = tokenPayload.userId;
      state.userName = tokenPayload.name;
      state.userType = tokenPayload.type;
      state.token = token;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.userId = null;
      state.userName = null;
      state.userType = null;
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
