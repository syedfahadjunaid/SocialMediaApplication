import React, { useEffect, useState } from "react";
import "./RegisterPage.css";
import MUIRadio from "../../Layout/MUIRadio";
import axios from "axios";
import {
  Alert,
  Box,
  CircularProgress,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  useGetUsersQuery,
  useCreateUserMutation,
} from "../../../services/user";

import { useCreateUserStatusMutation } from "../../../services/userStatus";

import { useSelector, useDispatch } from "react-redux";

import { createUserChange } from "../../../Slice/userSlice";

export default function RegisterPage() {
  const responseGetAllUsers = useGetUsersQuery();
  const [createUser, responseCreateUser] = useCreateUserMutation();
  const [createUserStatus, responseCreateUserStatus] =
    useCreateUserStatusMutation();

  const dispatch = useDispatch();

  const { userCreate, userUpdate } = useSelector((state) => state.userState);

  // console.log(userCreate);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (responseCreateUser.isSuccess === true) {
      createUserStatus({
        userID: responseCreateUser?.data?._id,
        Status: false,
        Block: false,
      });
      dispatch(createUserChange(responseCreateUser?.data));
      setIsLoading(false);
      setOpen(true);
      setOpen2(true);
    } else if (responseCreateUser.status === "rejected") {
      setOpen1(true);
    }
  }, [responseCreateUser.isSuccess, responseCreateUser.status]);

  // console.log(responseCreateUser);

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
    outline: "0",
    borderRadius: "5px",
    color: "#80011f",
  };
  const [youAre, setYouAre] = React.useState("Male");
  const [passwordType, setPasswordType] = useState("password");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const youAreCategories = [
    "Male",
    "Female",
    "Couple (MF)",
    "Couple (MM)",
    "Couple (FF)",
    "TV/TS/CD",
  ];
  // useEffect(() => {
  //   console.log(youAre);
  // }, [youAre]);
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userDob: "",
  });
  const formDataHandle = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const formSubmitHandle = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("name", userData?.userName);
    // formData.append("email", userData?.userEmail);
    // // formData.append("contact", 0);
    // formData.append("password", userData?.userPassword);
    // formData.append("gender", youAre);
    // // formData.append("profile_type", "");
    // formData.append("subscription_type", "Not Subscribed");
    // // formData.append("sexual_orientation", "");
    // // formData.append("address", "");
    // // formData.append("Kink_Identity", "");
    // // formData.append("profileImage", "");
    // formData.append("Dateofbirth", userData?.userDob);

    // console.log(formData);

    const userUpdateData = {
      name: userData?.userName,
      username: userData?.userEmail,
      email: userData?.userEmail,
      contact: "",
      password: userData?.userPassword,
      MaritalStatus: "",
      contry: "",
      city: "",
      pincode: "",
      gender: youAre,
      profile_type: "",
      subscription_type: "Not Subscribed",
      Orientation: "",
      Aboutme: "",
      Enjoyed: [],
      Dateofbirth: userData?.userDob,
    };

    createUser(userUpdateData);
    // setIsLoading(true);

    // const data = await axios
    //   .post(`${process.env.React_App_Base_url + "userRegister"}`, formData, {
    //     headers: {
    //       "Content-type": "multipart/form-data",
    //       // "Content-type": "application/json",
    //     },
    //   })
    //   .then((response) => response, setIsLoading(true))
    //   .catch((error) => console.log(error))
    //   .finally(() => setIsLoading(false));
    // if (data?.status === 201) {
    //   setOpen(true);
    //   setOpen2(true);
    // }
    // if (data?.status !== 201) {
    //   setOpen1(true);
    // }

    // console.log(data);
  };
  // useEffect(() => {
  //   console.log(userData.userName, process.env.React_App_Base_url);
  // }, [userData]);
  return (
    <div className='RegisterPage-section text-white flex flex-col items-center justify-center py-[6rem]'>
      <div className='RegisterPage-section-form w-[30%] flex flex-col gap-[1rem]'>
        <h2 className='text-[35px]'>Register</h2>
        <form className='flex flex-col gap-[1rem]' onSubmit={formSubmitHandle}>
          <div className='flex flex-col gap-[6px]'>
            <label>Enter your name</label>
            <input
              type='text'
              className='outline-none rounded-[2px] bg-[#A55769] p-[6px]'
              placeholder='This is your Public Name'
              onChange={formDataHandle}
              name='userName'
              required
            />
            <p className='text-[10px] opacity-50'>
              (consider using a made-up name)
            </p>
          </div>

          <div className='flex flex-col gap-[6px]'>
            <label>Enter your email</label>
            <input
              type='email'
              className='outline-none rounded-[2px] bg-[#A55769] p-[6px]'
              placeholder='Private Email'
              name='userEmail'
              onChange={formDataHandle}
              required
            />
          </div>

          <div className='flex flex-col gap-[6px]'>
            <label>Enter your password</label>
            <span
              style={{ width: "100%" }}
              className='outline-none rounded-[2px] bg-[#A55769] p-[6px] flex'>
              <input
                type={passwordType}
                style={{
                  width: "90%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                }}
                placeholder='Must be 8 characters (special characters include)'
                name='userPassword'
                minLength={8}
                onChange={formDataHandle}
                required
              />
              {passwordType === "password" ? (
                <VisibilityOff onClick={() => setPasswordType("text")} />
              ) : (
                <Visibility onClick={() => setPasswordType("password")} />
              )}
            </span>
          </div>

          {/* <div className='flex flex-col gap-[6px]'>
            <label>ReEnter your password</label>
            <input
              type='text'
              className='outline-none rounded-[2px] bg-[#A55769] p-[6px]'
              required
            />
          </div> */}

          <div className='RegisterPage-section-form-youAre flex flex-row gap-[3rem]'>
            <p>You Are:</p>
            <MUIRadio data={youAreCategories} selection={setYouAre} />
          </div>

          <div className='flex flex-col gap-[6px]'>
            <label>Enter your DOB</label>
            <input
              type='date'
              className='outline-none rounded-[2px] bg-[#A55769] p-[6px]'
              placeholder='Must be in format of DD/MM/YYYY'
              name='userDob'
              onChange={formDataHandle}
              required
            />
          </div>

          <div className='RegisterPage-section-form-Acceptance flex flex-col gap-[1rem] py-[2rem]'>
            <p>Acceptance</p>
            <div className='flex flex-row gap-[1rem] items-center'>
              <input type='checkbox' required />
              <div className='flex flex-row gap-[6px]'>
                <p>I accept</p>
                <p className='italic cursor-pointer hover:underline opacity-70'>
                  terms of use
                </p>
              </div>
            </div>

            <div className='flex flex-row gap-[1rem]'>
              <input type='checkbox' required />
              <div className='flex flex-row gap-[6px]'>
                <p className='text-[12px] opacity-50'>
                  I agree to the processing of my personal data to provide and
                  improve services, provide information about services, ensure
                  the security and proper functioning of services and prevent
                  abuse in accordance with the privacy notice Register
                </p>
              </div>
            </div>

            <div className='flex flex-row gap-[1rem] items-center'>
              <input type='checkbox' />
              <div className='flex flex-row gap-[6px]'>
                <p>Remember me on this device</p>
              </div>
            </div>
          </div>
          <button className='button'>Register</button>
        </form>
      </div>
      {isLoading && (
        <Box sx={style}>
          <CircularProgress sx={{ color: "#80011F", fontWeight: "900" }} />
        </Box>
      )}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          Registration Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={open1}
        autoHideDuration={4000}
        onClose={handleClose1}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose1} severity='error' sx={{ width: "100%" }}>
          Something Went Wrong
        </Alert>
      </Snackbar>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Registration Successfully
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <Link to='/login'>Click Here</Link> To Login In Your Account.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
