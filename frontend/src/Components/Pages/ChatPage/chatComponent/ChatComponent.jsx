import React, { useState } from "react";
import "./ChatComponent.css";

import { ImAttachment } from "react-icons/im";
import { BsFillSendFill, BsFillEmojiSmileFill } from "react-icons/bs";

import EmojiPicker from "emoji-picker-react";

export default function ChatComponent({ data }) {
  const [selectedOpenedChat, setSelectedOpenedChat] = useState();

  const [showEmoji, setShowEmoji] = useState(false);

  const renderedOpenedChatCompData = data.map((member, index) => {
    return (
      <div
        key={index}
        onClick={() => setSelectedOpenedChat(member.name)}
        className={`flex flex-row justify-between items-center px-[10px] drop-shadow-md items-center border-inherit rounded-br-[13px] cursor-default min-w-[170px] ${
          selectedOpenedChat === member.name
            ? "bg-white"
            : "bg-[#D9D9D9] opacity-70"
        }`}>
        <img
          className='w-[30px] h-[30px]'
          src={member.image}
          alt='memberImage'
        />
        <p className='text-[#80011F]'>{member.name}</p>
        <p className='text-[#80011F] cursor-pointer'>X</p>
      </div>
    );
  });

  return (
    <div className='ChatComponent-section w-full h-full flex flex-col'>
      <div className='ChatComponent-section-upperCards h-[10%] flex flex-row rounded-br-[13px] overflow-x-scroll'>
        {renderedOpenedChatCompData}
      </div>
      <div className='ChatComponent-section-messages relative h-[85%]'>
        <p>Message</p>
        {showEmoji && (
          <div className='absolute bottom-0 right-[20%]'>
            <EmojiPicker width={300} height={350} />
          </div>
        )}
      </div>
      <div className='ChatComponent-section-messageInputField h-[15%] w-full flex flex-row p-[10px] gap-[10px] items-center'>
        <div className='chatComponent-messageTextFieldANDEmoji w-[80%] flex flex-row gap-[10px] bg-[#AC6D7C] rounded-[20px] items-center px-[1rem]'>
          <textarea
            rows={2}
            placeholder='write your message here...'
            className='chatComponent-messageTextField bg-transparent outline-none w-[95%] p-[10px] overflow-hidden resize-none '
          />
          <div className='w-[5%]'>
            <BsFillEmojiSmileFill
              onClick={() => setShowEmoji(!showEmoji)}
              className={`${
                showEmoji && "text-blue-600"
              } text-[30px] cursor-pointer`}
            />
          </div>
        </div>
        <ImAttachment className='text-[25px] text-white cursor-pointer hover:text-blue-600' />
        <div className='bg-white rounded-full p-[10px] cursor-pointer'>
          <BsFillSendFill className='text-[#17A300] text-[25px] hover:text-blue-600' />
        </div>
      </div>
    </div>
  );
}
