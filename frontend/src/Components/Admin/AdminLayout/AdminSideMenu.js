import React, { useState } from "react";

// import usersIcon from "../AdminAssets/UserIcon.png";
// import chatroomIcon from "../AdminAssets/ChatroomsIcon.png";
// import emails from "../AdminAssets/EmailsIcon.png";
// import subscriptionIcon from "../AdminAssets/SubcriptionIcon.png";
// import paymentIcon from '../AdminAssets/PaymentsIcon.png';
// import manageAdvertisement from "../AdminAssets/ManageAdvertisementIcon.png";
// import manage
import { MdForum } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { IoMdChatbubbles } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { BsBagDash } from "react-icons/bs";
import { FaMoneyBills } from "react-icons/fa6";
import { RiAdvertisementFill } from "react-icons/ri";
import { BiMessageDots } from "react-icons/bi";

import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

export default function AdminSideMenu({
  setSideMenuSelection,
  sideMenuSelection,
}) {
  const [sideMenuUserDropdown, setSideMenuUserDropdown] = useState(false);
  const [homepageDropdown, setHomepageDropdown] = useState(false);
  const [managePagesDropdown, setManagePagesDropdown] = useState(false);
  return (
    <div className='w-[20%] h-screen slide-in-left'>
      <div className='flex flex-col p-[1rem] text-black gap-[10px] border-b h-[15%]'>
        <p
          className='text-[18px] font-[700] cursor-pointer hover:underline text-[#535353]'
          onClick={() => setSideMenuSelection("Dashboard")}>
          Kink Galore
        </p>
        <div className='flex flex-row justify-between items-center cursor-pointer hover:underline'>
          <p className='text-[#636363]'>Updates</p>
          <p className='bg-[#80011F] text-white px-[4px] rounded-sm'>15</p>
        </div>
      </div>

      <div className='flex flex-col text-[20px] text-black h-[85%] overflow-y-scroll'>
        <div className='flex flex-col'>
          <div className='p-[10px]'>
            <div className='bg-[#D9D9D980] px-[10px] rounded w-full'>
              <p className='text-[#80011F]'>Platform</p>
            </div>
          </div>
          <div className='flex flex-col p-[10px]'>
            <div
              className={
                sideMenuSelection === "Forum"
                  ? "flex flex-row items-center px-[1rem]"
                  : "flex flex-row items-center px-[1rem] opacity-50"
              }>
              <MdForum className='text-[#80011F]' />
              <p
                className='cursor-pointer text-[15px] font-[600] p-[10px] hover:underline'
                onClick={() => setSideMenuSelection("Forum")}>
                Forum
              </p>
            </div>
            <div
              className={
                sideMenuSelection === "User List" ||
                sideMenuSelection === "Blocked Users"
                  ? "flex flex-row items-center px-[1rem] w-full justify-between"
                  : "flex flex-row items-center px-[1rem] opacity-50 w-full justify-between"
              }>
              <div className='flex flex-row items-center'>
                <HiUsers className='text-[#80011F]' />
                <p
                  className='text-[15px] font-[600] p-[10px] hover:underline cursor-pointer'
                  // onClick={() => setSideMenuSelection("Users")}
                  onClick={() =>
                    setSideMenuUserDropdown(!sideMenuUserDropdown)
                  }>
                  Users
                </p>
              </div>
              {sideMenuUserDropdown ? (
                <IoMdArrowDropup />
              ) : (
                <IoMdArrowDropdown />
              )}
            </div>
            {sideMenuUserDropdown && (
              <div className='px-[1rem]'>
                <div className='flex flex-col gap-[4px] text-[15px] bg-[#EEEEEE] px-[10px] py-[10px]'>
                  <p
                    className={
                      sideMenuSelection === "User List"
                        ? "hover:bg-[#8989894D] bg-[#8989894D] cursor-pointer p-[4px]"
                        : "hover:bg-[#8989894D] cursor-pointer p-[4px]"
                    }
                    onClick={() => setSideMenuSelection("User List")}>
                    User List
                  </p>
                  <p
                    className={
                      sideMenuSelection === "Blocked Users"
                        ? "hover:bg-[#8989894D] bg-[#8989894D] cursor-pointer p-[4px]"
                        : "hover:bg-[#8989894D] cursor-pointer p-[4px]"
                    }
                    onClick={() => setSideMenuSelection("Blocked Users")}>
                    Blocked Users
                  </p>
                </div>
              </div>
            )}
            <div
              className={
                sideMenuSelection === "Chatroom"
                  ? "flex flex-row items-center px-[1rem]"
                  : "flex flex-row items-center px-[1rem] opacity-50"
              }>
              <IoMdChatbubbles className='text-[#80011F]' />
              <p
                className='cursor-pointer text-[15px] font-[600] p-[10px] hover:underline'
                onClick={() => setSideMenuSelection("Chatroom")}>
                Chatroom
              </p>
            </div>
            <div
              className={
                sideMenuSelection === "Emails"
                  ? "flex flex-row items-center px-[1rem]"
                  : "flex flex-row items-center px-[1rem] opacity-50"
              }>
              <MdOutlineEmail className='text-[#80011F]' />
              <p
                className='cursor-pointer text-[15px] font-[600] p-[10px] hover:underline'
                onClick={() => setSideMenuSelection("Emails")}>
                Emails
              </p>
            </div>
            <div
              className={
                sideMenuSelection === "Subscriptions"
                  ? "flex flex-row items-center px-[1rem]"
                  : "flex flex-row items-center px-[1rem] opacity-50"
              }>
              <BsBagDash className='text-[#80011F]' />
              <p
                className='cursor-pointer text-[15px] font-[600] p-[10px] hover:underline'
                onClick={() => setSideMenuSelection("Subscriptions")}>
                Subscriptions
              </p>
            </div>
            <div
              className={
                sideMenuSelection === "Payments"
                  ? "flex flex-row items-center px-[1rem]"
                  : "flex flex-row items-center px-[1rem] opacity-50"
              }>
              <FaMoneyBills className='text-[#80011F]' />
              <p
                className='cursor-pointer text-[15px] font-[600] p-[10px] hover:underline'
                onClick={() => setSideMenuSelection("Payments")}>
                Payments
              </p>
            </div>
            <div
              className={
                sideMenuSelection === "Manage Advertisement"
                  ? "flex flex-row items-center px-[1rem]"
                  : "flex flex-row items-center px-[1rem] opacity-50"
              }>
              <RiAdvertisementFill className='text-[#80011F]' />
              <p
                className='cursor-pointer text-[15px] font-[600] p-[10px] hover:underline'
                onClick={() => setSideMenuSelection("Manage Advertisement")}>
                Manage Advertisement
              </p>
            </div>
            <div
              className={
                sideMenuSelection === "Manage Messages"
                  ? "flex flex-row items-center px-[1rem]"
                  : "flex flex-row items-center px-[1rem] opacity-50"
              }>
              <BiMessageDots className='text-[#80011F]' />
              <p
                className='cursor-pointer text-[15px] font-[600] p-[10px] hover:underline'
                onClick={() => setSideMenuSelection("Manage Messages")}>
                Manage Messages
              </p>
            </div>
          </div>

          <div className='flex flex-col pb-[1rem]'>
            <div className='p-[10px]'>
              <div className='bg-[#D9D9D980] px-[10px] rounded w-full'>
                <p className='text-[#80011F]'>Pages</p>
              </div>
            </div>
            <div className='flex flex-col p-[10px]'>
              <div
                className={
                  sideMenuSelection === "Manage Pages Option 1"
                    ? "flex flex-row items-center px-[1rem] w-full justify-between"
                    : "flex flex-row items-center px-[1rem] opacity-50 w-full justify-between"
                }>
                <div className='flex flex-row items-center'>
                  <HiUsers className='text-[#80011F]' />
                  <p
                    className='text-[15px] font-[600] p-[10px] hover:underline cursor-pointer'
                    // onClick={() => setSideMenuSelection("Users")}
                    onClick={() =>
                      setManagePagesDropdown(!managePagesDropdown)
                    }>
                    Manage Pages
                  </p>
                </div>
                {managePagesDropdown ? (
                  <IoMdArrowDropup />
                ) : (
                  <IoMdArrowDropdown />
                )}
              </div>
              {managePagesDropdown && (
                <div className='px-[1rem]'>
                  <div className='flex flex-col gap-[4px] text-[15px] bg-[#EEEEEE] px-[10px] py-[10px]'>
                    <p
                      className={
                        managePagesDropdown === "Manage Pages Option 1"
                          ? "hover:bg-[#8989894D] bg-[#8989894D] cursor-pointer p-[4px]"
                          : "hover:bg-[#8989894D] cursor-pointer p-[4px]"
                      }
                      onClick={() =>
                        setSideMenuSelection("Manage Pages Option 1")
                      }>
                      Manage Pages Option 1
                    </p>
                  </div>
                </div>
              )}
              <div
                className={
                  sideMenuSelection === "Homepage Option 1"
                    ? "flex flex-row items-center px-[1rem] w-full justify-between"
                    : "flex flex-row items-center px-[1rem] opacity-50 w-full justify-between"
                }>
                <div className='flex flex-row items-center'>
                  <HiUsers className='text-[#80011F]' />
                  <p
                    className='text-[15px] font-[600] p-[10px] hover:underline cursor-pointer'
                    // onClick={() => setSideMenuSelection("Users")}
                    onClick={() => setHomepageDropdown(!homepageDropdown)}>
                    Homepage
                  </p>
                </div>
                {homepageDropdown ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </div>
              {homepageDropdown && (
                <div className='px-[1rem]'>
                  <div className='flex flex-col gap-[4px] text-[15px] bg-[#EEEEEE] px-[10px] py-[10px]'>
                    <p
                      className={
                        homepageDropdown === "Homepage Option 1"
                          ? "hover:bg-[#8989894D] bg-[#8989894D] cursor-pointer p-[4px]"
                          : "hover:bg-[#8989894D] cursor-pointer p-[4px]"
                      }
                      onClick={() => setSideMenuSelection("Homepage Option 1")}>
                      Homepage Option 1
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
