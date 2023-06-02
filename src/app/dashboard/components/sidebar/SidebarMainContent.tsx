import React, { Dispatch, SetStateAction } from "react";
import { IconContext } from "react-icons";
import { AiOutlineSearch } from "react-icons/ai";
import Group from "../Group";
import MyModal from "../Modal";
import { GroupType } from "@/types/type";

const SidebarMainContent = ({
  setContent,
  groups,
}: {
  groups: GroupType[];
  setContent: Dispatch<SetStateAction<boolean>>;
}) => {
  console.log(typeof groups);

  return (
    <>
      <div className="flex items-center justify-between shadow border-b-2 border-gray-600    p-3">
        <span className=" font-bold text-xl text-[#E0E0E0]">Channels</span>
        <MyModal />
      </div>
      <div className="flex items-center gap-3 p-3 border-2 rounded-md border-gray-600 bg-[#3C393F]">
        <IconContext.Provider
          value={{ color: "white", size: "1.4em", className: "" }}
        >
          <AiOutlineSearch />
        </IconContext.Provider>

        <input
          type="text"
          placeholder="Search"
          className="pl-2 w-full outline-none border-none bg-[#3C393F] text-white"
        />
      </div>
      {groups.map((group) => {
        return <Group title={group.title} key={group.id} />;
      })}

      <span className="text-white" onClick={() => setContent(true)}>
        test
      </span>
    </>
  );
};

export default SidebarMainContent;
