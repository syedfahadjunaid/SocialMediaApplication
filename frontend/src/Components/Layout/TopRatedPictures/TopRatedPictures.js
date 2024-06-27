import React from "react";
import "./TopRatedPictures.css";
import TopRatedPicturesCard from "../../Cards/TopRatedPicturesCard/TopRatedPicturesCard";
import img1 from "../../Asset/Rectangle 88.png";
import img2 from "../../Asset/Rectangle 89.png";
import img3 from "../../Asset/Rectangle 90.png";
import img4 from "../../Asset/Rectangle 91.png";
function TopRatedPictures() {
  const data = [
    {
      img: img1,
      name: "Lika Manda",
      age: "28 years",
    },
    {
      img: img2,
      name: "Lika Manda2",
      age: "27 years",
    },
    {
      img: img3,
      name: "Lika Manda1",
      age: "20 years",
    },
    {
      img: img4,
      name: "Lika1 Manda",
      age: "19 years",
    },
  ];
  return (
    <div className="topratedpictures">
      <div className="topratedpictures_heading">
        <h3>Top Rated Pictures</h3>
      </div>
      <div className="topratedpictures_cards">
        {data?.map((item) => (
          <TopRatedPicturesCard
            image={item?.img}
            name={item?.name}
            age={item?.age}
          />
        ))}
      </div>
    </div>
  );
}

export default TopRatedPictures;
