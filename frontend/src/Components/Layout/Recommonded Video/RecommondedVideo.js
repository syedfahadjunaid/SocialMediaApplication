import React from "react";
import "./RecommondedVideo.css";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import BannerCard from "../../Cards/BannerCard/BannerCard";
function RecommondedVideo() {
  return (
    <div className="recommondedvideo">
      <div className="recommondedvideo_heading">
        <h3>Recommended Websites</h3>
      </div>
      <div className="recommondedvideo_cards">
      <AliceCarousel mouseTracking disableButtonsControls autoPlay autoPlayInterval={4000}>
        <BannerCard/>
      </AliceCarousel>
      </div>
    </div>
  );
}

export default RecommondedVideo;
