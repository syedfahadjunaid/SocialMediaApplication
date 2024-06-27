import React, { useEffect, useState } from "react";
import "./FourmInnerPage.css";
import CustomPagination from "../../Layout/CustomPagination/CustomPagination";
import { Link, useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import img from "../../Asset/Images/noprofileImage.png";

import { useParams } from "react-router-dom";
import { useGetForumByIdQuery } from "../../../services/forum";

import { useSelector, useDispatch } from "react-redux";

import ForumList from "../../Layout/ForumList/ForumList";

import ForumTopicList from "../../Layout/ForumList/ForumTopicList";

function FourmInnerPage() {
  const { forumId } = useParams();

  const { login, userCookie } = useSelector((state) => state.userLogin);

  const {
    forumComments,
    forumTopicCreate,
    forumTopicUpdate,
    forumTopicRefetch,
  } = useSelector((state) => state.forumCommentState);

  // console.log(forumComments);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((forumComments?.length / 5).toFixed(0));
  }, [forumComments]);

  const { users } = useSelector((state) => state.userState);

  const { forumTopics } = useSelector((state) => state.forumTopicState);

  const responseGetForumById = useGetForumByIdQuery(forumId);

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

  // const reverseArray = (array) => array.map(array.pop, [...array]);

  // const revereForumTopicsData = reverseArray(forumComments);

  const [reverseArrayState, setReverseArrayState] = useState([]);
  useEffect(() => {
    const reverseArray = forumComments?.map(forumComments.pop, [
      ...forumComments,
    ]);
    setReverseArrayState(reverseArray);
  }, [forumComments]);

  const renderedForumTopics = reverseArrayState
    ?.slice((page - 1) * 5, (page - 1) * 5 + 5)
    ?.map((comment, index) => {
      const user = users?.find((u) => {
        return u?._id === comment?.userId;
      });

      const topic = forumTopics?.find((topic) => {
        return topic?.topicId === comment?.forumTopicId;
      });

      const userByTopic = users?.find((user) => {
        return topic?.userId === user?._id;
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
        <tr key={index}>
          <td>
            <img
              src={
                user?.profileImage
                  ? process.env.React_App_Base_Image_Url + user?.profileImage
                  : img
              }
              alt=''
              className='rounded-full bg-opacity-50 bg-white'
              style={{ width: "50px", height: "50px" }}
            />
          </td>
          <td>
            <span>
              <u
                style={{ fontSize: "18px", cursor: "pointer" }}
                onClick={() =>
                  history(`/forumTopicComments/${topic?.topicId}`)
                }>
                {topic?.topic?.substr(0, 30)}
              </u>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>
                by:
                <Link to={`/Profile/${userByTopic?.userId}`}>
                  <u className='font-[600] px-[10px]'>{userByTopic?.name}</u>
                </Link>
              </p>
            </span>
          </td>
          <td>50</td>
          <td>
            <span>
              <p
                onClick={() => history(`/forumTopicComments/${topic?.topicId}`)}
                className='font-[600] cursor-pointer hover:underline'
                style={{ fontSize: "16px" }}>{`${comment?.comment.substr(
                0,
                50
              )}...`}</p>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>
                by:
                <Link
                  to={`/Profile/${user?.userId}`}
                  className='px-[10px]'
                  style={{ fontSize: "14px", marginTop: "8px" }}>
                  <u className='font-[600]'>{user?.name}</u>
                </Link>
              </p>
              <p style={{ fontSize: "12px", marginTop: "8px" }}>{time}</p>
            </span>
          </td>
          <td>{comment?.updatedAt?.substr(0, 10)}</td>
        </tr>
      );
    });
  const history = useNavigate();

  return (
    <div className='fourmpage'>
      <div className='fourmpage_heading'>
        <h3 className='text-[30px]'>
          {responseGetForumById?.data?.Singleforum?.ForumsName}
        </h3>
        <span>
          <Link to='/'>Home</Link> /{" "}
          <Link to='/forum' style={{ marginLeft: "5px" }}>
            Forum
          </Link>{" "}
          /{" "}
          <p>
            <u>{responseGetForumById?.data?.Singleforum?.ForumsName}</u>
          </p>
        </span>
        {userCookie === "No Cookie" ? (
          <span
            className='fourmpage_heading_add_new_post'
            onClick={() => history("/Login")}>
            <p>Login to post a new topic</p>
            <Add />
          </span>
        ) : (
          <span
            className='fourmpage_heading_add_new_post'
            onClick={() =>
              history(
                `/forum/forumtopic/${responseGetForumById?.data?.Singleforum?.ForumsId}`
              )
            }>
            <p>Post a new topic</p>
            <Add />
          </span>
        )}
      </div>
      <div className='fourmpage_info'>
        <div className='fourmpage_info_left fourmpage_info_left_table'>
          <table>
            <tr>
              <th></th>
              <th>Title & Author</th>
              <th>Replies</th>
              <th>Latest</th>
              <th>Date</th>
            </tr>
            {renderedForumTopics}
          </table>
        </div>
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
                  <li>{item?.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div> */}
        <ForumTopicList />
      </div>
      <div className='fourmpage_pagination'>
        <CustomPagination count={count} setPage={setPage} />
      </div>
    </div>
  );
}

export default FourmInnerPage;
