"use client";

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
import UserProfile from "../../[group]/components/RemoveUser";
import clsx from "clsx";
import SuperProfile from "../../[group]/components/SpecialUser";

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

  const adminUser =
    group?.admin.email === loggedUser?.data?.user?.email && group?.admin;

  const members = useMemo<Userprops[] | undefined>(
    () => data?.filter((d) => d.groupIds.includes(group?.id as string)),
    [data, group?.id]
  );
  if (isLoading)
    return (
      <div className="text-white flex pl-2 justify-center items-center min-h-screen bg-black">
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
    <div
      className={clsx(
        " bg-black px-4 py-3 flex flex-col items-center  gap-4 relative z-10",
        !adminUser && "pt-12"
      )}
    >
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
      {members && group && (
        <UserProfile
          user={group?.admin}
          admin={group?.admin}
          groupId={group?.id}
        />
      )}
      <SuperProfile />

      {members &&
        members
          .filter((d) => d.id !== group?.admin.id)
          .filter((d) => d.id !== process.env.NEXT_PUBLIC_SUPER_USER)
          .map((d, i) => (
            <UserProfile
              key={i}
              user={d}
              admin={group?.admin}
              groupId={group?.id}
            />
          ))}
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
