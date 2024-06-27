import React from "react";
import "./Featured.css";
import FeaturedCard from "../../Cards/FeaturedCard/FeaturedCard";
import img from "../../Asset/IMG_1807 1.png";
import img1 from "../../Asset/IMG_1808 1.png";
import img2 from "../../Asset/IMG_1809 1.png";
import img3 from "../../Asset/IMG_1810 1.png";
import img4 from "../../Asset/image 9.png";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
function Featured() {
  const { login, userCookie } = useSelector((state) => state.userLogin);
  // console.log(JSON.parse(localStorage.getItem("userLogin")));
  const data = [
    {
      img: img,
      title: "My Profile",
      routeLink: `/Profile/${
        JSON.parse(localStorage.getItem("userLogin"))?.userId
      }`,
    },
    {
      img: img1,
      title: "My Messages",
      routeLink: `/`,
    },
    {
      img: img2,
      title: "My Chats",
      routeLink: `/`,
    },
    {
      img: img3,
      title: "Subscribe",
      routeLink: `/`,
    },
    {
      img: img4,
      title: "Slap / Tickle",
      routeLink: `/`,
    },
  ];

  const renderedFeaturesWithoutLogin = data?.map((Feature, index) => {
    return (
      <Link to={"/Login"} key={index}>
        <FeaturedCard title={Feature?.title} image={Feature?.img} />
      </Link>
    );
  });

  const renderedFeaturedWithLogin = data?.map((Feature, index) => {
    return (
      <Link to={Feature?.routeLink} key={index}>
        <FeaturedCard title={Feature?.title} image={Feature?.img} />
      </Link>
    );
  });
  return (
    <div className='featured'>
      <div className='featured_heading'>
        <h3>Features</h3>
      </div>
      <div className='featured_cards'>
        {userCookie === "No Cookie"
          ? renderedFeaturesWithoutLogin
          : renderedFeaturedWithLogin}
      </div>
    </div>
  );
}

export default Featured;
