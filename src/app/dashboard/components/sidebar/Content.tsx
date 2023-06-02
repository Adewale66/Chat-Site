import React, { Dispatch, SetStateAction } from "react";
import { IconContext } from "react-icons";
import { IoIosArrowBack } from "react-icons/io";
import Members from "../Members";

const Content = ({
  title,
  description,
  setContent,
}: {
  title: string;
  description: string;
  setContent: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className="flex items-center gap-3 shadow border-b-2 border-gray-600  p-3">
        <IconContext.Provider
          value={{
            size: "1.5rem",
            color: "white",
          }}
        >
          <IoIosArrowBack
            className="hover:cursor-pointer"
            onClick={() => setContent(false)}
          />
        </IconContext.Provider>
        <h1 className=" font-bold text-base text-[#E0E0E0]">All channels</h1>
      </div>

      <h2 className="text-white font-bold text-base px-4">{title}</h2>

      <p className="text-white px-4 font-normal">{description}</p>
      <span className="text-white font-bold text-base px-4">Members</span>
      <div className="flex flex-col items-center gap-3 px-4">
        <Members name="Wale Kujore" />
      </div>
    </>
  );
};

export default Content;
