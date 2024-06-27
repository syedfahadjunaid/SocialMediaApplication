import React from "react";
import adminiconimg from "../../Asset/Ellipse 8.png";
import { GiHamburgerMenu } from "react-icons/gi";
import "./AdminLayout.css";

import { RiSearchFill } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { IoReloadCircle } from "react-icons/io5";

import { useDispatch } from "react-redux";

import { userRefetchChange } from "../../../Slice/userSlice";

export default function AdminNavbar({
  setShowSideBar,
  showSideBar,
  sideMenuSelection,
}) {
  const dispatch = useDispatch();
  const handleRefresh = () => {
    dispatch(userRefetchChange(Math.random()));
  };
  return (
    <div
      className={
        showSideBar
          ? "fixed w-[80%] bg-white z-10 py-[10px] px-[2rem] flex flex-row justify-between items-center text-black"
          : "fixed w-full bg-white z-10 py-[10px] px-[2rem] flex flex-row justify-between items-center slide-in-right text-black"
      }>
      <div className='flex flex-row gap-[1rem] items-center'>
        <GiHamburgerMenu
          className='text-[22px] text-[#80011F] cursor-pointer'
          onClick={() => setShowSideBar(!showSideBar)}
        />
        <p className='text-[22px] text-black cursor-pointer'>
          {sideMenuSelection}
        </p>
      </div>
      <div className='flex flex-row items-center gap-[1rem]'>
        <IoReloadCircle
          className='text-[40px] cursor-pointer'
          onClick={handleRefresh}
        />
        <div className='flex flex-row items-center gap-[10px] bg-[#D9D9D980] p-[10px] rounded'>
          <RiSearchFill className='text-[#80011F]' />
          <input
            className='bg-transparent outline-none text-black'
            type='text'
            placeholder='Search...'
          />
        </div>
        <div className='flex flex-row items-start text-[#80011F80] cursor-pointer'>
          <FaRegBell className='text-[25px]' />
          <p className='text-[12px]'>15</p>
        </div>
        <CiGlobe className='text-[30px] cursor-pointer' />
        <div className='flex flex-row gap-[5px] items-center cursor-pointer'>
          <p className='text-[25px]'>Admin</p>
          <IoIosArrowDown className='text-[#878787]' />
        </div>
        <IoSettings className='text-[30px] cursor-pointer text-[#80011F]' />
      </div>
    </div>
  );
}
