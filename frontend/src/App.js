import "./App.css";
import Navbar from "./Components/Layout/Navbar/Navbar";
import HomePage from "./Components/Pages/HomePage/HomePage";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import RegisterPage from "./Components/Pages/RegisterPage/RegisterPage";
import ForgetPasswordPage from "./Components/Pages/ForgetPasswordPage/ForgetPasswordPage";
import ProfilePage from "./Components/Pages/ProfilePage/ProfilePage";
import ChatPageMember from "./Components/Pages/ChatPage/ChatPageMember";
import ChatPageGroup from "./Components/Pages/ChatPage/ChatPageGroup";
import FourmPage from "./Components/Pages/FourmPage/FourmPage";
import FourmInnerPage from "./Components/Pages/FourmInnerPage/FourmInnerPage";
import NewPostPage from "./Components/Pages/NewPostPage/NewPostPage";
import FourmInnerInnerPage from "./Components/Pages/FourmInnerInnerPage/FourmInnerInnerPage";
import GoToTop from "./GoToTop";

//
import ProfileSettingsPage from "./Components/Pages/ProfileSettings/ProfileSettings";

// ChatPageMemberImage
import chatPageMemberImage from "./Components/Asset/Images/Chatpage/ChatPageMember/memberImage.png";
import MemberShipPlanPage from "./Components/Pages/MemberShipPlanPage/MemberShipPlanPage";
import GallaryPagePublic from "./Components/Pages/GallaryPage/GallaryPagePublic";
import GallaryFriendsOnly from "./Components/Pages/GallaryPage/GalleryFriendsOnly";
import SingleUserChat from "./Components/Pages/SingleUserChat/SingleUserChat";
import { useSelector, useDispatch } from "react-redux";
import GalleryUpload from "./Components/Pages/GallaryPage/GalleryUpload";
import { ToastContainer, toast } from "react-toastify";

import * as React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

import AdminHome from "./Components/Admin/AdminHome";

import { useGetUsersQuery } from "./services/user";
import { useGetUserStatusQuery } from "./services/userStatus";
import { useGetForumsQuery } from "./services/forum";
import { getAllForums } from "./Slice/forumSlice";
import { useGetForumsTopicQuery } from "./services/forumTopic";
import { getAllForumTopics } from "./Slice/forumTopicSlice";
import { useGetForumsCommentsQuery } from "./services/forumComment";
import { getAllForumComments } from "./Slice/forumCommentSlice";
import { useEffect, useState } from "react";

import axios from "axios";

import { userCookieChange } from "./Slice/loginSlice";

import {
  getAllUsers,
  getAllUsersOnlineAndBlockStatus,
} from "./Slice/userSlice";

import Cookies from "js-cookie";

import { useUpdateUserStatusByIdMutation } from "./services/userStatus";

