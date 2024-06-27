import React from "react";
import UserCard from "../../Cards/UserCard/UserCard";
import img1 from "../../Asset/Rectangle 34.png";
import img2 from "../../Asset/Rectangle 35.png";
import img3 from "../../Asset/Rectangle 36.png";
import img4 from "../../Asset/Rectangle 37.png";
import img5 from "../../Asset/Rectangle 38.png";
import img6 from "../../Asset/Rectangle 39.png";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
function MostRecentUser() {
  const { users } = useSelector((state) => state.userState);
  const responsive = {
    0: {
      items: 1,
    },
    1024: {
      items: 3,
      itemsFit: "contain",
    },
  };
  const data = [
    {
      img: img1,
      name: "Jenna",
      age: "26",
    },
    {
      img: img2,
      name: "Janet",
      age: "28",
    },
    {
      img: img3,
      name: "Barbara, 34",
      age: "38",
    },
    {
      img: img4,
      name: "Andrew",
      age: "25",
    },
    {
      img: img5,
      name: "Jenni Aniston",
      age: "35",
    },
    {
      img: img6,
      name: "Kate Mandela",
      age: "35",
    },
  ];

  const renderedUsers = users?.map((item, index) => {
    let dob = new Date(item?.Dateofbirth);

    let month_diff = Date.now() - dob.getTime();

    let age_dt = new Date(month_diff);

    let year = age_dt.getUTCFullYear();

    let age = Math.abs(year - 1970);
    return (
      <Link to={`/Profile/${item?.userId}`}>
        <UserCard
          key={index}
          name={item?.name}
          image={item?.profileImage[0]}
          age={age}
        />
      </Link>
    );
  });
  return (
    <div className='topratedpictures'>
      <div className='topratedpictures_heading'>
        <h3>Most Recent Users</h3>
      </div>
      <div className='topratedpictures_cards'>
        <AliceCarousel
          mouseTracking
          disableButtonsControls
          responsive={responsive}
          autoPlay
          autoPlayInterval={4000}
          infinite>
          {renderedUsers?.reverse()}
        </AliceCarousel>
      </div>
    </div>
  );
}

export default MostRecentUser;
