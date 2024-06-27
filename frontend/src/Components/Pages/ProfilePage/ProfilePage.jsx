import { useEffect } from "react";
import "./ProfilePage.css";
import Button from "../../Layout/Button";
import { IoIosArrowBack } from "react-icons/io";
import { BsPatchCheckFill } from "react-icons/bs";
import MUISelect from "../../Layout/MUISelect";

import { Alert, Snackbar } from "@mui/material";

import { useState } from "react";

import ProfileGalleryComp from "../../Layout/ProfilePage/ProfileGalleryComp/ProfileGalleryComp";
import ProfilePageMainImagesComp from "../../Layout/ProfilePage/ProfilePageMainImagesComp/ProfilePageMainImagesComp";
import ProfileCategoriesComp from "../../Layout/ProfilePage/ProfileCategoriesComp/ProfileCategoriesComp";

// Gallery Content
import GalleryMainImage from "../../Asset/Images/ProfilePageGalleryCompImages/MainImage.jpg";
import GalleryImage1 from "../../Asset/Images/ProfilePageGalleryCompImages/1.jpg";
import GalleryImage2 from "../../Asset/Images/ProfilePageGalleryCompImages/2.jpg";
import video from "../../Asset/Images/ProfilePageGalleryCompImages/video.mp4";

// MainImages
import MainImage1 from "../../Asset/Images/ProfilePageMainImages/1.jpg";
import MainImage2 from "../../Asset/Images/ProfilePageMainImages/2.jpg";
import MainImage3 from "../../Asset/Images/ProfilePageMainImages/3.jpg";
import MainImage4 from "../../Asset/Images/ProfilePageMainImages/4.jpg";
import MainImage5 from "../../Asset/Images/ProfilePageMainImages/5.jpg";
import ProfileForumPosting from "../../Layout/ProfilePage/ProfileForumPosting/ProfileForumPosting";

// Button Images
import { LiaUserTimesSolid, LiaUserPlusSolid } from "react-icons/lia";
import { RiUserHeartLine } from "react-icons/ri";
import { BiMessageRoundedDetail } from "react-icons/bi";

import { Link } from "react-router-dom";

import Modal from "../../Layout/Modal";
import SelectComp from "../../Layout/ProfilePage/SelectComp";

import { useParams } from "react-router-dom";

import { useGetUserByIdQuery } from "../../../services/user";

import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import parse from "html-react-parser";

import { useSelector } from "react-redux";

import {
  useCreateFriendRequestMutation,
  useGetFriendRequestToUserByIdQuery,
} from "../../../services/friendRequest";

