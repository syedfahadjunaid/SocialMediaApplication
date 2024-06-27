import React from "react";

export default function Button({ onClick, text }) {
  return (
    <button
      onClick={onClick}
      className={`btnComp h-[50px] bg-[#B7002B] w-fit px-[3rem] py-[10px] rounded-[2px] hover:bg-[#C53053] transition duration-[0.4s] ease-in-out`}>
      {text}
    </button>
  );
}
