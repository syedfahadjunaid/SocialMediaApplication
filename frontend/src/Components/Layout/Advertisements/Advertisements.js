import React from "react";
import "./Advertisements.css";
import AdvertisementsCard from "../../Cards/AdvertisementsCard/AdvertisementsCard";
import img from "../../Asset/Rectangle 14.png";
import img1 from "../../Asset/Rectangle 17.png";
import img2 from "../../Asset/Rectangle 15.png";
import img3 from "../../Asset/Rectangle 16.png";
function Advertisements() {
  const data = [
    {
      title: "Awesome Community",
      paragraph: `  Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s,Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s.`,
      img: img,
    },
    {
      title: "Million Members",
      paragraph: `  Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s,Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s.`,
      img: img1,
    },
    {
      title: "Private Groups",
      paragraph: `  Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s,Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s.`,
      img: img2,
    },
    {
      title: "Awesome Community",
      paragraph: `  Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s,Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s.`,
      img: img3,
    },
  ];
  return (
    <div className="advertisements">
      <div className="advertisements_heading">
        <h3>ADVERTISEMENTS</h3>
      </div>
      <div className="advertisements_cards">
        {data?.map((item) => (
          <AdvertisementsCard
            title={item?.title}
            paragraph={item?.paragraph}
            image={item?.img}
          />
        ))}
      </div>
    </div>
  );
}

export default Advertisements;
