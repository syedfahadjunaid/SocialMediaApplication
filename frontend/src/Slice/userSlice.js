import { createSlice } from "@reduxjs/toolkit";

const userStatus =
  localStorage.getItem("userStatus") !== null
    ? localStorage.getItem("userStatus")
    : "";

const initialState = {
  users: [],
  userOnlineAndBlockStatus: [],
  userCreate: "",
  userUpdate: "",
  userRefetch: 0,
  userStatusId: userStatus,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    getAllUsersOnlineAndBlockStatus: (state, action) => {
      state.userOnlineAndBlockStatus = action.payload;
    },
    updateUserChange: (state, action) => {
      state.userUpdate = action.payload;
    },
    createUserChange: (state, action) => {
      state.userCreate = action.payload;
    },
    userRefetchChange: (state, action) => {
      state.userRefetch = action.payload;
    },
    userStatusChange: (state, action) => {
      state.userStatusId = action.payload;
      localStorage.setItem("userStatus", action.payload);
    },
  },
});
export const {
  getAllUsers,
  getAllUsersOnlineAndBlockStatus,
  updateUserChange,
  createUserChange,
  userRefetchChange,
  userStatusChange,
} = userSlice.actions;
export default userSlice.reducer;
