// import React from "react";
import "./FourmPage.css";
import { Link, useNavigate } from "react-router-dom";
import ForumLatestUpdateCard from "../../Cards/ForumLatestUpdateCard/ForumLatestUpdateCard";
import CustomPagination from "../../Layout/CustomPagination/CustomPagination";

import ForumList from "../../Layout/ForumList/ForumList";

import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import ButtonComp from "../../Layout/Button";

import { useCreateForumMutation } from "../../../services/forum";

import { forumRefetchChange } from "../../../Slice/forumSlice";

import { useSelector, useDispatch } from "react-redux";

import { Alert, Snackbar } from "@mui/material";
function FourmPage() {
  const [createForum, responseCreateForum] = useCreateForumMutation();
  console.log(responseCreateForum);

  const dispatch = useDispatch();

  useEffect(() => {
    if (responseCreateForum.isSuccess) {
      setOpenBar1(true);
    } else if (responseCreateForum.isError) {
      setOpenBar2(true);
    }
  }, [responseCreateForum.isSuccess, responseCreateForum.isError]);

  const [forumTitle, setForumTitle] = useState("");
  const [forumDescription, setForumDescription] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openBar1, setOpenBar1] = useState(false);
  const handleClose1 = () => {
    setOpenBar1(false);
  };
  const [openBar2, setOpenBar2] = useState(false);
  const handleClose2 = () => {
    setOpenBar2(false);
  };

  const style = {
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
  const { forums } = useSelector((state) => state.forumState);

  const { users } = useSelector((state) => state.userState);

  const { forumTopics } = useSelector((state) => state.forumTopicState);

  const { forumComments } = useSelector((state) => state.forumCommentState);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((forumComments?.length / 5).toFixed(0));
  }, [forumComments]);

  const [reverseArrayState, setReverseArrayState] = useState([]);
  useEffect(() => {
    const reverseArray = forumComments?.map(forumComments.pop, [
      ...forumComments,
    ]);
    setReverseArrayState(reverseArray);
  }, [forumComments]);

  const mappedForumData = forums?.map((forum, index) => {
    return {
      indexId: index,
      id: forum?._id,
      forumId: forum?.ForumsId,
      title: forum?.ForumsName,
      description: forum?.Discription,
      link: `/forum/${forum?.ForumsId}`,
    };
  });

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

  const mappedForumCards = reverseArrayState
    ?.slice((page - 1) * 5, (page - 1) * 5 + 5)
    ?.map((comment, index) => {
      const findForum = forums?.find((forum) => {
        return forum?.ForumsId === comment?.forumId;
      });
      const findUser = users?.find((user) => {
        return user?._id === comment?.userId;
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
        <ForumLatestUpdateCard
          key={index}
          forumData={findForum}
          userData={findUser}
          forumTopicData={findForumTopic}
          commentData={comment}
          time={time}
        />
      );
    });
  // console.log(mappedForumData);

  const handleAddForum = (e) => {
    e.preventDefault();
    const submitData = {
      Forumstitles: forumTitle,
      Discription: forumDescription,
    };
    createForum(submitData);
    // console.log(submitData);
    setOpen(false);
  };

  const addForumForm = (
    <form
      onSubmit={handleAddForum}
      className='flex flex-col gap-[1rem] text-white p-[1rem]'>
      <input
        required
        onChange={(e) => setForumTitle(e.target.value)}
        value={forumTitle}
        className='text-black border p-[1rem] outline-none'
        placeholder='Enter forum title'
      />
      <textarea
        required
        onChange={(e) => setForumDescription(e.target.value)}
        value={forumDescription}
        className='text-black border p-[1rem] outline-none'
        placeholder='Enter forum description'
      />
      <ButtonComp text='Add Forum' />
    </form>
  );

  const history = useNavigate();
  const data = mappedForumData;
  return (
    <>
      {/* <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box> */}
      <div className='fourmpage'>
        <div className='fourmpage_heading'>
          <h3 className='text-[30px]'>Latest Updates</h3>
          <span>
            <Link to='/'>Home</Link> / <p>Forum</p>
          </span>
          <ButtonComp onClick={handleOpen} text='Add New Forum' />
        </div>
        <div className='fourmpage_info'>
          <div className='fourmpage_info_left'>
            {mappedForumCards}
            {/* <ForumLatestUpdateCard />
          <ForumLatestUpdateCard />
          <ForumLatestUpdateCard />
          <ForumLatestUpdateCard /> */}
          </div>
          <ForumList />
          {/* <div className='fourmpage_info_right'>
          <span>
            <input type='text' placeholder='Search' />
            <button>Search Topic</button>
          </span>
          <div className='fourmpage_info_right_div'>
            <span>
              <p>Forum List</p>
            </span>
            <div className='fourmpage_info_right_div_list'>
              <ul>
                {data?.map((item) => (
                  <li onClick={() => history(`${item.link}`)}>{item?.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div> */}
        </div>
        <div className='fourmpage_pagination'>
          <CustomPagination count={count} setPage={setPage} />
        </div>
      </div>
      <Snackbar
        open={openBar1}
        autoHideDuration={4000}
        onClose={handleClose1}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose1} severity='success' sx={{ width: "100%" }}>
          Forum Added Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={openBar2}
        autoHideDuration={4000}
        onClose={handleClose2}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose2} severity='warning' sx={{ width: "100%" }}>
          Something went wrong
        </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add New Forum
          </Typography>
          {addForumForm}
        </Box>
      </Modal>
    </>
  );
}

export default FourmPage;
