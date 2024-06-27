import React from "react";
import "./HomePage.css";
import Banner from "../../Layout/Banner/Banner";
import MarqueeText from "../../Layout/MarqueeText/MarqueeText";
import Advertisements from "../../Layout/Advertisements/Advertisements";
import Community from "../../Layout/Community/Community";
import Featured from "../../Layout/Featured/Featured";
import TopRatedPictures from "../../Layout/TopRatedPictures/TopRatedPictures";
import MostRecentUser from "../../Layout/MostRecentUser/MostRecentUser";
import InfoSection from "../../Layout/InfoSection/InfoSection";
import RecommondedVideo from "../../Layout/Recommonded Video/RecommondedVideo";
import NewsLetter from "../../Layout/NewsLetter/NewsLetter";
import AdvanceSearch from "../../Layout/AdvanceSearch/AdvanceSearch";
import FourmSection from "../../Layout/FourmSection/FourmSection";

function HomePage() {
  return (
    <div className="homepage">
      <Banner />
      <MarqueeText />
      <Advertisements />
      <Community />
      <AdvanceSearch/>
      <Featured/>
      <TopRatedPictures/>
      <MostRecentUser/>
      <FourmSection/>
      <InfoSection/>
      <RecommondedVideo/>
      <NewsLetter/>
    </div>
  );
}

export default HomePage;
