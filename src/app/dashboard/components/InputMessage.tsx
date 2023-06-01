"use client";

import { AiOutlineSend } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

const InputMessage = () => {
  return (
    <div className="w-full bg-[#3C393F] flex items-center justify-between p-2 rounded-md shadow-md mt-auto">
      <input
        type="text"
        placeholder="Type a message here "
        className="w-full bg-transparent pl-2 outline-none text-white"
      />
      <IconContext.Provider value={{ size: "1.2rem", color: "white" }}>
        <div className="bg-[#2F80ED] p-2 rounded-md hover:cursor-pointer">
          <AiOutlineSend />
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default InputMessage;
