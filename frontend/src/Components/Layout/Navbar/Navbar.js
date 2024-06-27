import React, { useEffect } from "react";
import "./Navbar.css";
import { Menu } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { userLogoutChange } from "../../../Slice/loginSlice";

import { useUpdateUserStatusByIdMutation } from "../../../services/userStatus";

import Cookies from "js-cookie";

import { useUserLogoutMutation } from "../../../services/user";

function Navbar() {
  const [updateUserStatusById] = useUpdateUserStatusByIdMutation();
  const { login, userCookie } = useSelector((state) => state.userLogin);

  const { userStatusId } = useSelector((state) => state.userState);

  const [userLogout, responseUserLogout] = useUserLogoutMutation();

  console.log(responseUserLogout);

  useEffect(() => {
    if (responseUserLogout.isSuccess) {
      setIsLoading(false);
      dispatch(userLogoutChange([]));

      Cookies.remove("userLoginCookie");

      const updateData = {
        id: userStatusId,
        updateData: {
          status: false,
        },
      };
      updateUserStatusById(updateData);

      handleClose();
      history("/");
    }
  }, [responseUserLogout.isSuccess]);

  // console.log(userStatusId);
  // console.log(userCookie);
  // console.log(login[0]?._id);

  let activeStyle = {
    color: "rgb(251 245 245)",
    fontweight: "500",
  };

  // useEffect(() => {
  //   console.log(login);
  // }, [login]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  // console.log(localStorage.getItem("userLoginCookie"));

  const logoutHandle = async () => {
    const logoutData = {
      token: localStorage.getItem("userLoginCookie"),
      userData: {
        userId: userStatusId,
      },
    };
    // console.log(logoutData);
    userLogout(logoutData);

    setIsLoading(true);
    // const data = await axios
    //   .delete(
    //     `${
    //       process.env.React_App_Base_url +
    //       "userLogout"
    //     }`,

    //     {
    //       headers: { "Content-type": "application/json" },
    //     }
    //   )
    //   .then((response) => response, setIsLoading(true))
    //   .catch((error) => console.log(error))
    //   .finally(() => setIsLoading(false));
    // if (data?.status === 200) {
    //   dispatch(userLogoutChange([]));

    //   Cookies.remove("userLoginCookie");

    //   const updateData = {
    //     id: userStatusId,
    //     updateData: {
    //       status: false,
    //     },
    //   };
    //   updateUserStatusById(updateData);

    //   handleClose();
    //   history("/");
    // }
    // const formData = new FormData();

    // formData.append("userId", login[0]?._id);

    // const userLogoutId = {
    //   userId: login[0]?._id,
    // };

    // console.log(userLogoutId);

    // const data = await axios
    //   .delete(
    //     `${process.env.React_App_Base_url + "userLogout/" + userCookie}`,
    //     userLogoutId,
    //     {
    //       headers: {
    //         "Content-type": "multipart/form-data",
    //         "Content-type": "application/json",
    //       },
    //     }
    //   )
    //   .then((response) => response, setIsLoading(true))
    //   .catch((error) => console.log(error))
    //   .finally(() => setIsLoading(false));
    // if (data?.status === 200) {
    //   dispatch(userLogoutChange([]));

    //   Cookies.remove("userLoginCookie");

    //   const updateData = {
    //     id: userStatusId,
    //     updateData: {
    //       status: false,
    //     },
    //   };
    //   updateUserStatusById(updateData);

    //   handleClose();
    //   history("/");
    // }
    // const data = await axios
    //   .delete(`${process.env.React_App_Base_url + "userLogout"}`, {
    //     headers: { "Content-type": "application/json" },
    //   })
    //   .then((response) => response, setIsLoading(true))
    //   .catch((error) => console.log(error))
    //   .finally(() => setIsLoading(false));
    // if (data?.status === 200) {
    //   dispatch(userLogoutChange([]));

    //   Cookies.remove("userLoginCookie");

    //   const updateData = {
    //     id: userStatusId,
    //     updateData: {
    //       status: false,
    //     },
    //   };
    //   updateUserStatusById(updateData);

    //   handleClose();
    //   history("/");
    // }
  };

  return (
    <div className='navbar'>
      <div className='navbar_left'>LOGO</div>
      <div className='navbar_center'>
        <ul>
          <li>
            <NavLink
              to='/'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Home
            </NavLink>{" "}
          </li>
          <li>
            <NavLink
              to='/forum'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Forum
            </NavLink>
          </li>
          <li>
            <NavLink to='#'>Gallery</NavLink>
          </li>
          <li>
            <NavLink
              to='/ChatMember'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              ChatRoom
            </NavLink>
          </li>
          <li>
            <NavLink to='#'>PPV</NavLink>
          </li>
          <li>
            <NavLink to='#'>Search</NavLink>
          </li>
          {userCookie !== "No Cookie" ? (
            <li className='myprofile'>
              <NavLink
                to='/ProfileSettings'
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className='profile_myprofile'>
                My Profile
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                to='/Login'
                style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                Login
              </NavLink>
            </li>
          )}
          {userCookie !== "No Cookie" && <li onClick={handleOpen}>Logout</li>}
        </ul>
      </div>
      <div className='navbar_right'>
        <Menu />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Are You Sure ?
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <Button
              variant='contained'
              color='error'
              style={{ marginRight: "15px" }}
              onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='contained' onClick={logoutHandle}>
              proceed
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Navbar;