function App() {
  const dispatch = useDispatch();

  const [updateUserStatusById] = useUpdateUserStatusByIdMutation();

  const responseGetAllUsers = useGetUsersQuery();
  const responseGetAllUserStatus = useGetUserStatusQuery();
  const responseGetAllForums = useGetForumsQuery();
  const responseGetAllForumTopics = useGetForumsTopicQuery();
  const responseGetAllForumComments = useGetForumsCommentsQuery();
  // console.log(responseGetAllForumComments);
  const {
    users,
    userOnlineAndBlockStatus,
    userCreate,
    userUpdate,
    userRefetch,
    userStatus,
    userBlock,
    userStatusId,
  } = useSelector((state) => state.userState);

  const { forums, forumRefetch } = useSelector((state) => state.forumState);

  const { forumTopics, forumTopicCreate, forumTopicUpdate, forumTopicRefetch } =
    useSelector((state) => state.forumTopicState);

  const {
    forumComments,
    forumCommentUpdate,
    forumCommentCreate,
    forumCommentRefetch,
  } = useSelector((state) => state.forumCommentState);

  // console.log(forumComments);

  useEffect(() => {
    if (
      Cookies.get("userLoginCookie") === undefined ||
      Cookies.get("userLoginCookie") === "undefined"
    ) {
      dispatch(userCookieChange("No Cookie"));
      const updateData = {
        id: userStatusId,
        updateData: {
          status: false,
        },
      };
      updateUserStatusById(updateData);
    } else {
      dispatch(userCookieChange(Cookies.get("userLoginCookie")));
    }
  }, [Cookies.get("userLoginCookie")]);

  // console.log(localStorage.getItem("userLoginCookie"));

  const apiFetch = async () => {
    const responseGetAllUsersRefetch = await responseGetAllUsers.refetch();

    const responseGetAllUserStatusRefetch =
      await responseGetAllUserStatus.refetch();
    const responseGetAllForumsRefetch = await responseGetAllForums.refetch();
    const responseGetAllForumTopicsRefetch =
      await responseGetAllForumTopics.refetch();
    const responseGetAllForumCommentsRefetch =
      await responseGetAllForumComments.refetch();

    if (responseGetAllUsersRefetch.isSuccess) {
      dispatch(getAllUsers(responseGetAllUsersRefetch?.data));
    }
    if (responseGetAllUserStatusRefetch.isSuccess) {
      dispatch(
        getAllUsersOnlineAndBlockStatus(responseGetAllUserStatusRefetch?.data)
      );
    }
    if (responseGetAllForumsRefetch.isSuccess) {
      dispatch(getAllForums(responseGetAllForumsRefetch?.data?.data));
    }
    if (responseGetAllForumTopicsRefetch.isSuccess) {
      dispatch(getAllForumTopics(responseGetAllForumTopicsRefetch?.data?.data));
    }
    if (responseGetAllForumCommentsRefetch.isSuccess) {
      dispatch(
        getAllForumComments(responseGetAllForumCommentsRefetch?.data?.data)
      );
    }
  };

  useEffect(() => {
    apiFetch();
    dispatch(getAllUsers(responseGetAllUsers?.data));
    dispatch(getAllUsersOnlineAndBlockStatus(responseGetAllUserStatus?.data));
    dispatch(getAllForums(responseGetAllForums?.data?.data));
    dispatch(getAllForumTopics(responseGetAllForumTopics?.data?.data));
    dispatch(getAllForumComments(responseGetAllForumComments?.data?.data));
  }, [
    userCreate,
    userUpdate,
    userRefetch,
    userStatus,
    userBlock,
    forumRefetch,
    forumTopicCreate,
    forumTopicUpdate,
    forumTopicRefetch,
    forumCommentUpdate,
    forumCommentCreate,
    forumCommentRefetch,
    responseGetAllUsers.isSuccess,
    responseGetAllUserStatus.isSuccess,
    responseGetAllForums.isSuccess,
    responseGetAllForumTopics.isSuccess,
    responseGetAllForumComments.isSuccess,
  ]);

  const location = window.location.pathname;
  const chatPageMembersData = [
    {
      name: "Alissa Kiss",
      status: true,
      image: chatPageMemberImage,
    },
    {
      name: "Melissa Kiss",
      status: false,
      image: chatPageMemberImage,
    },
    {
      name: "Lissa Kiss",
      status: true,
      image: chatPageMemberImage,
    },
  ];

  // console.log(location);

  const chatPageGroupData = [
    {
      name: "Group 1",
      // status: true,
      image: chatPageMemberImage,
    },
    {
      name: "Group 2",
      // status: false,
      image: chatPageMemberImage,
    },
    {
      name: "Group 3",
      // status: true,
      image: chatPageMemberImage,
    },
  ];
  const { adminLogin } = useSelector((state) => state.userLogin);
  return (
    <BrowserRouter>
      <>
        {responseGetAllUsers.isLoading &&
        responseGetAllUserStatus.isLoading &&
        responseGetAllForums.isLoading &&
        responseGetAllForumTopics.isLoading &&
        responseGetAllForumComments.isLoading ? (
          <div className='p-[2rem] flex flex-row items-center justify-center h-screen bg-[#80011F]'>
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color='secondary' />
              <LinearProgress color='success' />
              <LinearProgress color='inherit' />
            </Stack>
          </div>
        ) : (
          <div className='App'>
            {location !== "/admin" && <Navbar />}
            <GoToTop />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/forum' element={<FourmPage />} />
              <Route path='/forum/:forumId' element={<FourmInnerPage />} />
              <Route
                path='/forumTopicComments/:forumCommentId'
                element={<FourmInnerInnerPage />}
              />
              <Route path='/membershipplans' element={<MemberShipPlanPage />} />
              <Route path='/galleryPage' element={<GallaryPagePublic />} />
              <Route
                path='/galleryFriendsOnly'
                element={<GallaryFriendsOnly />}
              />
              <Route path='/galleryUpload' element={<GalleryUpload />} />
              <Route
                path='/forum/forumtopic/:forumtopicId'
                element={<NewPostPage />}
              />
              <Route path='/singleuserchat' element={<SingleUserChat />} />
              <Route element={<LoginPage />} path='/Login' />
              <Route element={<RegisterPage />} path='/Register' />
              <Route element={<ForgetPasswordPage />} path='/ForgetPassword' />
              <Route element={<ProfilePage />} path='/Profile/:userId' />
              <Route
                element={<ChatPageMember data={chatPageMembersData} />}
                path='/ChatMember'
              />
              <Route
                element={<ChatPageGroup data={chatPageGroupData} />}
                path='/ChatGroup'
              />
              <Route
                element={<ProfileSettingsPage />}
                path='/ProfileSettings'
              />

              {/* Admin */}
              <Route element={<AdminHome />} path='/admin' />
            </Routes>
          </div>
        )}
      </>
    </BrowserRouter>
  );
}

export default App;
