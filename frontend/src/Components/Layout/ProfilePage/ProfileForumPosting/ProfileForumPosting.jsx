import React from "react";
import "./ProfileForumPosting.css";

import arrowImg from "../../../Asset/Images/ProfilePageGalleryCompImages/arrow.png";

export default function ProfileForumPosting({
  forumData,
  userData,
  forumTopicData,
  commentData,
  time,
}) {
  console.log(userData);
  // const renderedForumData = commentData?.map((forum, index) => {
  //   return (
  //     <div key={index} className='flex flex-col'>
  //       <p className=''>
  //         <strong className='underline cursor-pointer'>{`${userData?.name}'s`}</strong>{" "}
  //         posted{" "}
  //         <strong className='underline cursor-pointer'>{`"${commentData.comment}"`}</strong>{" "}
  //         in{" "}
  //         <strong className='underline cursor-pointer'>{`${forumTopicData.topic} in ${forum.country}:`}</strong>{" "}
  //         {forum.clubMessage}
  //       </p>
  //       <div className='flex flex-row justify-end'>
  //         <p className='opacity-50 text-[14px] italic'>{`(${time}`})</p>
  //       </div>
  //     </div>
  //   );
  // });
  return (
    <div className='ProfileForumPosting-section flex flex-col gap-[1rem] px-[4rem]'>
      {/* {renderedForumData} */}
      <div className='flex flex-col'>
        <p className=''>
          <strong className='underline cursor-pointer'>{`${userData?.name}'s`}</strong>{" "}
          posted{" "}
          <strong className='underline cursor-pointer'>{`"${forumTopicData?.topic}"`}</strong>{" "}
          in{" "}
          <strong className='underline cursor-pointer'>{`${forumData?.ForumsName}:`}</strong>{" "}
          {commentData?.comment}
        </p>
        <div className='flex flex-row justify-end'>
          <p className='opacity-50 text-[14px] italic'>{`(${time}`})</p>
        </div>
      </div>
      {/* <div className='flex flex-row gap-[10px] items-center justify-end cursor-pointer hover:underline'>
        <p className='italic '>View 200 more</p>
        <img className='w-[60px] h-[8px]' src={arrowImg} alt='arrowImg' />
      </div> */}
    </div>
  );
}
