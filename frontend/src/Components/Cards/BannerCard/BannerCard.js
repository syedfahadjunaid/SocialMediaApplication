import React from "react";
import img from "../../Asset/Rectangle 31.png";
import "./BannerCard.css";
function BannerCard({images}) {
  return (
    <img src={images ? images : img} alt="banner" className="bannercard" />
  );
}

export default BannerCard;
