import { createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userId: null,
    sid: null,
    userName: null,
    userType: null,
    userStatus: null,
    token: null,
  },
  reducers: {
    login(state, action) {
      const token = action.payload;

      const tokenPayload = jwt(token);

      state.isLoggedIn = true;
      state.userId = tokenPayload.userId;
      state.sid = tokenPayload.sid;
      state.userName = tokenPayload.firstName;
      state.userType = tokenPayload.type;
      state.userStatus = tokenPayload.userStatus;
      state.token = token;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.userId = null;
      state.userName = null;
      state.sid = null;
      state.userType = null;
      state.userStatus = null;
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
