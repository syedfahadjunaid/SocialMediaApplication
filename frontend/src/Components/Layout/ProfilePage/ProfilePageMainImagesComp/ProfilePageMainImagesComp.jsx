import React, { useState } from "react";
import "./ProfilePageMainImagesComp.css";

export default function ProfilePageMainImagesComp({
  data,
  mainImage,
  setMainImage,
}) {
  // const [mainImage, setMainImage] = useState();

  const renderedSmallImages = data.map((image, index) => {
    const imageUrl = process.env.React_App_Base_Image_Url + image;
    return (
      <img
        key={index}
        className='border-2 bg-white bg-opacity-50 border-transparent border-solid hover:border-[black] cursor-pointer'
        src={imageUrl}
        alt={`img-${index}`}
        onClick={() => setMainImage(image)}
      />
    );
  });

  return (
    <div className='ProfilePageMainImagesComp-section'>
      <div className='mainImagesData flex flex-row gap-[1rem] w-full'>
        <img
          className='mainImagesData-mainImage bg-white bg-opacity-50 w-[80%] h-[400px]'
          src={process.env.React_App_Base_Image_Url + mainImage}
          alt='Profile Pic'
        />
        <div className='mainImagesData-smallImages flex flex-col gap-[10px] overflow-y-scroll h-[400px] pr-[4px]'>
          {renderedSmallImages}
        </div>
      </div>
    </div>
  );
}
