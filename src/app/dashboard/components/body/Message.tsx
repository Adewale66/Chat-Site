"use client";

import Image from "next/image";
import dummy from "../../../../../public/blank-profile-picture-973460_1280.webp";
import clsx from "clsx";
import { useSession } from "next-auth/react";

const Message = ({
  message,
  user,
  length,
  time,
}: {
  message: string;
  user: string;
  time: string;
  length: number;
}) => {
  const meridiem = Number(time.slice(11, 13)) > 12 ? "PM" : "AM";
  const loggedUser = useSession();

  return (
    <div className="flex items-center gap-4 w-full ">
      <Image
        src={dummy}
        alt="dummy"
        width={42}
        height={42}
        className="max-[475px]:self-start"
      />
      <div className="w-full ">
        <div className="flex items-center gap-2 max-[400px]:text-[11px]">
          <span className="text-[#828282] text-base font-bold">
            {user === loggedUser.data?.user?.name ? "You" : user}
          </span>
          <div
            className={clsx(
              "text-sm text-[#828282] flex gap-2 font-medium max-[400px]:text-[10px] ml-auto",
              length >= 7 && "pr-4"
            )}
          >
            <span>{time.slice(11, 16)}</span>
            <span>{meridiem}</span>
          </div>
        </div>
        <p className="text-[#E0E0E0] max-[400px]:text-[13px]">{message}</p>
      </div>
    </div>
  );
};

export default Message;
