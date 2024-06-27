import "./AdminPages.css";

import { BsEyeFill } from "react-icons/bs";
import Table from "../AdminLayout/Table";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState, useEffect } from "react";

import { RiSearchFill } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";

import userImage from "../AdminAssets/noprofileImage.png";

import { useSelector } from "react-redux";

import { useUpdateUserBlockByIdMutation } from "../../../services/userStatus";

import { useGetUserStatusByIdQuery } from "../../../services/userStatus";

export default function AdminUsers() {
  const { users, userOnlineAndBlockStatus } = useSelector(
    (state) => state.userState
  );

  const [search, setSearch] = useState("");

  const [sortUserDropdownSelection, setSortUserDropdownSelection] =
    useState("Newest Registered");

  const [updateUserBlockById, responseUpdateUserBlockById] =
    useUpdateUserBlockByIdMutation();

  console.log(responseUpdateUserBlockById);

  // console.log(blockSelection);

  const filteredArray = users?.filter((data) => {
    if (search !== "") {
      const userSearch = search.toLowerCase();
      const searchInData = data?.email?.toLowerCase();

      return searchInData?.startsWith(userSearch);
    }
    return data;
  });

  const [arrayState, setArrayState] = useState([]);
  useEffect(() => {
    if (sortUserDropdownSelection === "Newest Registered") {
      const reverseArray = filteredArray?.map(filteredArray.pop, [
        ...filteredArray,
      ]);
      setArrayState(reverseArray);
    } else if (sortUserDropdownSelection === "Last Active") {
      setArrayState(filteredArray);
    } else if (sortUserDropdownSelection === "Alphabetical") {
      const sortedData = filteredArray?.sort((a, b) => {
        let fa = a?.name?.toLowerCase();
        let fb = b?.name?.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      setArrayState(sortedData);
    }
  }, [filteredArray, sortUserDropdownSelection]);

  const data = arrayState;
  // const data = [
  //   {
  //     _id: "user1231",
  //     name: "Mr Unknown",
  //     userID: "user1234",
  //     userName: "unknownbird",
  //     email: "unknownbird@unknownbird.com",
  //     password: "password###",
  //     subscriptions: "PPV (£50), Premium",
  //     status: "online",
  //   },
  //   {
  //     _id: "user1232",
  //     name: "Mr Unknown 2",
  //     userID: "user1235",
  //     userName: "unknownbird2",
  //     email: "unknownbird2@unknownbird.com",
  //     password: "password###",
  //     subscriptions: "PPV (£50), Premium",
  //     status: "offline",
  //   },
  // ];

  const mappedData = data?.map((user, index) => {
    let dob = new Date(user.Dateofbirth);

    let month_diff = Date.now() - dob.getTime();

    let age_dt = new Date(month_diff);

    let year = age_dt.getUTCFullYear();

    let age = Math.abs(year - 1970);

    const UserStatus = userOnlineAndBlockStatus?.find((userStatus) => {
      return user._id === userStatus.UserId;
    });
    return {
      indexId: index,
      _id: user._id,
      name: user.name,
      userID: user.userId,
      userName: user.username,
      email: user.email,
      dateofBirth: user.Dateofbirth,
      age: age,
      subscriptions: user.subscription_type,
      gender: user.gender,
      onlineStatus: UserStatus.Status,
      aboutMe: user.Aboutme,
      iEnjoy: user.Enjoyed,
      interest: user.Interests,
      kink_identity: user.Kink_Identity,
      maritalStatus: user.MaritalStatus,
      orientation: user.Orientation,
      payment_details: user.PeymentDetails,
      city: user.city,
      contact: user.contact,
      country: user.contry,
      pincode: user.pincode,
      profileImage: user.profileImage,
      createdOn: user.createdAt,
      updatedOn: user.updatedAt,
    };
  });

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const [openViewModal, setOpenViewModal] = useState(false);
  const handleOpenViewModal = () => setOpenViewModal(true);
  const handleCloseViewModal = () => setOpenViewModal(false);

  const [block, setBlock] = useState(false);
  const [sortUserDropdownOpen, setSortUserDropdownOpen] = useState(false);

  const [showTable, setShowTable] = useState(true);
  const [userData, setUserData] = useState();
  // console.log(users);
  // console.log(userData);

  const [blockSelection, setBlockSelection] = React.useState("");

  const responseUserStatusById = useGetUserStatusByIdQuery(userData?._id);

  useEffect(() => {
    if (responseUserStatusById.isSuccess) {
      setBlockSelection(responseUserStatusById?.data?.data?.Block);
    }
  }, [responseUserStatusById.fulfilledTimeStamp, userData?._id]);

  const handleChangeBlock = (event) => {
    setBlockSelection(event.target.value);

    const updateData = {
      id: userData?._id,
      updateData: {
        Block: event.target.value,
      },
    };

    updateUserBlockById(updateData);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "90%",
    bgcolor: "#fff",
    border: "0px",
    boxShadow: 24,
    p: 4,

    outline: "none",
    borderRadius: "4px",
  };

  const config = [
    {
      label: "No",
      render: (list) => list.indexId + 1,
    },
    {
      label: "Name",
      render: (list) => (
        <p
          className='underline cursor-pointer hover:text-black'
          onClick={() => {
            setUserData(list);
            setShowTable(false);
          }}>
          {list.name}
        </p>
      ),
    },
    {
      label: "Email",
      render: (list) => list.email,
    },
    {
      label: "User ID",
      render: (list) => list.userID,
    },
    {
      label: "User Name",
      render: (list) => list.userName,
    },

    {
      label: "Subscriptions",
      render: (list) => list.subscriptions,
    },
    {
      label: "Status",
      render: (list) => (
        <div className='w-full'>
          {list.onlineStatus === true ? (
            <div className='flex flex-row items-center w-full justify-center'>
              <p>Online</p>
              <GoDotFill className='text-[#21EB00]' />
            </div>
          ) : (
            <div className='flex flex-row items-center w-full justify-center'>
              <p>Offline</p>
              <GoDotFill className='text-[red]' />
            </div>
          )}
        </div>
      ),
    },
  ];

  const EditModal = (
    <div className='h-[95%] overflow-y-scroll py-[1rem]'>Hello</div>
  );

  const ViewModal = (
    <div className='h-[95%] overflow-y-scroll py-[1rem]'>Hello</div>
  );

  const keyFn = (list) => {
    return list.username;
  };
  return (
    <>
      <div className='py-[1rem] flex flex-col gap-[1rem]'>
        {showTable && (
          <div className='p-[1rem] flex flex-row justify-between'>
            <div className=' flex flex-row gap-[1rem]'>
              <div className='flex flex-row items-center gap-[10px] bg-[#D9D9D980] p-[10px] rounded'>
                <RiSearchFill className='text-[#00000080]' />
                <input
                  className='bg-transparent outline-none text-[#00000080]'
                  type='text'
                  placeholder='Search by email'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className='relative'>
                <div
                  className='bg-[#D9D9D980] flex flex-row gap-[10px] p-[10px] items-center px-[1rem] rounded cursor-pointer'
                  onClick={() =>
                    setSortUserDropdownOpen(!sortUserDropdownOpen)
                  }>
                  <p className='text-[#00000080]'>Sort Users</p>
                  {sortUserDropdownOpen ? (
                    <IoMdArrowDropup />
                  ) : (
                    <IoMdArrowDropdown />
                  )}
                </div>
                {sortUserDropdownOpen && (
                  <div className='shadow-md bg-[#ECECEC] absolute w-[200px] rounded border-t-[#fff] border-solid border-t-[2px] py-[4px]'>
                    <div
                      onClick={() =>
                        setSortUserDropdownSelection("Newest Registered")
                      }
                      className={
                        sortUserDropdownSelection === "Newest Registered"
                          ? "cursor-pointer hover:bg-[#D9D9D9] bg-[#D9D9D9]"
                          : "cursor-pointer hover:bg-[#D9D9D9]"
                      }>
                      <p className='pl-[1.5rem]'>Newest Registered</p>
                    </div>
                    <div
                      onClick={() =>
                        setSortUserDropdownSelection("Last Active")
                      }
                      className={
                        sortUserDropdownSelection === "Last Active"
                          ? "cursor-pointer hover:bg-[#D9D9D9] bg-[#D9D9D9]"
                          : "cursor-pointer hover:bg-[#D9D9D9]"
                      }>
                      <p className='pl-[1.5rem]'>Last Active</p>
                    </div>
                    <div
                      onClick={() =>
                        setSortUserDropdownSelection("Alphabetical")
                      }
                      className={
                        sortUserDropdownSelection === "Alphabetical"
                          ? "cursor-pointer hover:bg-[#D9D9D9] bg-[#D9D9D9]"
                          : "cursor-pointer hover:bg-[#D9D9D9]"
                      }>
                      <p className='pl-[1.5rem]'>Alphabetical</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {showTable ? (
          <Table data={mappedData} config={config} keyFn={keyFn} />
        ) : (
          <div className='flex flex-col gap-[1rem] p-[2rem]'>
            <div className='flex flex-row justify-between'>
              <div
                className='cursor-pointer text-[25px] w-fit flex flex-row gap-[10px] items-center hover:underline'
                onClick={() => setShowTable(true)}>
                <IoIosArrowBack />
                <p>Back</p>
              </div>
              <div className='flex flex-row gap-[5px] text-[#909090]'>
                <p className='hover:underline cursor-pointer'>User List</p>
                <p>/</p>
                <p>{userData.name}</p>
              </div>
            </div>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row gap-[1rem] items-start'>
                <img
                  className='w-[300px] h-[250px] rounded-md'
                  src={
                    userData.profileImage[0]
                      ? `${process.env.React_App_Base_Image_Url}${userData.profileImage}`
                      : userImage
                  }
                  alt='userImage'
                />
                <div className='flex flex-col gap-[10px] text-[#8E8E8E]'>
                  <h1 className='text-[25px] font-[500] text-[#80011F]'>
                    {userData.name}
                  </h1>

                  <div className='flex flex-col'>
                    <p className='text-[18px] text-black underline'>
                      Basic Details
                    </p>
                    <p>
                      Email :{" "}
                      <span className='text-black'>{`${userData.email}`}</span>
                    </p>
                    <p>
                      Contact Number :{" "}
                      <span className='text-black'>{`${userData.contact}`}</span>
                    </p>
                    <p>
                      Username :{" "}
                      <span className='text-black'>{`${userData.userName}`}</span>
                    </p>
                    <p>
                      DOB (yyyy-mm-dd) :{" "}
                      <span className='text-black'>{`${userData.dateofBirth}`}</span>
                    </p>
                    <p>
                      Age :{" "}
                      <span className='text-black'>{`${userData.age}`}</span>
                    </p>
                    <p>
                      Gender :{" "}
                      <span className='text-black'>{`${userData.gender}`}</span>
                    </p>

                    <p>
                      City :{" "}
                      <span className='text-black'>{`${userData.city}`}</span>
                    </p>
                    <p>
                      Country :{" "}
                      <span className='text-black'>{`${userData.country}`}</span>
                    </p>
                    <p>
                      Pincode :{" "}
                      <span className='text-black'>{`${userData.pincode}`}</span>
                    </p>
                  </div>

                  <div className='flex flex-col'>
                    <p className='text-[18px] text-black underline'>
                      Account Details
                    </p>
                    <p>
                      Subscription :{" "}
                      <span className='text-black'>{`${userData.subscriptions}`}</span>
                    </p>
                    <p>
                      Membership Valid till:{" "}
                      <span className='text-black'>5 Jan 2024</span>
                    </p>
                    <p>
                      Account Created On:{" "}
                      <span className='text-black'>{`${userData?.createdOn}`}</span>
                    </p>
                    <p>
                      Account Last Updated On:{" "}
                      <span className='text-black'>{`${userData?.updatedOn}`}</span>
                    </p>
                    <p>
                      Account Block Status:{" "}
                      <span className='text-black'>{`${"Unblocked"}`}</span>
                    </p>
                    <p>
                      User Id :{" "}
                      <span className='text-black'>{`${userData.userID}`}</span>
                    </p>
                  </div>

                  <div className='flex flex-col'>
                    <p className='text-[18px] text-black underline'>
                      Other Details
                    </p>
                    <p>
                      Orientation :{" "}
                      <span className='text-black'>{`${userData.orientation}`}</span>
                    </p>
                    <p>
                      Marital Status :{" "}
                      <span className='text-black'>{`${userData.maritalStatus}`}</span>
                    </p>
                    <div className='flex flex-row gap-[10px]'>
                      <p className='w-[100px]'>Interests :</p>
                      <div className='flex flex-col'>
                        {userData?.interest?.map((int, index) => {
                          return (
                            <span
                              className='text-black'
                              key={`${int}-${index}`}>
                              {int}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div className='flex flex-row gap-[10px]'>
                      <p className='w-[100px]'>Kink Identity :</p>
                      <div className='flex flex-col'>
                        {userData?.kink_identity?.map((int, index) => {
                          return (
                            <span
                              className='text-black'
                              key={`${int}-${index}`}>
                              {int}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div className='flex flex-row gap-[10px]'>
                      <p className='w-[100px]'>Enjoy :</p>
                      <div className='flex flex-col'>
                        {userData?.iEnjoy?.map((enj, index) => {
                          return (
                            <div key={`${enj.name}-${index}`}>
                              <p className='text-black'>{`${enj.name}, ${enj.rating}/10`}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-[1rem]'>
                <p className='text-[#80011F] text-[20px]'>Block Status</p>
                <Box sx={{ minWidth: 220 }}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>
                      Select Block Status
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={blockSelection}
                      label='Select Block Status'
                      onChange={handleChangeBlock}>
                      <MenuItem value={true}>Blocked</MenuItem>
                      <MenuItem value={false}>Unblocked</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Edit Users
          </Typography>
          {EditModal}
        </Box>
      </Modal>
      <Modal
        open={openViewModal}
        onClose={handleCloseViewModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            User Details
          </Typography>
          {ViewModal}
        </Box>
      </Modal>
    </>
  );
}
