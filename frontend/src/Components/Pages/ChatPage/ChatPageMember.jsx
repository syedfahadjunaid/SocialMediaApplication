import React from "react";
import "./ChatPageMember.css";
import btnBackground from "../../Asset/Images/Chatpage/btnBackground.jpg";

import { Link } from "react-router-dom";

import { BsDot } from "react-icons/bs";
import ChatComponent from "./chatComponent/ChatComponent";

export default function ChatPage({ data }) {
  const [selectedMember, setSelectedMember] = React.useState();

  const handleSelectedMember = (memberName) => {
    setSelectedMember(memberName);
  };

  const renderedChatPageMembers = data.map((member, index) => {
    return (
      <div
        key={index}
        onClick={() => handleSelectedMember(member.name)}
        className={
          member.name === selectedMember
            ? "bg-[#D9D9D9] p-[4px] flex flex-row gap-[10px] items-center cursor-pointer"
            : "p-[4px] flex flex-row gap-[10px] items-center cursor-pointer"
        }>
        <BsDot
          className={
            member.status
              ? "text-green-500 text-[40px]"
              : "text-gray-500 text-[40px]"
          }
        />
        <img
          className='w-[50px] h-[50px]'
          src={member.image}
          alt={`${member.name}-${index}-img`}
        />
        <p
          className={
            member.name === selectedMember
              ? "text-[#80011F] hover:underline"
              : "text-white hover:underline"
          }>
          {member.name}
        </p>
      </div>
    );
  });
  return (
    <div className='ChatPage-section text-white flex flex-row w-full border-t border-b'>
      <div className='flex flex-row w-full'>
        <div className='ChatPage-section-left flex flex-col gap-[1rem] w-[25%] p-[1rem] border-r overflow-y-scroll'>
          <div className='flex flex-row gap-[1rem] w-full sticky top-0'>
            <Link to='/ChatMember'>
              <button
                className={` relative border-2 border-transparent border-solid hover:border-white`}>
                <img
                  className='w-[200px]'
                  src={btnBackground}
                  alt='btnBackground'
                />
                <p className='absolute top-0 w-full h-full flex items-center justify-center'>
                  Member
                </p>
              </button>
            </Link>
            <Link to='/ChatGroup'>
              <button
                className={` relative border-2 border-transparent border-solid hover:border-white opacity-50`}>
                <img
                  className='w-[200px]'
                  src={btnBackground}
                  alt='btnBackground'
                />
                <p className='absolute top-0 w-full h-full flex items-center justify-center'>
                  Group
                </p>
              </button>
            </Link>
          </div>

          <div className='flex flex-col gap-[10px]'>
            {renderedChatPageMembers}
          </div>
        </div>
        <div className='ChatPage-section-right w-[75%]'>
          <ChatComponent data={data} />
        </div>
      </div>
    </div>
  );
}
