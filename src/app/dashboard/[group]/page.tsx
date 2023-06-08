"use client";

import Body from "../components/body/Body";
import BodyLayout from "../components/body/BodyLayout";
import InputMessage from "../components/body/InputMessage";
import Content from "../components/body/Groupmemebers";
import { getGroup } from "@/actions/getGroups";
import { useQuery } from "react-query";
import { GroupType } from "@/types/type";
import NotFound from "./components/NotFound";

const Page = ({ params }: { params: { group: string } }) => {
  const groupName = params.group.replaceAll("%20", " ");

  const {
    isLoading,
    error,
    data: group,
  } = useQuery<GroupType>("group", () => getGroup(groupName));

  if (isLoading) return <div>Loading...here</div>;

  if (group?.message === "not found") return <NotFound />;

  return (
    <div className="w-full max-[765px]:absolute flex ">
      <BodyLayout>
        <Body messages={group?.messages} title={group?.title as string} />
        <InputMessage groupId={group?.id} />
      </BodyLayout>
      <Content group={group} />
    </div>
  );
};

export default Page;
