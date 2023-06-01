"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import Image from "next/image";
import Noprofile from "../../../../public/blank-profile-picture-973460_1280.webp";
import PopoverData from "./Popover";

const LoggedUser = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center bg-[#0B090C] justify-between w-full mt-auto">
      <Image src={Noprofile} alt="Profile image" width={40} height={40} />
      <span className="text-[#828282] font-bold text-base  ">
        {session?.user?.name}
      </span>
      <PopoverData />
    </div>
  );
};

export default LoggedUser;
