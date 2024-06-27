import React from "react";
import "./ForumLatestUpdateCard.css";
import img from "../../Asset/1.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import { Link } from "react-router-dom";
function ForumLatestUpdateCard({
  forumData,
  userData,
  forumTopicData,
  commentData,
  time,
}) {
  return (
    <div className='forumlatestupdate'>
      <div className='forumlatestupdate_left'>
        {/* <img src={img} alt='banner' /> */}
        <MdKeyboardDoubleArrowRight className='text-[35px]' />
      </div>
      <div className='forumlatestupdate_right'>
        <div className='forumlatestupdate_span'>
          <span className='forumlatestupdate_span_bold'>
            <u>
              <Link to={`/Profile/${userData?.userId}`}>
                {userData?.username}
              </Link>
            </u>
            :
          </span>
          <p className='forumlatestupdate_span_normal'>posted in topic</p>
          <span className='forumlatestupdate_span_bold'>
            <u>
              <Link
                to={`/forumTopicComments/${forumTopicData?.topicId}`}>{`"${forumTopicData?.topic}"`}</Link>
            </u>
          </span>
          <p className='forumlatestupdate_span_normal'>in forum</p>
          <span className='forumlatestupdate_span_bold'>
            <u>
              <Link
                to={`/forum/${forumData?.ForumsId}`}>{`"${forumData?.ForumsName}"`}</Link>
            </u>
            :
          </span>
        </div>
        <p className='forumlatestupdate_span_normal'>{commentData?.comment}</p>
        <div className='forumlatestupdate_time'>({`${time}`}) !</div>
      </div>
    </div>
  );
}

export default ForumLatestUpdateCard;
