"use client";
import { useSession } from "next-auth/react";
import InputMessage from "./components/InputMessage";
import Body from "./components/body/Body";
import BodyLayout from "./components/body/BodyLayout";

const Page = () => {
  const { data: session } = useSession();

  return (
    <BodyLayout>
      <Body />
      <InputMessage />
    </BodyLayout>
  );
};

export default Page;
