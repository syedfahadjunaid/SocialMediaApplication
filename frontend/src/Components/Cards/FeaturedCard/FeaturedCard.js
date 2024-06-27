import React from "react";
import "./FeaturedCard.css";
import img from "../../Asset/IMG_1807 1.png";
function FeaturedCard({title,image}) {
  return (
    <div className="featuredcard">
      <img src={image?image: img} alt="featured card" />
      <p>{title?title:'My Profile'}</p>
    </div>
  );
}

export default FeaturedCard;
