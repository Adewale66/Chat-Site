"use client";

import Members from "./Members";
import { useQuery } from "react-query";
import { useMemo, useState } from "react";
import { getUsers } from "@/actions/getAllUsers";
import { GroupType } from "../sidebar/SidebarContent";
import MyModal from "../Modal";
import Example from "../../[group]/components/Users";
import { AddUserToGroup } from "@/actions/addMember";
import DeleteGroup from "../../[group]/components/DeleteGroup";
import { useSession } from "next-auth/react";

export interface Userprops {
  id: string;
  name: string;
  email: string;
  image: string;
  groupIds: string[];
  groups: GroupType[];
}

const Content = ({ group }: { group: GroupType | undefined }) => {
  const { isLoading, data } = useQuery<Userprops[]>("users", getUsers);
  const loggedUser = useSession();
  const usersNotInGroup = useMemo(
    () => data?.filter((d) => !d.groupIds.includes(group?.id as string)),
    [data, group?.id]
  );

  const [dataToAdd, setDataToAdd] = useState({
    userId: "",
    groupId: "",
  });
  console.log(data);

  const adminUser = group?.admin.email === loggedUser?.data?.user?.email;
  const members = useMemo<Userprops[] | undefined>(
    () => data?.filter((d) => d.groupIds.includes(group?.id as string)),
    [data, group?.id]
  );

  if (isLoading) return <div>Loading...</div>;
  console.log("adin", adminUser);
  console.log("members", members);

  function clearInput() {
    setDataToAdd({
      groupId: "",
      userId: "",
    });
  }
  console.log(dataToAdd);

  return (
    <div className=" bg-black px-4 py-3 flex flex-col items-center  gap-4 ">
      {adminUser && (
        <MyModal
          title="User"
          invalidate="users"
          func={AddUserToGroup}
          data={dataToAdd}
          clearData={clearInput}
        >
          <Example
            options={usersNotInGroup}
            groupId={group?.id}
            setData={setDataToAdd}
          />
        </MyModal>
      )}
      {members && members.map((d, i) => <Members key={i} img={d.image} />)}
      {adminUser && (
        <DeleteGroup
          groupId={group?.id as string}
          groupName={group?.title as string}
        />
      )}
    </div>
  );
};

export default Content;
