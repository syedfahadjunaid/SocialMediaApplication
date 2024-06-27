import React from "react";
import "./FourmProfileCard.css";
import img from "../../Asset/Images/noprofileImage.png";
import img1 from "../../Asset/Vector.png";

import { Link } from "react-router-dom";
function FourmProfileCard({ data }) {
  // console.log(data);
  return (
    <div className='fourmprofilecard'>
      <div className='fourmprofilecard_top'>
        <img
          className='w-[50px] h-[50px] rounded-full'
          src={
            data?.CommentUserImage
              ? process.env.React_App_Base_Image_Url + data?.CommentUserImage
              : img
          }
          alt='banner'
        />
        <div className='fourmprofilecard_top_div'>
          <p>
            <Link to={`/Profile/${data?.CommentUserId}`}>
              <u>{data?.CommentUserName}</u>
            </Link>
          </p>
          <span>
            <p>{`${data?.CommentUserGender}, ${data?.CommentUserAge} years`}</p>
            <p>{data?.CommentUserCountry}</p>
            <p>{data?.CommentTime}</p>
          </span>
          <span className='fourmprofilecard_top_div_span'>
            <img src={img1} alt='banner' />
            <p style={{ marginBottom: "4px" }}>Report</p>
          </span>
        </div>
      </div>
      <div className='fourmprofilecard_middle'>
        <p>{data?.Comment}</p>
      </div>
      <div className='fourmprofilecard_bottom'>
        <button>Reply Here</button>
        <button>Private Reply</button>
        <button>@mention</button>
      </div>
    </div>
  );
}

export default FourmProfileCard;
