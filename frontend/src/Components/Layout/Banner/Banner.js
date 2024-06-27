import React from "react";
import "./Banner.css";
import BannerCard from "../../Cards/BannerCard/BannerCard";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import img from "../../Asset/Rectangle 86.png";
import img1 from "../../Asset/mask-2378574_1920.jpg";
import img2 from "../../Asset/sexy-2742629_1920.jpg";
import img3 from "../../Asset/pawel-szvmanski-CD6pT9Uzx1Y-unsplash.jpg";
function Banner() {
  const data = [
    {
      img: img,
    },
    {
      img: img1,
    },
    {
      img: img2,
    },
     {
      img: img3,
    },
  ];
  return (
    <div className="banner">
      <AliceCarousel mouseTracking disableButtonsControls autoPlay autoPlayInterval={4000} infinite>
        {data?.map((item) => (
          <BannerCard images={item.img} />
        ))}
      </AliceCarousel>
     
    </div>
  );
}

export default Banner;
