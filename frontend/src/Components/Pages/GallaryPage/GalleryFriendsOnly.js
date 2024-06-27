import React from "react";
import "./GallaryPage.css";
import img from "../../Asset/Rectangle 134.png";
import img1 from "../../Asset/Rectangle 134-1.png";
import img2 from "../../Asset/Rectangle 134-2.png";
import img3 from "../../Asset/Rectangle 135.png";
import img4 from "../../Asset/Rectangle 135-2.png";
import img5 from "../../Asset/Rectangle 135-2.png";
import img6 from "../../Asset/Rectangle 136.png";
import img7 from "../../Asset/Rectangle 136-1.png";
import img8 from "../../Asset/Rectangle 136-2.png";
import img9 from "../../Asset/Rectangle 137.png";
import img10 from "../../Asset/Rectangle 137-1.png";
import img11 from "../../Asset/Rectangle 137-2.png";
import { KeyboardArrowLeft, PrivacyTip, Upload } from "@mui/icons-material";
function GalleryFriendsOnly() {
  const images = [
    { image: img },
    { image: img1 },
    { image: img2 },
    { image: img3 },
    { image: img4 },
    { image: img5 },
    { image: img6 },
    { image: img7 },
    { image: img8 },
    { image: img9 },
    { image: img10 },
    { image: img11 },
  ];
  return (
    <div className="galleryPage">
      <div className="galleryPage_profile_button">
        <button>
          <KeyboardArrowLeft /> Profile
        </button>
      </div>
      <div className="galleryPage_title">
        <p>Janet’s Friends only Gallery ( Girl on Girl )</p>
      </div>
      <div className="galleryPage_images ">
        {images?.map((item)=>(
           <div className="galleryPage_images_div">
           <img
             src={item?.image}
             alt="gallery"
             className="galleryPage_friends_only_image"
           />
           <div>
             <PrivacyTip className="privacy_icon"/>
             <button>View Profile</button>
             <p>Add Janet as friend to view “Friends only gallery”</p>
           </div>
         </div>
        ))}
        
       
      </div>
    </div>
  );
}

export default GalleryFriendsOnly;
