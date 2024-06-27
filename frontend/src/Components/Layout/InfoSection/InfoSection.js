import React from "react";
import "./InfoSection.css";
import img from "../../Asset/image 14.png";
import img1 from "../../Asset/image 15.png";
import img2 from "../../Asset/image 16.png";
import img3 from "../../Asset/image 17.png";
function InfoSection() {
  return (
    <div className="infosection">
      <div className="infosection_card">
        <img src={img} alt="info card" />
        <strong>5000+</strong>
        <p>Registered Users</p>
      </div>{" "}
      <div className="infosection_card">
        <img src={img1} alt="info card" />
        <strong>5000+</strong>
        <p>Registered Users</p>
      </div>{" "}
      <div className="infosection_card">
        <img src={img2} alt="info card" />
        <strong>5000+</strong>
        <p>Registered Users</p>
      </div>
      <div className="infosection_card">
        <img src={img3} alt="info card" />
        <strong>5000+</strong>
        <p>Registered Users</p>
      </div>
    </div>
  );
}

export default InfoSection;
