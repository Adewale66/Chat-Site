"use client";

import LoggedUser from "../LoggedUser";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useQuery } from "react-query";
import { getGroup } from "@/actions/getGroup";
import Content from "./Content";
import SidebarMainContent from "./SidebarMainContent";
import SideBarController from "./SideBarController";
import { GroupType } from "@/types/type";

const SideBar = () => {
  const [hidden, setHidden] = useState(false);
  const [content, setContent] = useState(false);

  const { data, isLoading } = useQuery("group", getGroup);

  console.log();

  return (
    <div>
      <SideBarController setHidden={setHidden} hidden={hidden} />
      <aside
        className={clsx(
          "min-h-screen bg-black px-4 py-2 w-72  min-w-[280px] relative  flex flex-col gap-4  z-40  transform transition-transform duration-300 ease-in-out min-[545px]:-translate-x-0",
          hidden && "-translate-x-full",
          !hidden && "-translate-x-0"
        )}
      >
        {!content && <SidebarMainContent groups={[]} setContent={setContent} />}
        {content && <Content setContent={setContent} title="" description="" />}
        <LoggedUser />
      </aside>
    </div>
  );
};

export default SideBar;
