import React from "react";
import "./AdvertisementsCard.css";
import img from "../../Asset/Rectangle 14.png";
function AdvertisementsCard({ title, paragraph, image }) {
  return (
    <div className="advertisementsCard">
      <div className="advertisementsCard_img">
        <img src={image ? image : img} alt="advertisementsCardimg" />
      </div>
      <div className="advertisementsCard_details">
        <h3>{title ? title : "Awesome Community"} </h3>
        <p>
          {paragraph
            ? paragraph
            : `  Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s.`}
        </p>
      </div>
    </div>
  );
}

export default AdvertisementsCard;
