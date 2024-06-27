import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import Button from "../../Layout/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addLogin } from "../../../Slice/loginSlice";
import { useUserSignInMutation } from "../../../services/user";

import { Alert, Snackbar } from "@mui/material";

import Cookies from "js-cookie";
import { userLoginChange } from "../../../Slice/loginSlice";
import { userStatusChange } from "../../../Slice/userSlice";
import { useUpdateUserStatusByIdMutation } from "../../../services/userStatus";

export default function LoginPage() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  const [updateUserStatusById, responseUpdateUserStatusById] =
    useUpdateUserStatusByIdMutation();
  // console.log(responseUpdateUserStatusById);s

  // useEffect(() => {
  //   if (responseUpdateUserStatusById.isSuccess === true) {
  //   }
  // }, [responseUpdateUserStatusById.isSuccess]);

  // console.log(userDataAfterSignIn);
  // console.log(userLoginStatus);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "transparent",
    border: "2px solid transparent",
    boxShadow: 0,
    p: 4,
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
  };
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

  const [loginData, setLoginData] = useState({
    userLoginId: "",
    userPassword: "",
  });
  const getDataHandle = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const loginHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", loginData?.userLoginId);
    formData.append("password", loginData?.userPassword);

    // const userLoginData = {
    //   email: loginData?.userLoginId,
    //   password: loginData?.userPassword,
    // };
    // userSignIn(userLoginData);
    const data = await axios
      .post(`${process.env.React_App_Base_url + "signin"}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          "Content-type": "application/json",
        },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    if (data?.status === 200) {
      dispatch(userLoginChange(data?.data?.userData));
      setOpen(true);
      // localStorage.setItem(
      //   "userLoginCookie",
      //   data?.data?.userData?.tokens[data?.data?.userData?.tokens?.length - 1]
      //     ?.token
      // );
      Cookies.set(
        "userLoginCookie",
        data?.data?.userData?.tokens[data?.data?.userData?.tokens?.length - 1]
          ?.token,
        { expires: 1 }
      );
      const updateData = {
        id: data?.data?.userData?._id,
        updateData: {
          status: true,
        },
      };
      updateUserStatusById(updateData);
      dispatch(userStatusChange(data?.data?.userData?._id));
      setTimeout(() => {
        history("/");
      }, [500]);
    } else if (data?.status !== 200) {
      setOpen1(true);
    }

    console.log(data);
  };

  console.log(Cookies.get("userLoginCookie"));
  // useEffect(() => {
  //   console.log(loginData);
  // }, [loginData]);
  return (
    <>
      <div className='LoginPage-section text-white flex flex-col items-center justify-center py-[6rem]'>
        <div className='LoginPage-section-form w-[30%] flex flex-col gap-[1rem]'>
          <h2 className='text-[35px]'>Login</h2>
          <form className='flex flex-col gap-[1rem]' onSubmit={loginHandle}>
            <div className='flex flex-col gap-[6px]'>
              <label>Email:</label>
              <input
                type='text'
                className='outline-none rounded-[2px] bg-[#A55769] p-[6px]'
                placeholder='Enter your email'
                onChange={getDataHandle}
                name='userLoginId'
                required
              />
            </div>

            <div className='flex flex-col gap-[6px]'>
              <label>Password:</label>
              <input
                type='password'
                className='outline-none rounded-[2px] bg-[#A55769] p-[6px]'
                placeholder='Enter your password'
                name='userPassword'
                onChange={getDataHandle}
                required
              />
            </div>
            <div className='LoginPage-section-rememberMe flex flex-row gap-[10px] items-center'>
              <input type='checkbox' className='' />
              <p>Remember Me On This Device</p>
            </div>

            <button className='button'>Login</button>
          </form>

          <div className='LoginPage-section-btns flex flex-row gap-[1rem]'>
            <Button text={"Forgot Password"} />
          </div>

          <div className='LoginPage-section-dontHaveAccount flex flex-row gap-[10px] items-center'>
            <p className='italic opacity-60'>Don’t have an account ?</p>
            <Link to={"/Register"}>
              <p className='text-[20px] cursor-pointer underline hover:text-[#C53053] transition duration-[0.4s] ease-in-out'>
                Register Now
              </p>
            </Link>
          </div>

          <p className='opacity-50 text-[10px]'>
            (and get access for exclusive content and be a part of the largest
            “KINK” community)
          </p>
        </div>
        {isLoading && (
          <Box sx={style}>
            <CircularProgress sx={{ color: "#80011F", fontWeight: "900" }} />
          </Box>
        )}
      </div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          Profile Logged In Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={open1}
        autoHideDuration={4000}
        onClose={handleClose1}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose1} severity='warning' sx={{ width: "100%" }}>
          Entered Wrong Email or Password!
        </Alert>
      </Snackbar>
    </>
  );
}
