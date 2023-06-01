"use client";

import { useState, useEffect, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { IconContext } from "react-icons/lib";
import { signOut } from "next-auth/react";

const PopoverData = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            className="text-white py-2 px-4 rounded-lg"
            onClick={togglePopover}
          >
            {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Popover.Button>
          <Transition
            show={isOpen}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className="absolute right-3 bottom-2 w-max bg-[#3C393F] p-4 rounded-lg shadow-md z-10"
              ref={popoverRef}
              style={{ transform: "translateY(-40%)" }}
            >
              <div className="flex flex-col  gap-2">
                <div className="flex items-center gap-3 hover:cursor-pointer p-2 hover:bg-gray-600 rounded-md">
                  <IconContext.Provider value={{ color: "white" }}>
                    <CgProfile />
                  </IconContext.Provider>
                  <span className="text-white">Profile</span>
                </div>
                <div className="flex items-center gap-3 hover:cursor-pointer p-2 hover:bg-gray-600 rounded-md">
                  <IconContext.Provider value={{ color: "white" }}>
                    <FaUserFriends />
                  </IconContext.Provider>
                  <span className="text-white">Friends</span>
                </div>
                <hr className="border-gray-300" />
                <div
                  className="flex items-center gap-3 hover:cursor-pointer"
                  onClick={() => signOut()}
                >
                  <IconContext.Provider value={{ className: "text-red-500" }}>
                    <LuLogOut />
                  </IconContext.Provider>
                  <span className="text-red-500">Logout</span>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default PopoverData;
