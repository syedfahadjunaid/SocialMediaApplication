import React from "react";
import "./UserCard.css";
import img from "../../Asset/Images/noprofileImage.png";
function UserCard({ image, name, age }) {
  return (
    <div className='usercard'>
      <img
        src={image ? process.env.React_App_Base_Image_Url + image : img}
        alt='user card'
      />
      <span>
        <p>
          {name ? name : "Jenna"}, {age ? age : "26"}
        </p>
      </span>
    </div>
  );
}

export default UserCard;
