"use client";

import LoggedUser from "./LoggedUser";
import { useState } from "react";
import clsx from "clsx";
import SidebarMainContent from "./SidebarContent";
import SideBarController from "./SideBarController";

const SideBar = () => {
  const [hidden, setHidden] = useState(false);

  return (
    <div>
      <SideBarController setHidden={setHidden} hidden={hidden} />
      <aside
        className={clsx(
          "min-h-screen bg-black px-4 py-2 w-72  min-w-[280px] relative  flex flex-col gap-4  z-40  transform transition-transform duration-300 ease-in-out md:-translate-x-0",
          hidden && "-translate-x-full",
          !hidden && "-translate-x-0"
        )}
      >
        <SidebarMainContent />
        <LoggedUser />
      </aside>
    </div>
  );
};

export default SideBar;
