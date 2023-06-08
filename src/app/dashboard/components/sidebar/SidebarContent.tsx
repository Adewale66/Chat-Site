"use client";

import { IconContext } from "react-icons";
import { AiOutlineSearch } from "react-icons/ai";
import Group from "./Group";
import MyModal from "../Modal";
import { getGroups } from "@/actions/getGroups";
import { useQuery } from "react-query";
import { useState } from "react";
import { addGroup } from "@/actions/createGroup";
import { GroupType } from "@/types/type";
import LoadingSidebar from "./LoadingSidebar";

const SidebarMainContent = () => {
  const { isLoading, data: groups } = useQuery<GroupType[]>(
    "groups",
    getGroups
  );
  const [filter, setFilterGroup] = useState("");
  const [channelName, setChannelName] = useState({ name: "" });

  if (isLoading)
    return (
      <div className="text-white flex justify-center items-center min-h-screen">
        <LoadingSidebar />
      </div>
    );

  function clearData() {
    setChannelName({ name: "" });
  }

  return (
    <>
      <div className="flex items-center justify-between shadow border-b-2 border-gray-600    p-3">
        <span className=" font-bold text-xl text-[#E0E0E0]">Channels</span>
        <MyModal
          title="channel"
          func={addGroup}
          data={{
            name: channelName.name,
          }}
          clearData={clearData}
          invalidate="groups"
        >
          <div className="mt-2 relative flex flex-col gap-3">
            <input
              onChange={(e) =>
                setChannelName({ ...channelName, name: e.target.value })
              }
              value={channelName.name}
              type="text"
              placeholder="Channel Name"
              className="w-full bg-[#3C393F] outline-none rounded-md p-3 text-white"
            />
          </div>
        </MyModal>
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
          value={filter}
          onChange={(e) => setFilterGroup(e.target.value)}
        />
      </div>
      <div className="overflow-y-auto h-[330px]">
        {groups &&
          groups
            .filter((e) => e.title.includes(filter))
            .map((group) => {
              return <Group title={group.title} key={group.id} />;
            })}
      </div>
    </>
  );
};

export default SidebarMainContent;
