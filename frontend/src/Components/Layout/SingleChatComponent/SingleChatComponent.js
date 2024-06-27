import React, { useEffect, useState } from "react";
import "./SingleChatComponent.css";
import img from "../../Asset/Rectangle 117.png";
import { BsFillEmojiSmileFill, BsFillSendFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { ImAttachment } from "react-icons/im";
import ScrollableFeed from "react-scrollable-feed";
function SingleChatComponent() {
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [message, setMessage] = useState();
  const [myMessage, setMyMessage] = useState([]);
  const myMessageHandle = (e) => {
    e.preventDefault();
    setMyMessage([...myMessage, message]);
  };
  useEffect(() => {
    console.log(myMessage);
  }, [myMessage]);
  useEffect(() => {
    console.log(selectedEmoji?.emoji);
  }, [selectedEmoji]);
  return (
    <div className="singleChatComponent">
      <div className="user_message">
        <span>
          <img src={img} alt="user Profile" />
        </span>
        <div>
          <p>Took a holiday to Spain, was too busy with work</p>
        </div>
      </div>
      <div className="self_message">
        <div>
          <p>Took a holiday to Spain, was too busy with work</p>
        </div>
        <span>
          <img src={img} alt="user Profile" />
        </span>
      </div>

      {showEmoji && (
        <div className="absolute bottom-[13%] right-[8%]">
          <EmojiPicker
            width={300}
            height={350}
            onEmojiClick={(emoji) => setSelectedEmoji(emoji)}
          />
        </div>
      )}
      <div className="singleChatComponent_send_message">
        <span>
          <img src={img} alt="user profile" />
          <p></p>
        </span>
        <form onSubmit={myMessageHandle}>
          <div>
            <textarea
              placeholder="SingleChatComponent"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="w-[5%]">
              <BsFillEmojiSmileFill
                onClick={() => setShowEmoji(!showEmoji)}
                style={{ color: "#fff" }}
                className={`${
                  showEmoji && "text-blue-600"
                } text-[30px] cursor-pointer`}
              />
            </div>
          </div>
          <ImAttachment className="text-[25px] text-white cursor-pointer hover:text-blue-600 mx-4" />
          <span className="bg-white rounded-full p-[10px] cursor-pointer">
            <button className="flex justify-center items-center" type="submit">
              <BsFillSendFill className="text-[#17A300] text-[25px] hover:text-blue-600" />
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}

export default SingleChatComponent;
