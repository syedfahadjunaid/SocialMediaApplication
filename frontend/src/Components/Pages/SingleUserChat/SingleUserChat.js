import React from "react";
import "./SingleUserChat.css";
import SingleChatComponent from "../../Layout/SingleChatComponent/SingleChatComponent";
import img from "../../Asset/Rectangle 117.png";
import { ArrowBackIos, ArrowLeft, Verified } from "@mui/icons-material";

function SingleUserChat() {
  return (
    <div className="singleuserchat">
      <div className="singleuserchat_profile_button">
        <button>
          <ArrowBackIos style={{ fontSize: "16px" }} /> Profile
        </button>
      </div>
      <div className="singleuserchat_profile_info">
        <div className="singleuserchat_profile_info_left">
          <img src={img} alt="Profile Pic" />
          <div>
            <h5 className="Profile_name">Miss Janet</h5>
            <p className="Profile_active_status">
              Active <span> 4 Hours Ago</span>
            </p>
            <p className="Profile_last_connected">
              Last Connected: <span>2 Days on 6-Oct-2023</span>{" "}
            </p>
          </div>
        </div>
        <div className="singleuserchat_profile_info_right">
          <p className="profile_verified">
            Verified <Verified className="profile_verified_icon" />
          </p>
          <p className="profile_verified_by_people">
            (95 people verified this profiles)
          </p>
          <div>
            <button className="profile_button">unfriend</button>
            <button className="profile_button">Block</button>
          </div>
        </div>
      </div>
      <span></span>
      <SingleChatComponent />
    </div>
  );
}

export default SingleUserChat;
