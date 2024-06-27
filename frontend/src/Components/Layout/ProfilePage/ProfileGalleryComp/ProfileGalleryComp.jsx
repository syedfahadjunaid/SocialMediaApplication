import React from "react";
import "./ProfileGalleryComp.css";
import arrowImg from "../../../Asset/Images/ProfilePageGalleryCompImages/arrow.png";

export default function ProfileGalleryComp({ data }) {
  const renderedProfileGalleryData = data.map((data, index) => {
    return (
      <div
        key={index}
        className='ProfileGalleryComp-data flex flex-col gap-[2rem]'>
        <img src={data.mainImg} alt='mainImg' />
        <div className='flex flex-row w-full gap-[2rem]'>
          <video className='w-[60%]' src={data.video} controls />
          <img className='w-[20%]' src={data.img1} alt='img1' />
          <img className='w-[20%]' src={data.img2} alt='img2' />
        </div>
      </div>
    );
  });
  return (
    <div className='ProfileGalleryComp-section flex flex-col gap-[1rem]'>
      <h2 className='text-[25px] font-[700]'>Public Photos (121)</h2>
      {renderedProfileGalleryData}
      <div className='flex flex-row gap-[10px] items-center justify-end cursor-pointer hover:underline'>
        <p className='italic '>View 121 more</p>
        <img className='w-[60px] h-[8px]' src={arrowImg} alt='arrowImg' />
      </div>
    </div>
  );
}
