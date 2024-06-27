import { useState, useRef, useMemo, useEffect } from "react";
import "./ProfileSettings.css";
import Button from "../../Layout/Button";
import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import mainImage from "../../Asset/Images/noprofileImage.png";

import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import emexLogo from "../../Asset/Images/ProfileSettings/amexLogo.png";

import {
  AiOutlineCloudUpload,
  AiOutlineEdit,
  AiFillEyeInvisible,
  AiFillEye,
} from "react-icons/ai";
import DropdownComp from "../../Layout/ProfileSettingsPage/DropdownComp";
import CheckboxComp from "../../Layout/ProfileSettingsPage/CheckboxComp";
import RadioComp from "../../Layout/ProfileSettingsPage/RadioComp";
import MUISelect from "../../Layout/MUISelect";

import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import {
  useUpdateUserByIdMutation,
  useUpdateUserProfileImageByIdMutation,
} from "../../../services/user";

import { Alert, Snackbar } from "@mui/material";

export default function ProfileSettings() {
  const [updateUserById, responseUpdateUserById] = useUpdateUserByIdMutation();

  const [updateUserProfileImageById, responseUpdateUserProfileImageById] =
    useUpdateUserProfileImageByIdMutation();

  // console.log(responseUpdateUserProfileImageById);
  // console.log(responseUpdateUserById);

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    border: "none",
    boxShadow: 24,
    p: 4,
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userGender, setUserGender] = useState("");
  const [userOrientation, setUserOrientation] = useState("");
  const [userContact, setUserContact] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userDob, setUserDob] = useState("");
  const [userPincode, setUserPincode] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userProfileType, setUserProfileType] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  // Enjoy State
  const [iEnjoyRatingInput1, setIEnjoyRatingInput1] = useState("");
  const [iEnjoyRatingSelection1, setIEnjoyRatingSelection1] = useState("");
  const [iEnjoyRatingInput2, setIEnjoyRatingInput2] = useState("");
  const [iEnjoyRatingSelection2, setIEnjoyRatingSelection2] = useState("");
  const [iEnjoyRatingInput3, setIEnjoyRatingInput3] = useState("");
  const [iEnjoyRatingSelection3, setIEnjoyRatingSelection3] = useState("");
  const [iEnjoyRatingInput4, setIEnjoyRatingInput4] = useState("");
  const [iEnjoyRatingSelection4, setIEnjoyRatingSelection4] = useState("");
  const [iEnjoyRatingInput5, setIEnjoyRatingInput5] = useState("");
  const [iEnjoyRatingSelection5, setIEnjoyRatingSelection5] = useState("");
  const [iEnjoyRatingInput6, setIEnjoyRatingInput6] = useState("");
  const [iEnjoyRatingSelection6, setIEnjoyRatingSelection6] = useState("");
  // ------------------------------
  const [userSubscriptionType, setUserSubscriptionType] = useState("");

  const [kinkIdentity, setKinkIdentity] = useState([]);
  const [userInterest, setUserInterest] = useState([]);
  const [aboutMe, setAboutMe] = useState("");
  const [userPaymentDetails, setUserPaymentDetails] = useState([]);
  // useEffect(() => {
  //   console.log(kinkIdentity);
  // }, [kinkIdentity]);

  // Text Editor

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { login } = useSelector((state) => state.userLogin);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  // useEffect(() => {
  //   console.log(login);
  // }, [login]);
  // useEffect(() => {
  //   console.log(userGender);
  //   console.log(userInterest);
  //   console.log(userStatus);
  // }, [userGender, userInterest, userStatus]);

  // useEffect(() => {}, [login]);
  const getInformationHandle = async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_url + "user/" + login[0]?.userId}`, {
        headers: { "Content-type": "multipart/form-date" },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setFullName(data?.users?.name);
    setUserName(data?.users?.username);
    setUserEmail(data?.users?.email);
    setUserContact(data?.users?.contact);
    setUserDob(data?.users?.Dateofbirth);
    setUserPincode(data?.users?.pincode);
    setUserCity(data?.users?.city);
    setUserCountry(data?.users?.contry);
    setUserGender(data?.users?.gender);
    setUserOrientation(data?.users?.Orientation);
    setUserStatus(data?.users?.MaritalStatus);
    setKinkIdentity(data?.users?.Kink_Identity);
    setUserInterest(data?.users?.Interests);
    setAboutMe(data?.users?.Aboutme);
    setUserProfileType(data?.users?.profile_type);
    setUserSubscriptionType(data?.users?.subscription_type);
    setUserPaymentDetails(data?.users?.PeymentDetails);
    setUserProfileImage(data?.users?.profileImage[0]);
    setIEnjoyRatingInput1(data?.users?.Enjoyed[0]?.name);
    setIEnjoyRatingInput2(data?.users?.Enjoyed[1]?.name);
    setIEnjoyRatingInput3(data?.users?.Enjoyed[2]?.name);
    setIEnjoyRatingInput4(data?.users?.Enjoyed[3]?.name);
    setIEnjoyRatingInput5(data?.users?.Enjoyed[4]?.name);
    setIEnjoyRatingInput6(data?.users?.Enjoyed[5]?.name);
    setIEnjoyRatingSelection1(data?.users?.Enjoyed[0]?.rating);
    setIEnjoyRatingSelection2(data?.users?.Enjoyed[1]?.rating);
    setIEnjoyRatingSelection3(data?.users?.Enjoyed[2]?.rating);
    setIEnjoyRatingSelection4(data?.users?.Enjoyed[3]?.rating);
    setIEnjoyRatingSelection5(data?.users?.Enjoyed[4]?.rating);
    setIEnjoyRatingSelection6(data?.users?.Enjoyed[5]?.rating);
    // console.log(data?.users);
  };
  useEffect(() => {
    getInformationHandle();
  }, []);

  useEffect(() => {
    getInformationHandle();
  }, [
    responseUpdateUserById.isSuccess,
    responseUpdateUserProfileImageById.isSuccess,
  ]);
  const updateUserProfileHandle = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("name", fullName);
    // formData.append("email", userEmail);
    // formData.append("password", userPassword);
    // formData.append("contact", "");
    // formData.append("userName", userName);
    // formData.append("aboutMe", aboutMe);
    // formData.append("orientation", userOrientation);
    // formData.append("status", userStatus);
    // formData.append("pincode", userPincode);
    // formData.append("city", userCity);
    // formData.append("county", userCountry);
    // formData.append("gender", userGender);
    // formData.append("profile_type", "");
    // formData.append("subscription_type", "");
    // formData.append("Kink_Identity", kinkIdentity);
    // formData.append("Dateofbirth", userDob);
    // formData.append("profileImage", "");
    // formData.append("user_interest", userInterest);

    const userUpdateData = {
      name: fullName,
      Username: userName,
      Email: userEmail,
      contact: userContact,
      // password: userPassword,
      MaritalStatus: userStatus,
      contry: userCountry,
      city: userCity,
      pincode: userPincode,
      gender: userGender,
      profile_type: userProfileType,
      subscription_type: userSubscriptionType,
      Kink_Identity: kinkIdentity,
      orientation: userOrientation,
      Aboutme: aboutMe,
      Interests: userInterest,
      Enjoyed: [
        {
          name: iEnjoyRatingInput1,
          rating: iEnjoyRatingSelection1,
        },
        {
          name: iEnjoyRatingInput2,
          rating: iEnjoyRatingSelection2,
        },
        {
          name: iEnjoyRatingInput3,
          rating: iEnjoyRatingSelection3,
        },
        {
          name: iEnjoyRatingInput4,
          rating: iEnjoyRatingSelection4,
        },
        {
          name: iEnjoyRatingInput5,
          rating: iEnjoyRatingSelection5,
        },
        {
          name: iEnjoyRatingInput6,
          rating: iEnjoyRatingSelection6,
        },
      ],
      PeymentDetails: userPaymentDetails,
      Dateofbirth: userDob,
    };

    const userData = {
      id: login[0]?._id,
      updateData: userUpdateData,
    };

    // console.log(userData);

    updateUserById(userData);
    setIsLoading(true);
    // const data = await axios
    //   .put(
    //     `${process.env.React_App_Base_url + "userUpdate/" + login?._id}`,
    //     formData,
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
    // getInformationHandle();
    // console.log(data);
  };

  const handleMainImageSubmit = () => {
    const formData = new FormData();

    formData.append("profileImage", userProfileImage);

    const submitData = {
      id: login[0]?._id,
      updateData: formData,
    };

    // console.log(submitData);
    updateUserProfileImageById(submitData);
    setIsLoading(true);
  };
  // const TextEditor = ({ placeholder }) => {
  //   const editor = useRef(null);
  //   const [content, setContent] = useState("");

  //   const config = useMemo(
  //     {
  //       readonly: false, // all options from https://xdsoft.net/jodit/doc/,
  //       placeholder: placeholder || "Start typings...",
  //     },
  //     [placeholder]
  //   );

  //   return (
  //     <JoditEditor
  //       ref={editor}
  //       value={content}
  //       config={config}
  //       tabIndex={1} // tabIndex of textarea
  //       onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
  //       onChange={(newContent) => {}}
  //     />
  //   );
  // };

  // Location Form Data

  useEffect(() => {
    if (responseUpdateUserById.isSuccess) {
      setIsLoading(false);
      setOpen(true);
    } else if (responseUpdateUserById.isError) {
      setIsLoading(false);
      setOpen1(true);
    } else if (responseUpdateUserProfileImageById.isSuccess) {
      setIsLoading(false);
      setOpen(true);
    } else if (responseUpdateUserProfileImageById.isError) {
      setIsLoading(false);
      setOpen1(true);
    }
  }, [
    responseUpdateUserProfileImageById.isSuccess,
    responseUpdateUserById.isSuccess,
    responseUpdateUserProfileImageById.isError,
    responseUpdateUserById.isError,
  ]);
  const locationData = (
    <div className='grid grid-cols-2 gap-[2rem]'>
      <div className='w-full flex flex-col gap-[6px]'>
        <label>Postcode</label>
        <div className='flex flex-row w-full bg-opacity-40 bg-white p-[10px] rounded-[4px] gap-[6px]'>
          <input
            className=' bg-transparent outline-none w-[90%] font-[600]'
            type='number'
            value={userPincode}
            onChange={(e) => setUserPincode(e.target.value)}
          />
          <AiOutlineEdit className='text-[25px] cursor-default' />
        </div>
      </div>

      <div className='w-full flex flex-col gap-[6px]'>
        <label>City</label>
        <div className='flex flex-row w-full bg-opacity-40 bg-white p-[10px] rounded-[4px] gap-[6px]'>
          <input
            className=' bg-transparent outline-none w-[90%] font-[600]'
            type='text'
            value={userCity}
            onChange={(e) => setUserCity(e.target.value)}
          />
          <AiOutlineEdit className='text-[25px] cursor-default' />
        </div>
      </div>

      <div className='w-full flex flex-col gap-[6px]'>
        <label>Country</label>
        <div className='flex flex-row w-full bg-opacity-40 bg-white p-[10px] rounded-[4px] gap-[6px]'>
          <input
            className=' bg-transparent outline-none w-[90%] font-[600]'
            type='text'
            value={userCountry}
            onChange={(e) => setUserCountry(e.target.value)}
          />
          <AiOutlineEdit className='text-[25px] cursor-default' />
        </div>
      </div>
    </div>
  );

  // Gender Form Data and Comp
  const genderData = [
    "Male",
    "Couple (MF)",
    "Couple (FF)",
    "Female",
    "Couple (MM)",
    "TV / TS / CD",
  ];
  const genderComp = (
    <RadioComp
      selectedUserData={userGender}
      data={genderData}
      selectedValue={setUserGender}
    />
  );
  // -------------------------------------------------------

  // orientation Form Data and Comp
  const orientationData = [
    "Straight",
    "Bisexual",
    "Asexual",
    "Gay / Lesbian",
    "Pansexual",
    "Rather not say",
  ];
  const orientationComp = (
    <RadioComp
      selectedUserData={userOrientation}
      data={orientationData}
      selectedValue={setUserOrientation}
    />
  );
  // -------------------------------------------------------

  // status Form Data and Comp
  const statusData = ["Single", "Divorsed", "Widowed", "Married", "Separated"];
  const statusComp = (
    <RadioComp
      selectedUserData={userStatus}
      data={statusData}
      selectedValue={setUserStatus}
    />
  );
  // -------------------------------------------------------

  // interests Form Data and Comp
  const kinkIdentityData = [
    "Dominant",
    "Switch",
    "Bottom",
    "Cuckold",
    "Submissive",
    "Top",
    "Sadist",
    "Exhibitionist",
    "Bondage",
    "Fetishist",
    "Age Player",
    "Slave",
    "Master",
    "Princess",
    "Voyeur",
    "Findom / Paypig",
  ];
  const kinkIdentityComp = (
    <CheckboxComp
      data={kinkIdentityData}
      getValue={setKinkIdentity}
      selectedData={kinkIdentity}
    />
  );
  // -------------------------------------------------------

  // interests Form Data and Comp
  const interestsData = [
    "Any",
    "Gangbang",
    "Adult Parties",
    "Making Videos",
    "Anal",
    "Group Sex",
    "Blind Folds",
    "Oral",
    "Cross-Dressing",
    "Phone Sex",
    "Cuckolding",
    "CyberSex",
    "Dogging",
    "DP",
    "Fisting",
  ];
  const interestsComp = (
    <CheckboxComp
      selectedData={userInterest}
      data={interestsData}
      getValue={setUserInterest}
    />
  );
  // -------------------------------------------------------

  // I Enjoy Form Data and component

  const iEnjoyRatingData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const iEnjoyComp = (
    <div className='flex flex-col gap-[1rem] w-full py-[1rem]'>
      <div className='flex flex-row gap-[1rem] w-full'>
        <input
          className='w-[50%] bg-white bg-opacity-40 outline-none p-[10px] rounded-[4px] font-[600] text-[20px] placeholder-white'
          type='text'
          placeholder='Enter your text'
          onChange={(e) => setIEnjoyRatingInput1(e.target.value)}
          value={iEnjoyRatingInput1}
        />
        <div className='w-[50%] bg-white bg-opacity-40 rounded-[4px]'>
          <MUISelect
            data={iEnjoyRatingData}
            selection={setIEnjoyRatingSelection1}
            selectedValue={iEnjoyRatingSelection1}
            heading={<p className='font-[500] text-[20px]'>Rate out of 10</p>}
          />
        </div>
      </div>
      <div className='flex flex-row gap-[1rem] w-full'>
        <input
          className='w-[50%] bg-white bg-opacity-40 outline-none p-[10px] rounded-[4px] font-[600] text-[20px] placeholder-white'
          type='text'
          placeholder='Enter your text'
          onChange={(e) => setIEnjoyRatingInput2(e.target.value)}
          value={iEnjoyRatingInput2}
        />
        <div className='w-[50%] bg-white bg-opacity-40 rounded-[4px]'>
          <MUISelect
            data={iEnjoyRatingData}
            selection={setIEnjoyRatingSelection2}
            selectedValue={iEnjoyRatingSelection2}
            heading={<p className='font-[500] text-[20px]'>Rate out of 10</p>}
          />
        </div>
      </div>
      <div className='flex flex-row gap-[1rem] w-full'>
        <input
          className='w-[50%] bg-white bg-opacity-40 outline-none p-[10px] rounded-[4px] font-[600] text-[20px] placeholder-white'
          type='text'
          placeholder='Enter your text'
          onChange={(e) => setIEnjoyRatingInput3(e.target.value)}
          value={iEnjoyRatingInput3}
        />
        <div className='w-[50%] bg-white bg-opacity-40 rounded-[4px]'>
          <MUISelect
            data={iEnjoyRatingData}
            selection={setIEnjoyRatingSelection3}
            selectedValue={iEnjoyRatingSelection3}
            heading={<p className='font-[500] text-[20px]'>Rate out of 10</p>}
          />
        </div>
      </div>
      <div className='flex flex-row gap-[1rem] w-full'>
        <input
          className='w-[50%] bg-white bg-opacity-40 outline-none p-[10px] rounded-[4px] font-[600] text-[20px] placeholder-white'
          type='text'
          placeholder='Enter your text'
          onChange={(e) => setIEnjoyRatingInput4(e.target.value)}
          value={iEnjoyRatingInput4}
        />
        <div className='w-[50%] bg-white bg-opacity-40 rounded-[4px]'>
          <MUISelect
            data={iEnjoyRatingData}
            selection={setIEnjoyRatingSelection4}
            selectedValue={iEnjoyRatingSelection4}
            heading={<p className='font-[500] text-[20px]'>Rate out of 10</p>}
          />
        </div>
      </div>
      <div className='flex flex-row gap-[1rem] w-full'>
        <input
          className='w-[50%] bg-white bg-opacity-40 outline-none p-[10px] rounded-[4px] font-[600] text-[20px] placeholder-white'
          type='text'
          placeholder='Enter your text'
          onChange={(e) => setIEnjoyRatingInput5(e.target.value)}
          value={iEnjoyRatingInput5}
        />
        <div className='w-[50%] bg-white bg-opacity-40 rounded-[4px]'>
          <MUISelect
            data={iEnjoyRatingData}
            selection={setIEnjoyRatingSelection5}
            selectedValue={iEnjoyRatingSelection5}
            heading={<p className='font-[500] text-[20px]'>Rate out of 10</p>}
          />
        </div>
      </div>
      <div className='flex flex-row gap-[1rem] w-full'>
        <input
          className='w-[50%] bg-white bg-opacity-40 outline-none p-[10px] rounded-[4px] font-[600] text-[20px] placeholder-white'
          type='text'
          placeholder='Enter your text'
          onChange={(e) => setIEnjoyRatingInput6(e.target.value)}
          value={iEnjoyRatingInput6}
        />
        <div className='w-[50%] bg-white bg-opacity-40 rounded-[4px]'>
          <MUISelect
            data={iEnjoyRatingData}
            selection={setIEnjoyRatingSelection6}
            selectedValue={iEnjoyRatingSelection6}
            heading={<p className='font-[500] text-[20px]'>Rate out of 10</p>}
          />
        </div>
      </div>
    </div>
  );
  // -------------------------------------------------------

  // Payment Details Form Data and Comp
  const paymentDetailsData = [
    {
      cardServiceProvider: "American Express",
      cardNumber: "1234123412344321",
      cardHolderName: "Simon H. Bayne",
      cardExpiryDate: "04/25",
      cardServiceProviderImage: emexLogo,
    },
    {
      cardServiceProvider: "American Express",
      cardNumber: "1234123412344321",
      cardHolderName: "Simon H. Bayne",
      cardExpiryDate: "04/25",
      cardServiceProviderImage: emexLogo,
    },
    {
      cardServiceProvider: "American Express",
      cardNumber: "1234123412344321",
      cardHolderName: "Simon H. Bayne",
      cardExpiryDate: "04/25",
      cardServiceProviderImage: emexLogo,
    },
  ];
  const paymentDetailsComp = (
    <div className='flex flex-col gap-[1rem]'>
      {paymentDetailsData.map((value, index) => {
        return (
          <div key={index} className='flex flex-row gap-[1rem] items-center'>
            <div className='w-[90%] bg-white bg-opacity-40 p-[10px] rounded-[4px] flex flex-row justify-between'>
              <div className='flex flex-col gap-[10px]'>
                <h4 className='text-[18px] font-[600] text-center'>
                  {value.cardServiceProvider}
                </h4>
                <div className='flex flex-row gap-[4px]'>
                  <img
                    className='w-[40px] h-[30px]'
                    src={value.cardServiceProviderImage}
                    alt={`${value.cardServiceProvider}-logo`}
                  />
                  <p>{`XXXX-XXXX-XXXX-${value.cardNumber.substr(-4)}`}</p>
                </div>
              </div>
              <div className='flex flex-col gap-[10px]'>
                <h4 className='text-[18px] font-[600]'>Name on card</h4>
                <p>{value.cardHolderName}</p>
              </div>
              <div className='flex flex-col gap-[10px]'>
                <h4 className='text-[18px] font-[600]'>Expiring</h4>
                <p>{value.cardExpiryDate}</p>
              </div>
            </div>
            <div className='w-[10%]'>
              <RiDeleteBin6Line className='text-[30px] cursor-pointer' />
            </div>
          </div>
        );
      })}
      <button className='underline w-fit text-[20px]'>
        Add new payment method
      </button>
    </div>
  );
  // -------------------------------------------------------

  const passwordModalForm = <form>Hello</form>;

  // console.log(process.env.React_App_Base_Image_Url + userProfileImage);
  return (
    <>
      {isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className='ProfileSettingsPage-section text-white p-[4rem] flex flex-col gap-[2rem]'>
          <Button
            text={
              <div className='flex flex-row gap-[10px] items-center'>
                <IoIosArrowBack />
                <p>Back</p>
              </div>
            }
          />

          <div className='profileSettings-main flex flex-row'>
            {/* LEFT SECTION */}
            <div className='profileSettings-main-left w-[30%] p-[1rem] flex flex-col gap-[1rem]'>
              <img
                className='w-full h-[380px] border rounded bg-white bg-opacity-50'
                src={
                  userProfileImage
                    ? `${process.env.React_App_Base_Image_Url}${userProfileImage}`
                    : mainImage
                }
                alt='User Profile Main Img'
              />
              <div className='flex flex-col gap-[1rem] px-[10px]'>
                <div className='flex flex-row gap-[10px]'>
                  <label
                    for='user-image-change'
                    className='btnComp cursor-pointer h-[50px] bg-[#B7002B] w-full px-[3rem] py-[10px] rounded-[2px] hover:bg-[#C53053] transition duration-[0.4s] ease-in-out'>
                    Edit
                  </label>
                  <input
                    type='file'
                    onChange={(e) => setUserProfileImage(e.target.files[0])}
                    accept='image/png, image/jpeg'
                    id='user-image-change'
                    className='hidden'
                  />
                  <button
                    onClick={handleMainImageSubmit}
                    className='btnComp h-[50px] bg-[#B7002B] w-full px-[3rem] py-[10px] rounded-[2px] hover:bg-[#C53053] transition duration-[0.4s] ease-in-out flex flex-row gap-[6px] items-center justify-center text-center'>
                    <p>Submit</p>
                    <AiOutlineCloudUpload className='text-[25px]' />
                  </button>
                </div>
                <button
                  onClick={handleOpenModal}
                  className='btnComp h-[50px] bg-[#B7002B] w-full px-[3rem] py-[10px] rounded-[2px] hover:bg-[#C53053] transition duration-[0.4s] ease-in-out'>{`Change Password`}</button>
                <button
                  onClick={() => history("/galleryUpload")}
                  className='btnComp h-[50px] bg-[#B7002B] w-full px-[3rem] py-[10px] rounded-[2px] hover:bg-[#C53053] transition duration-[0.4s] ease-in-out flex flex-row gap-[6px] items-center justify-center text-center'>
                  <p>Upload Gallery Images</p>
                  <AiOutlineCloudUpload className='text-[25px]' />
                </button>
                <button className='btnComp h-[50px] bg-[#B7002B] w-full  px-[3rem] py-[10px] rounded-[2px] hover:bg-[#C53053] transition duration-[0.4s] ease-in-out'>{`Manage Gallery`}</button>

                <button className='btnComp h-[50px] bg-[#B7002B] w-full px-[3rem] py-[10px] rounded-[2px] hover:bg-[#C53053] transition duration-[0.4s] ease-in-out'>{`Manage Connections (234)`}</button>
                <button className='btnComp h-[50px] bg-[#B7002B] w-full px-[3rem] py-[10px] rounded-[2px] hover:bg-[#C53053] transition duration-[0.4s] ease-in-out'>{`Manage Blocklist (234)`}</button>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className='profileSettings-main-right w-[70%] px-[3rem]'>
              <form autoComplete='off'>
                <div className='flex flex-col gap-[2rem] border-b-[#B36779] border-solid border-b-[1px] pb-[3rem]'>
                  <div className='flex flex-row gap-[10px] items-end'>
                    <h2 className='text-[40px] font-[600] leading-none'>
                      Account Details:
                    </h2>
                    <p className='text-[20px]'>(Free Plan)</p>
                  </div>
                  <div className='grid grid-cols-2 gap-[2rem] px-[1rem]'>
                    <div className='w-full flex flex-col gap-[6px]'>
                      <label>Full Name</label>
                      <div className='flex flex-row w-full bg-opacity-40 bg-white p-[10px] rounded-[4px] gap-[6px]'>
                        <input
                          className=' bg-transparent outline-none w-[90%] font-[600]'
                          type='text'
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                        <AiOutlineEdit className='text-[25px] cursor-default' />
                      </div>
                    </div>

                    <div className='w-full flex flex-col gap-[6px]'>
                      <label>Email</label>
                      <div className='flex flex-row w-full bg-opacity-40 bg-white p-[10px] rounded-[4px] gap-[6px]'>
                        <input
                          className=' bg-transparent outline-none w-[90%] font-[600] text-gray-400'
                          type='email'
                          value={userEmail}
                          disabled
                          onChange={(e) => setUserEmail(e.target.value)}
                        />
                        {/* <AiOutlineEdit className='text-[25px] cursor-default' /> */}
                      </div>
                    </div>

                    <div className='w-full flex flex-col gap-[6px]'>
                      <label>Username</label>
                      <div className='flex flex-row w-full bg-opacity-40 bg-white p-[10px] rounded-[4px] gap-[6px]'>
                        <input
                          className=' bg-transparent outline-none w-[90%] font-[600]'
                          type='text'
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                        <AiOutlineEdit className='text-[25px] cursor-default' />
                      </div>
                    </div>

                    <div className='w-full flex flex-col gap-[6px]'>
                      <label>Contact</label>
                      <div className='flex flex-row w-full bg-opacity-40 bg-white p-[10px] rounded-[4px] gap-[6px]'>
                        <input
                          className=' bg-transparent outline-none w-[90%] font-[600]'
                          type='number'
                          value={userContact}
                          onChange={(e) => setUserContact(e.target.value)}
                        />
                        <AiOutlineEdit className='text-[25px] cursor-default' />
                      </div>
                    </div>

                    {/* <div className='w-full flex flex-col gap-[6px]'>
                  <label>Password</label>
                  <div className='flex flex-row w-full bg-opacity-40 bg-white p-[10px] rounded-[4px] gap-[6px]'>
                    <input
                      className=' bg-transparent outline-none w-[90%] font-[600]'
                      autoComplete='new-password'
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setUserPassword(e.target.value)}
                    />
                    {showPassword ? (
                      <AiFillEye
                        onClick={() => setShowPassword(false)}
                        className='text-[25px] cursor-pointer'
                      />
                    ) : (
                      <AiFillEyeInvisible
                        onClick={() => setShowPassword(true)}
                        className='text-[25px] cursor-pointer'
                      />
                    )}
                  </div>
                </div> */}

                    <div className='w-full flex flex-col gap-[6px]'>
                      <label>D-0-B</label>
                      <div className='flex flex-row w-full bg-opacity-40 bg-white p-[10px] rounded-[4px] gap-[6px]'>
                        <input
                          className=' bg-transparent outline-none w-full font-[600]'
                          type='date'
                          value={userDob}
                          onChange={(e) => setUserDob(e.target.value)}
                        />
                        {/* <AiOutlineEdit className='text-[25px]' /> */}
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-[10px]'>
                    <p>
                      Just a heads up, you're currently using our free plan. If
                      you ever decide you'd like even more from your experience
                      with us, our premium membership is here whenever you're
                      ready.
                    </p>
                    <div className='flex flex-row justify-end'>
                      <button className='underline italic text-[18px] w-fit'>
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col gap-[1rem] py-[3rem]'>
                  <h2 className='text-[40px] font-[600]'>Personal Details:</h2>

                  <div className='flex flex-col gap-[3rem]'>
                    {/* Location */}
                    <DropdownComp heading={"Location"} content={locationData} />

                    {/* Gender */}
                    <DropdownComp
                      heading={
                        <div className='flex flex-row gap-[10px] items-center'>
                          <p>Gender</p>
                          <p className='text-[16px] font-[400]'>( I am )</p>
                        </div>
                      }
                      content={genderComp}
                    />

                    {/* Orientation */}
                    <DropdownComp
                      heading={"Orientation"}
                      content={orientationComp}
                    />

                    {/* Status */}
                    <DropdownComp heading={"Status"} content={statusComp} />

                    {/* Kink Identity */}
                    <DropdownComp
                      heading={
                        <div className='flex flex-row gap-[10px] items-center'>
                          <p>Kink Identity</p>
                          <p className='text-[16px] font-[400]'>
                            ( select upto 12 identities )
                          </p>
                        </div>
                      }
                      content={kinkIdentityComp}
                    />

                    {/* Interests */}
                    <DropdownComp
                      heading={
                        <div className='flex flex-row gap-[10px] items-center'>
                          <p>Interests</p>
                          <p className='text-[16px] font-[400]'>
                            ( select upto 12 identities )
                          </p>
                        </div>
                      }
                      content={interestsComp}
                    />

                    {/* About Me */}
                    <DropdownComp
                      heading={"About Me"}
                      content={
                        <div className='text-black'>
                          <JoditEditor
                            ref={editor}
                            value={aboutMe}
                            // config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => setAboutMe(newContent)}
                          />
                        </div>
                      }
                    />

                    {/* I Enjoy */}
                    <DropdownComp heading={"I Enjoy"} content={iEnjoyComp} />

                    {/* Payment Details */}
                    <DropdownComp
                      heading={
                        <div className='flex flex-row gap-[10px] items-center'>
                          <p>Payment Details</p>
                          <p className='text-[16px] font-[400]'>
                            ( Saved Methods )
                          </p>
                        </div>
                      }
                      content={paymentDetailsComp}
                    />
                  </div>
                </div>
                <button
                  onClick={updateUserProfileHandle}
                  className='btnComp h-[50px] bg-[#B7002B] w-fit px-[3rem] py-[10px] rounded-[2px] hover:bg-[#C53053] transition duration-[0.4s] ease-in-out font-[600]'>
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          Profile Updated Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={open1}
        autoHideDuration={4000}
        onClose={handleClose1}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose1} severity='warning' sx={{ width: "100%" }}>
          Please fill the fields correctly
        </Alert>
      </Snackbar>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={styleModal}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Change Password
          </Typography>
          {passwordModalForm}
        </Box>
      </Modal>
    </>
  );
}
