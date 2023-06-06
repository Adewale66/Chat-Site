"use client";

import Body from "../components/body/Body";
import BodyLayout from "../components/body/BodyLayout";
import InputMessage from "../components/body/InputMessage";
import Content from "../components/body/Groupmemebers";
import { getGroup } from "@/actions/getGroups";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { GroupType } from "../components/sidebar/SidebarContent";

const Page = ({ params }: { params: { group: string } }) => {
  const groupName = params.group.replace("-", " ");
  const { isLoading, data } = useQuery<GroupType[]>("groups", getGroup, {
    placeholderData: [],
  });
  const group: GroupType | undefined = useMemo(
    () => data?.find((d) => d.title === groupName),
    [data, groupName]
  );

  console.log(group?.members);

  if (isLoading) return <div>Loading...</div>;
  console.log(group);

  return (
    <div className="w-full max-[765px]:absolute flex ">
      <BodyLayout>
        <Body id={group?.id} />
        <InputMessage groupId={group?.id} />
      </BodyLayout>
      <Content group={group} />
    </div>
  );
};

export default Page;
