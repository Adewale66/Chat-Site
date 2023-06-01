"use client";
import { signOut, useSession } from "next-auth/react";
import InputMessage from "./components/InputMessage";
import Example from "./components/Popover";
import Body from "./components/Body";

const Page = () => {
  const { data: session } = useSession();

  return (
    <section className=" flex flex-col pl-16 pr-12  py-2 bg-[#333333] w-full min-h-screen max-[545px]:absolute max-[545px]:pr-4 max-[545px]:pl-5 z-10 ">
      <Body />
      <InputMessage />
    </section>
  );
};

export default Page;
