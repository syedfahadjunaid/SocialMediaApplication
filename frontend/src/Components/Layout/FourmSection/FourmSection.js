import React from "react";
import "./FourmSection.css";
import img from "../../Asset/IMG_1812 1.png";
import img1 from "../../Asset/Ellipse 8.png";
import CustomPaginationWithoutScroll from "../CustomPagination/CustomPaginationWithoutScroll";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
function FourmSection() {
  const history = useNavigate();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const { forumTopics } = useSelector((state) => state.forumTopicState);

  const { forumComments } = useSelector((state) => state.forumCommentState);

  const { forums } = useSelector((state) => state.forumState);

  const { users } = useSelector((state) => state.userState);

  useEffect(() => {
    setCount((forumComments?.length / 5).toFixed(0));
  }, [forumComments]);

  const [reverseArrayState, setReverseArrayState] = useState([]);
  useEffect(() => {
    const reverseArray = forumTopics?.map(forumTopics.pop, [...forumTopics]);
    setReverseArrayState(reverseArray);
  }, [forumTopics]);

  const renderedForumData = reverseArrayState
    ?.slice((page - 1) * 5, (page - 1) * 5 + 5)
    ?.map((topic, index) => {
      const findUser = users?.find((user) => {
        return user?._id === topic?.userId;
      });
      const findForum = forums?.find((forum) => {
        return forum?.ForumsId === topic?.forumId;
      });
      const filterComments = forumComments?.filter((comment) => {
        return comment?.forumTopicId === topic?.topicId;
      });
      const findComment = filterComments?.find(
        (comment, index) =>
          index === filterComments?.length - 1 &&
          topic?.topicId === comment?.forumTopicId
      );
      return (
        <tr key={index}>
          <td style={{ textAlign: "center" }}>
            <img
              className='h-[50px] w-[50px] rounded-full'
              src={
                process.env.React_App_Base_Image_Url + findUser?.profileImage[0]
              }
              alt='banner'
              style={{ objectFit: "cover" }}
            />
          </td>
          <td>
            <div className='fourmsection_table_div'>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "400",
                  cursor: "pointer",
                }}
                onClick={() =>
                  history(`/forumTopicComments/${topic?.topicId}`)
                }>
                {topic?.topic}
              </p>
              <span>
                <p style={{ fontSize: "14px", fontWeight: "400" }}>
                  by: {findUser?.name}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#FFFFFF",
                    marginLeft: "30px",
                  }}>
                  {findComment?.updatedAt?.substr(0, 10)}
                </p>
              </span>
            </div>
          </td>
          <td>{findForum?.ForumsName}</td>
          <td>17</td>
          <td>{filterComments?.length}</td>
          <td>1120</td>
        </tr>
      );
    });
  return (
    <div className='fourmsection'>
      <div className='fourmsection_top'>
        <h3>Forum</h3>
      </div>
      <div className='fourmsection_table'>
        <table>
          <tr>
            <th style={{ textAlign: "center" }}>
              <img src={img} alt='banner' />
            </th>
            <th>Topic</th>
            <th>Forum</th>
            <th>Threads</th>
            <th>Replies</th>
            <th>Views</th>
          </tr>
          {renderedForumData}
        </table>
        <div className='fourmsection_table_pagination'>
          <CustomPaginationWithoutScroll count={count} setPage={setPage} />
        </div>
      </div>
    </div>
  );
}

export default FourmSection;