import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { userId } = useParams();

  const history = useNavigate();

  const { login, userCookie } = useSelector((state) => state.userLogin);

  const { forumComments } = useSelector((state) => state.forumCommentState);

  const { users } = useSelector((state) => state.userState);

  const { forums } = useSelector((state) => state.forumState);

  const { forumTopics } = useSelector((state) => state.forumTopicState);

  const [reverseArrayState, setReverseArrayState] = useState([]);
  useEffect(() => {
    const reverseArray = forumComments?.map(forumComments.pop, [
      ...forumComments,
    ]);
    setReverseArrayState(reverseArray);
  }, [forumComments]);

  const timeDiffFunc = (date) => {
    const currentDate = new Date();
    const previousDate = new Date(date);
    let timeDiffrence = (currentDate.getTime() - previousDate.getTime()) / 1000;
    timeDiffrence /= 60;
    let diff_minutes = Math.abs(Math.round(timeDiffrence));

    const days = Math.floor(diff_minutes / 1440);
    const hours = Math.floor((diff_minutes - days * 1440) / 60);
    const minutes = diff_minutes % 60;

    return { days, hours, minutes };
  };

  const mappedForumCards = reverseArrayState?.map((comment, index) => {
    const findForum = forums?.find((forum) => {
      return forum?.ForumsId === comment?.forumId;
    });
    const findUser = users?.find((user) => {
      return user?.userId === userId;
    });
    const findForumTopic = forumTopics?.find((topic) => {
      return topic?.topicId === comment?.forumTopicId;
    });

    const timeDifferenceOfComment = timeDiffFunc(comment?.updatedAt);
    let time = `1 minute ago`;
    if (
      timeDifferenceOfComment.hours === 0 &&
      timeDifferenceOfComment.minutes > 1
    ) {
      time = `${timeDifferenceOfComment.minutes} minutes ago`;
    } else if (
      timeDifferenceOfComment.hours === 1 &&
      timeDifferenceOfComment.days === 0
    ) {
      time = `${timeDifferenceOfComment.hours} hour & ${timeDifferenceOfComment.minutes} minutes ago`;
    } else if (
      timeDifferenceOfComment.hours === 1 &&
      timeDifferenceOfComment.days === 0 &&
      timeDifferenceOfComment.minutes === 1
    ) {
      time = `${timeDifferenceOfComment.hours} hour & ${timeDifferenceOfComment.minutes} minute ago`;
    } else if (
      timeDifferenceOfComment.hours > 1 &&
      timeDifferenceOfComment.days === 0
    ) {
      time = `${timeDifferenceOfComment.hours} hours & ${timeDifferenceOfComment.minutes} minutes ago`;
    } else if (
      timeDifferenceOfComment.days > 1 &&
      timeDifferenceOfComment.hours >= 1
    ) {
      time = `${timeDifferenceOfComment.days} days, ${timeDifferenceOfComment.hours} hours & ${timeDifferenceOfComment.minutes} minutes ago`;
    } else if (
      timeDifferenceOfComment.days === 1 &&
      timeDifferenceOfComment.hours >= 1
    ) {
      time = `${timeDifferenceOfComment.days} day, ${timeDifferenceOfComment.hours} hours & ${timeDifferenceOfComment.minutes} minutes ago`;
    } else if (
      timeDifferenceOfComment.days === 1 &&
      timeDifferenceOfComment.hours === 1
    ) {
      time = `${timeDifferenceOfComment.days} day, ${timeDifferenceOfComment.hours} hour & ${timeDifferenceOfComment.minutes} minutes ago`;
    } else if (
      timeDifferenceOfComment.days === 1 &&
      timeDifferenceOfComment.hours === 1 &&
      timeDifferenceOfComment.minutes === 1
    ) {
      time = `${timeDifferenceOfComment.days} day, ${timeDifferenceOfComment.hours} hour & ${timeDifferenceOfComment.minutes} minute ago`;
    }

    return (
      <ProfileForumPosting
        key={index}
        forumData={findForum}
        userData={findUser}
        forumTopicData={findForumTopic}
        commentData={comment}
        time={time}
      />
    );
  });

  console.log(mappedForumCards);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => {
    setOpen1(false);
  };

  const [createFriendRequest, responseCreateFriendRequest] =
    useCreateFriendRequestMutation();

  useEffect(() => {
    if (responseCreateFriendRequest.isSuccess) {
      setOpen(true);
    } else if (responseCreateFriendRequest.isError) {
      setOpen1(true);
    }
  }, [
    responseCreateFriendRequest.isSuccess,
    responseCreateFriendRequest.isError,
  ]);
  // console.log(responseCreateFriendRequest);

  const responseGetUserById = useGetUserByIdQuery(userId);

  const responseGetFriendRequestToUserCheck =
    useGetFriendRequestToUserByIdQuery(responseGetUserById?.data?.users?._id);

  const handleAddFriend = () => {
    const requestData = {
      fromUser: login[0]?._id,
      toUser: responseGetUserById?.data?.users?._id,
    };

    createFriendRequest(requestData);
  };

  // console.log(responseCreateFriendRequest);

  const mainImagesData = [responseGetUserById?.data?.users?.profileImage];

  const [mainImage, setMainImage] = useState([]);

  useEffect(() => {
    setMainImage(responseGetUserById?.data?.users?.profileImage);
  }, [responseGetUserById.isSuccess]);
  const galleryData = [
    {
      mainImg: GalleryMainImage,
      img1: GalleryImage1,
      img2: GalleryImage2,
      video: video,
    },
  ];

  const forumData = [
    {
      id: 1,
      name: "Janet",
      message: "Are you available for Bedtime Chitchat?",
      club: "Swinger Club",
      country: "UK",
      clubMessage:
        "Swinger club is the place to discuss anything and everything about swinging",
      time: "1 minute ago",
    },
    {
      id: 2,
      name: "Janet",
      message: "Are you available for Bedtime Chitchat?",
      club: "Swinger Club",
      country: "UK",
      clubMessage:
        "Swinger club is the place to discuss anything and everything about swinging",
      time: "1 minute ago",
    },
    {
      id: 3,
      name: "Janet",
      message: "Are you available for Bedtime Chitchat?",
      club: "Swinger Club",
      country: "UK",
      clubMessage:
        "Swinger club is the place to discuss anything and everything about swinging",
      time: "1 minute ago",
    },
    {
      id: 4,
      name: "Janet",
      message: "Are you available for Bedtime Chitchat?",
      club: "Swinger Club",
      country: "UK",
      clubMessage:
        "Swinger club is the place to discuss anything and everything about swinging",
      time: "1 minute ago",
    },
    {
      id: 5,
      name: "Janet",
      message: "Are you available for Bedtime Chitchat?",
      club: "Swinger Club",
      country: "UK",
      clubMessage:
        "Swinger club is the place to discuss anything and everything about swinging",
      time: "1 minute ago",
    },
    {
      id: 6,
      name: "Janet",
      message: "Are you available for Bedtime Chitchat?",
      club: "Swinger Club",
      country: "UK",
      clubMessage:
        "Swinger club is the place to discuss anything and everything about swinging",
      time: "1 minute ago",
    },
    {
      id: 7,
      name: "Janet",
      message: "Are you available for Bedtime Chitchat?",
      club: "Swinger Club",
      country: "UK",
      clubMessage:
        "Swinger club is the place to discuss anything and everything about swinging",
      time: "1 minute ago",
    },
    {
      id: 8,
      name: "Janet",
      message: "Are you available for Bedtime Chitchat?",
      club: "Swinger Club",
      country: "UK",
      clubMessage:
        "Swinger club is the place to discuss anything and everything about swinging",
      time: "1 minute ago",
    },
    {
      id: 9,
      name: "Janet",
      message: "Are you available for Bedtime Chitchat?",
      club: "Swinger Club",
      country: "UK",
      clubMessage:
        "Swinger club is the place to discuss anything and everything about swinging",
      time: "1 minute ago",
    },
    {
      id: 10,
      name: "Janet",
      message: "Are you available for Bedtime Chitchat?",
      club: "Swinger Club",
      country: "UK",
      clubMessage:
        "Swinger club is the place to discuss anything and everything about swinging",
      time: "1 minute ago",
    },
  ];
  const [verifyThisUser, setVerifyThisUser] = React.useState("");

  const blockReasonData = ["Reason 1", "Reason 2"];

  const [blockReason, setBlockReason] = React.useState("");

  const [block, setBlock] = React.useState(false);

  const [openModal, setOpenModal] = React.useState(false);

  const verifyThisUserData = ["Yes", "No"];
  return (
    <>
      {responseGetUserById.isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className='ProfilePage-section text-white p-[4rem] flex flex-col gap-[2rem]'>
          <Button
            onClick={() => history(-1)}
            text={
              <div className='flex flex-row gap-[10px] items-center'>
                <IoIosArrowBack />
                <p>Back</p>
              </div>
            }
          />
          <div className='ProfilePage-section-main flex flex-row gap-[2rem] py-[2rem]'>
            <div className='ProfilePage-section-main-details w-[50%]'>
              <div className='ProfilePage-section-main-details-left flex flex-row items-center justify-between w-full border-b py-[1rem]'>
                <div className='flex flex-col'>
                  <h2 className='text-[35px]'>
                    {responseGetUserById?.data?.users?.name}
                  </h2>
                  <div className='flex flex-row gap-[6px]'>
                    <p>{`${29}, ${
                      responseGetUserById?.data?.users?.gender
                    }`}</p>
                    <p className='italic opacity-50'>from</p>
                    <p>{`${responseGetUserById?.data?.users?.city}, ${responseGetUserById?.data?.users?.contry}`}</p>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-row gap-[10px] items-center'>
                    <p>Verified</p>
                    <BsPatchCheckFill className='text-green-600' />
                  </div>
                  <p className='text-[12px] opacity-50'>{`(95 people verified this profiles)`}</p>
                </div>
              </div>

              <div className='ProfilePage-section-main-details-left-detailsTable flex flex-col gap-[1rem] w-full'>
                <div className='flex flex-row items-center'>
                  <p className='w-[200px] text-[18px] opacity-70'>
                    Looking For
                  </p>
                  <p className='font-[600] text-[20px]'>Male</p>
                </div>
                <div className='flex flex-row items-center'>
                  <p className='w-[200px] text-[18px] opacity-70'>
                    Orientation
                  </p>
                  <p className='font-[600] text-[20px]'>
                    {responseGetUserById?.data?.users?.Orientation}
                  </p>
                </div>
                <div className='flex flex-row items-center'>
                  <p className='w-[200px] text-[18px] opacity-70'>Status</p>
                  <p className='font-[600] text-[20px]'>
                    {responseGetUserById?.data?.users?.MaritalStatus}
                  </p>
                </div>
                <div className='flex flex-row items-center'>
                  <p className='w-[200px] text-[18px] opacity-70'>
                    Kink Identity
                  </p>
                  <p className='font-[600] text-[14px]'>
                    {responseGetUserById?.data?.users?.Kink_Identity?.toString()}
                  </p>
                </div>
                <div className='flex flex-row items-center'>
                  <p className='w-[200px] text-[18px] opacity-70'>Interests</p>
                  <p className='font-[600] text-[14px]'>
                    {responseGetUserById?.data?.users?.Interests?.toString()}
                  </p>
                </div>
                <div className='flex flex-row items-center'>
                  <p className='w-[200px] text-[18px] opacity-70'>
                    Verify this user
                  </p>
                  <div className='flex flex-row gap-[1rem] items-center w-full'>
                    <div className='w-[50%]'>
                      <MUISelect
                        data={verifyThisUserData}
                        selection={setVerifyThisUser}
                        selectedValue={verifyThisUser}
                        heading={"Select an option"}
                      />
                    </div>
                    <div className='flex flex-col gap-[4px]'>
                      <p className='text-[12px] opacity-70 italic'>
                        to type your own message...
                      </p>
                      <p className='text-[20px] cursor-pointer hover:underline'>
                        click here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-[50%] flex flex-col gap-[1rem]'>
              <ProfilePageMainImagesComp
                data={responseGetUserById?.data?.users?.profileImage}
                mainImage={mainImage}
                setMainImage={setMainImage}
              />

              {login[0]?._id !== responseGetUserById?.data?.users?._id && (
                <div className='flex flex-row gap-[1rem] w-full'>
                  <div className='flex flex-row w-[80%] gap-[10px]'>
                    {userCookie === "No Cookie" ? (
                      <Link
                        to='/Login'
                        className='flex flex-row gap-[10px] bg-[#BE98A1] text-[#80011F] w-[50%] items-center justify-center rounded-[4px] p-[1rem] font-[600] hover:opacity-80 transition ease-in-out duration-[0.4s]'>
                        <LiaUserPlusSolid className='text-[22px]' />
                        <p>Add as friend</p>
                      </Link>
                    ) : (
                      <button
                        onClick={handleAddFriend}
                        className='flex flex-row gap-[10px] bg-[#BE98A1] text-[#80011F] w-[50%] items-center justify-center rounded-[4px] p-[1rem] font-[600] hover:opacity-80 transition ease-in-out duration-[0.4s]'>
                        <LiaUserPlusSolid className='text-[22px]' />
                        <p>Add as friend</p>
                      </button>
                    )}
                    {userCookie === "No Cookie" ? (
                      <Link
                        to='/Login'
                        className='flex flex-row gap-[10px] bg-[#BE98A1] text-[#80011F] w-[50%] items-center justify-center rounded-[4px] p-[1rem] font-[600] hover:opacity-80 transition ease-in-out duration-[0.4s]'>
                        <RiUserHeartLine className='text-[20px]' />
                        <p>Add as playmate</p>
                      </Link>
                    ) : (
                      <button className='flex flex-row gap-[10px] bg-[#BE98A1] text-[#80011F] w-[50%] items-center justify-center rounded-[4px] p-[1rem] font-[600] hover:opacity-80 transition ease-in-out duration-[0.4s]'>
                        <RiUserHeartLine className='text-[20px]' />
                        <p>Add as playmate</p>
                      </button>
                    )}
                  </div>

                  {userCookie === "No Cookie" ? (
                    <Link to='/Login' className=''>
                      <button className='flex flex-row gap-[3px] w-[20%] bg-[#BE98A1] text-[#80011F] items-center justify-center rounded-[4px] p-[1rem] font-[600] hover:opacity-80 transition ease-in-out duration-[0.4s] w-full'>
                        <BiMessageRoundedDetail className='text-[20px]' />
                        <p className=''>Message</p>
                      </button>
                    </Link>
                  ) : (
                    <Link to='' className=''>
                      <button className='flex flex-row gap-[3px] w-[20%] bg-[#BE98A1] text-[#80011F] items-center justify-center rounded-[4px] p-[1rem] font-[600] hover:opacity-80 transition ease-in-out duration-[0.4s] w-full'>
                        <BiMessageRoundedDetail className='text-[20px]' />
                        <p className=''>Message</p>
                      </button>
                    </Link>
                  )}
                </div>
              )}

              {login[0]?._id !== responseGetUserById?.data?.users?._id && (
                <div className='flex flex-row justify-end'>
                  <Modal
                    open={openModal}
                    setOpen={setOpenModal}
                    modalButton={
                      <div className=''>
                        {!block && (
                          <div className='flex flex-row gap-[10px] items-center cursor-pointer w-fit'>
                            <LiaUserTimesSolid className='text-[30px]' />
                            <p className='italic underline text-[18px]'>
                              Block this user
                            </p>
                          </div>
                        )}
                        {block && (
                          <div className='flex flex-row gap-[10px] items-center cursor-pointer w-fit'>
                            <LiaUserTimesSolid className='text-[30px]' />
                            <p className='italic underline text-[18px]'>
                              Unblock this user
                            </p>
                          </div>
                        )}
                      </div>
                    }
                    modalContent={
                      <div className='flex flex-col gap-[2rem]'>
                        {!block && (
                          <p className='text-[25px] font-[600]'>Block Janet</p>
                        )}

                        {!block && (
                          <div className='p-[1rem] flex flex-col gap-[1rem]'>
                            <SelectComp
                              data={blockReasonData}
                              state={blockReason}
                              setState={setBlockReason}
                            />
                            <textarea
                              rows={3}
                              className='w-full rounded-[4px] border-[#C4C4C4] border-[1px] border-solid p-[1rem]'
                              placeholder='Type your own reason'
                            />
                            <div className='flex justify-end'>
                              <Button
                                onClick={() => {
                                  setBlock(true);
                                  setOpenModal(false);
                                }}
                                text={<p className='text-white'>Submit</p>}
                              />
                            </div>
                          </div>
                        )}
                        {block && (
                          <div className='flex flex-col gap-[1rem]'>
                            <p className='text-[22px] font-[600] text-center italic'>
                              Are you sure you want to unblock Janet ?
                            </p>
                            <p>
                              Remember, unblocking can open up new opportunities
                              for communication and connection, allowing for
                              fresh conversations and experiences
                            </p>
                            <div className='flex flex-row gap-[10px] justify-center'>
                              <Button
                                onClick={() => {
                                  // setBlock(false);
                                  setOpenModal(false);
                                }}
                                text={<p className='text-white'>Cancel</p>}
                              />
                              <Button
                                onClick={() => {
                                  setBlock(false);
                                  setOpenModal(false);
                                }}
                                text={<p className='text-white'>Confirm</p>}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    }
                  />
                </div>
              )}
            </div>
          </div>

          <div className='ProfilePage-section-main-aboutMe flex flex-col gap-[1rem]'>
            <h2 className='text-[25px] font-[600]'>About Me:</h2>
            <p className='text-justify'>
              {parse(`${responseGetUserById?.data?.users?.Aboutme}`)}
            </p>
          </div>

          <div className='ProfilePage-section-main-IEnjoy grid grid-cols-2 gap-[2rem] relative'>
            {responseGetUserById?.data?.users?.Enjoyed?.map((enjoy, index) => {
              return (
                <div className='flex flex-row w-full' key={index}>
                  <div className='bg-[#D05975] w-[80%] py-[4px] px-[1rem]'>
                    {enjoy?.name}
                  </div>
                  <div className='bg-[#B7002B] w-[20%] p-[4px] text-center'>
                    {`${enjoy?.rating}/10`}
                  </div>
                </div>
              );
            })}

            <div className='absolute top-0 flex flex-col items-center h-full w-full justify-center gap-[10px] text-[20px] font-[600]'>
              <p>I</p>
              <div className='flex flex-col gap-[4px] items-center'>
                <p>E</p>
                <p>N</p>
                <p>J</p>
                <p>O</p>
                <p>Y</p>
              </div>
            </div>
          </div>

          <div className='ProfilePage-section-main-Gallery py-[2rem] flex flex-col gap-[1rem]'>
            <h2 className='text-[30px] font-[700] text-center'>Gallery</h2>
            <div className='flex flex-row gap-[6px] italic text-[14px] justify-center'>
              <p>Janet uploaded 121 public photos and 200 Premium pics, go</p>
              <p className='font-[700] cursor-pointer hover:underline'>
                Premium
              </p>
              <p>to experience her PPV World</p>
            </div>

            <ProfileGalleryComp data={galleryData} />
          </div>

          <div className='ProfilePage-section-main-profileCategories py-[2rem] flex flex-col gap-[2rem]'>
            <h2 className='text-[30px] font-[700]'>
              Explore “Janet’s PPV World” (200)
            </h2>
            <ProfileCategoriesComp />
          </div>

          <div className='ProfilePage-section-main-profileForumPosting flex flex-col gap-[1rem]'>
            <h2 className='text-[30px] font-[700]'>Janet’s Forum Postings</h2>
            {mappedForumCards}
          </div>
        </div>
      )}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          Friend Request Sent
        </Alert>
      </Snackbar>
      <Snackbar
        open={open1}
        autoHideDuration={4000}
        onClose={handleClose1}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose1} severity='warning' sx={{ width: "100%" }}>
          Friend Request Already Sent
        </Alert>
      </Snackbar>
    </>
  );
}
