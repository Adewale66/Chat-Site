import { IconContext } from "react-icons";
import { AiOutlineSearch } from "react-icons/ai";
import Group from "./Group";
import MyModal from "../Modal";
import { getGroup } from "@/actions/getGroup";
import { useQuery } from "react-query";
import { useMemo, useState } from "react";
import { addGroup } from "@/actions/createGroup";

export interface GroupType {
  id: string;
  title: string;
  description: string;
  createdAt: String;
}

const SidebarMainContent = () => {
  const { isLoading, data } = useQuery("groups", getGroup);
  const groups: GroupType[] = useMemo(() => data, [data]);
  const [channelName, setChannelName] = useState({ name: "", description: "" });

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <>
      <div className="flex items-center justify-between shadow border-b-2 border-gray-600    p-3">
        <span className=" font-bold text-xl text-[#E0E0E0]">Channels</span>
        <MyModal
          func={addGroup}
          data={{
            name: channelName.name,
            description: channelName.description,
          }}
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
            <textarea
              onChange={(e) =>
                setChannelName({
                  ...channelName,
                  description: e.target.value,
                })
              }
              value={channelName.description}
              placeholder="Channel Description"
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
        />
      </div>
      {groups &&
        groups.map((group) => {
          return <Group title={group.title} key={group.id} />;
        })}
    </>
  );
};

export default SidebarMainContent;
