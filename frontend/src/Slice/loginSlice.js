import { createSlice } from "@reduxjs/toolkit";
const availableUser =
  localStorage.getItem("userLogin") !== null
    ? [JSON.parse(localStorage.getItem("userLogin"))]
    : [];
const avaliableAdminLogin =
  localStorage.getItem("adminLogin") !== null
    ? [JSON.parse(localStorage.getItem("adminLogin"))]
    : [];

const availableUserCookie =
  localStorage.getItem("userLoginCookie") !== null
    ? localStorage.getItem("userLoginCookie")
    : "No Cookie";

const availableAdminCookie =
  localStorage.getItem("adminLoginCookie") !== null
    ? localStorage.getItem("adminLoginCookie")
    : "No Cookie";

const initialState = {
  login: availableUser,
  adminLogin: avaliableAdminLogin,
  userCookie: availableUserCookie,
  adminCookie: availableAdminCookie,
};
export const userLogin = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    userLoginChange: (state, action) => {
      state.login = action.payload;
      localStorage.setItem("userLogin", JSON.stringify(action.payload));
    },
    userLogoutChange: (state) => {
      state.login = [];
      localStorage.removeItem("userLogin");
    },
    adminLoginChange: (state, action) => {
      state.adminLogin = action.payload;
      localStorage.setItem("adminLogin", JSON.stringify(action.payload));
    },
    adminLogoutChange: (state) => {
      state.adminLogin = [];
      localStorage.removeItem("adminLogin");
    },
    userCookieChange: (state, action) => {
      state.userCookie = action.payload;
      localStorage.setItem("userLoginCookie", action.payload);
    },
    adminCookieChange: (state, action) => {
      state.adminCookie = action.payload;
      localStorage.setItem("adminLoginCookie", action.payload);
    },
  },
});
export const {
  userLoginChange,
  userLogoutChange,
  adminLoginChange,
  adminLogoutChange,
  userCookieChange,
  adminCookieChange,
} = userLogin.actions;
export default userLogin.reducer;
