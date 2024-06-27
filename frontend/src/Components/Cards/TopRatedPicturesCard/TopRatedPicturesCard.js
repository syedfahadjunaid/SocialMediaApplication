import React from "react";
import "./TopRatedPicturesCard.css";
import img from "../../Asset/Rectangle 88.png";
import img1 from "../../Asset/noto-v1_kiss-mark.png";
import img2 from "../../Asset/Mask group.png";
function TopRatedPicturesCard({ image, name, age }) {
  return (
    <div className="topratedpicturescard">
      <img src={image ? image : img} alt="top rated" />
      <div className="topratedpicturescard_div">
        <span>
          <img src={img1} alt="banner"/>
          <p>45k</p>
        </span> 
        <span>
          <img src={img2} alt="banner"/>
          <p>5.5k</p>
        </span>
      </div>
      <span>
        <p>{name}</p>
        <p>{age}</p>
      </span>
    </div>
  );
}

export default TopRatedPicturesCard;
