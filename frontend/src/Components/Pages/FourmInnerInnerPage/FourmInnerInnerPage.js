import { useEffect, useState } from "react";
import "./FourmInnerInnerPage.css";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import ForumProfileCard from "../../Cards/FourmProfileCard/FourmProfileCard";

import ForumList from "../../Layout/ForumList/ForumList";

import Button from "../../Layout/Button";

import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";

import { useCreateForumCommentMutation } from "../../../services/forumComment";

import { useGetForumTopicByIdQuery } from "../../../services/forumTopic";
// import { useGetForumByIdQuery } from "../../../services/forum";

import { forumCommentCreateChange } from "../../../Slice/forumCommentSlice";

import CustomPagination from "../../Layout/CustomPagination/CustomPagination";

import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { Alert, Snackbar } from "@mui/material";
function FourmInnerInnerPage() {
  const { forumCommentId } = useParams();

  const dispatch = useDispatch();

  const [createForumComment, responseCreateForumComment] =
    useCreateForumCommentMutation();
  // console.log(responseCreateForumComment);

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (responseCreateForumComment.isSuccess) {
      setIsLoading(false);
      setOpen(true);
      dispatch(forumCommentCreateChange(Math.random()));
    }
    if (responseCreateForumComment.isError) {
      setIsLoading(false);
      setOpen1(true);
    }
  }, [
    responseCreateForumComment.isSuccess,
    responseCreateForumComment.isError,
  ]);

  const [forumTopicNewComment, setForumTopicNewComment] = useState();

  const responseGetForumTopicById = useGetForumTopicByIdQuery(forumCommentId);

  const { forums } = useSelector((state) => state.forumState);

  const { forumTopics } = useSelector((state) => state.forumTopicState);

  const { forumComments } = useSelector((state) => state.forumCommentState);

  const { users } = useSelector((state) => state.userState);

  const { login, userCookie } = useSelector((state) => state.userLogin);

  // console.log(login);

  const handleSubmitNewComment = async (e) => {
    e.preventDefault();
    const forumTopicData = await forumTopics?.find((forumTopic) => {
      return forumTopic?.topicId === forumCommentId;
    });
    const forumData = await forums?.find((forum) => {
      return forumTopicData?.forumId === forum?.ForumsId;
    });

    if (forumData) {
      const data = {
        topicId: forumCommentId,
        forumId: forumData?.ForumsId,
        Commentmessage: forumTopicNewComment,
        UserID: login[0]?._id,
      };
      setIsLoading(true);
      createForumComment(data);
      // console.log(data);
    }
  };

  // console.log(responseGetForumTopicById);
  const history = useNavigate();

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

  const filteredComments = forumComments?.filter((comment) => {
    if (comment?.forumTopicId === forumCommentId) {
      return true;
    }
    return false;
  });

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((filteredComments?.length / 5).toFixed(0));
  }, [filteredComments]);

  const [reverseArrayState, setReverseArrayState] = useState([]);
  useEffect(() => {
    const reverseArray = filteredComments?.map(filteredComments.pop, [
      ...filteredComments,
    ]);
    setReverseArrayState(reverseArray);
  }, [filteredComments]);

  const renderedComments = reverseArrayState
    ?.slice((page - 1) * 5, (page - 1) * 5 + 5)
    ?.map((comment, index) => {
      const user = users?.find((u) => {
        return u?._id === comment?.userId;
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

      let dob = new Date(user.Dateofbirth);

      let month_diff = Date.now() - dob.getTime();

      let age_dt = new Date(month_diff);

      let year = age_dt.getUTCFullYear();

      let age = Math.abs(year - 1970);
      return (
        <ForumProfileCard
          key={index}
          data={{
            CommentUserId: user?.userId,
            CommentUserName: user?.username,
            CommentUserImage: user?.profileImage[0],
            CommentUserAge: age,
            CommentUserGender: user?.gender,
            CommentUserCountry: user?.contry,
            CommentTime: time,
            Comment: comment?.comment,
          }}
        />
      );
    });

  return (
    <>
      {isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className='fourmpage'>
          <div className='fourmpage_heading'>
            <h3 className='text-[30px]'>Latest Updates</h3>
            <span>
              <Link to='/'>Home</Link> /{" "}
              <Link to='/forum' style={{ marginLeft: "5px" }}>
                Forum
              </Link>{" "}
              /{" "}
              <p style={{ marginRight: "5px" }}>
                {responseGetForumTopicById?.data?.SingleTopicId?.topic}
              </p>{" "}
              / <p>New Forum Post</p>
            </span>
          </div>
          <div className='fourmpage_info'>
            <div className='fourmpage_info_left'>
              <div className='fourmpage_info_left_heading'>
                <ArrowBack
                  onClick={() => history(-1)}
                  style={{ cursor: "pointer" }}
                />
                <span>
                  {responseGetForumTopicById?.data?.SingleTopicId?.topic}
                </span>
              </div>
              <div className='fourmpage_info_left_profilecard'>
                {renderedComments}
              </div>
              <div className='fourmpage_pagination p-[1rem]'>
                <CustomPagination count={count} setPage={setPage} />
              </div>
              {userCookie === "No Cookie" ? (
                <Button
                  text='Login To Post New Comment'
                  onClick={() => history("/Login")}
                />
              ) : (
                <form
                  onSubmit={handleSubmitNewComment}
                  className='flex flex-row gap-[1rem] w-full'>
                  <textarea
                    required
                    onChange={(e) => setForumTopicNewComment(e.target.value)}
                    placeholder='Type your message here...'
                    minLength={1}
                    className='p-[10px] border outline-none bg-white bg-opacity-50 rounded-md w-[70%] text-black placeholder:text-black'
                    rows={4}
                  />
                  <Button
                    // onClick={handleSubmitNewComment}
                    text='Add new comment'
                  />
                </form>
              )}
            </div>
            {/* <div className="fourmpage_info_right">
          <span>
            <input type="text" placeholder="Search" />
            <button>Search Topic</button>
          </span>
          <div className="fourmpage_info_right_div">
            <span>
              <p>Forum List</p>
            </span>
            <div className="fourmpage_info_right_div_list">
              <ul>
                {data?.map((item) => (
                  <li>{item?.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div> */}
            <ForumList />
          </div>
        </div>
      )}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          Comment Added Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={open1}
        autoHideDuration={4000}
        onClose={handleClose1}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose1} severity='warning' sx={{ width: "100%" }}>
          Something went wrong
        </Alert>
      </Snackbar>
    </>
  );
}

export default FourmInnerInnerPage;
