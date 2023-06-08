"use client";

import Members from "./Members";
import { useQuery } from "react-query";
import { useMemo, useState } from "react";
import { getUsers } from "@/actions/getAllUsers";
import MyModal from "../Modal";
import Example from "../../[group]/components/Users";
import { AddUserToGroup } from "@/actions/addMember";
import DeleteGroup from "../../[group]/components/DeleteGroup";
import { useSession } from "next-auth/react";
import { GroupType, Userprops } from "@/types/type";
import LoadingSidebar from "../sidebar/LoadingSidebar";

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

  const adminUser = group?.admin.email === loggedUser?.data?.user?.email;

  const members = useMemo<Userprops[] | undefined>(
    () => data?.filter((d) => d.groupIds.includes(group?.id as string)),
    [data, group?.id]
  );

  if (isLoading)
    return (
      <div className="text-white flex justify-center items-center min-h-screen">
        <LoadingSidebar />
      </div>
    );

  function clearInput() {
    setDataToAdd({
      groupId: "",
      userId: "",
    });
  }

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
