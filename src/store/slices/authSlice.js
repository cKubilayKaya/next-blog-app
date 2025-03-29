import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import Cookies from "js-cookie";

const isBrowser = typeof window !== "undefined";

const initialState = {
  user: null,
  token: null,
  authLoader: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuth: (state) => {
      const storedUser = isBrowser && localStorage.getItem("user");
      const storedToken = isBrowser && Cookies.get("token");

      if (storedUser && storedToken) {
        state.user = JSON.parse(storedUser);
        state.token = storedToken;
      } else {
        state.user = null;
        state.token = null;
      }

      state.authLoader = false;
    },
    register: (state, action) => {
      state.user = action.payload.user;
      state.token = null;
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
    },
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      document.cookie = `token=${action.payload.token}; path=/; max-age=${process.env.TOKEN_EXPIRATION}; SameSite=Strict`;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    profileUpdate: (state, action) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
      localStorage.removeItem("user");
    },
  },
});

export const { login, register, profileUpdate, logout, initializeAuth, setUserLoading } = authSlice.actions;

export const useAuth = () => {
  const dispatch = useDispatch();

  const createActionHandler = useCallback(
    (action) => {
      return (payload) => {
        dispatch(action(payload));
      };
    },
    [dispatch]
  );

  return {
    initializeAuthAction: createActionHandler(initializeAuth),
    loginAction: createActionHandler(login),
    registerAction: createActionHandler(register),
    profileUpdateAction: createActionHandler(profileUpdate),
    logoutAction: createActionHandler(logout),
  };
};

export default authSlice.reducer;
