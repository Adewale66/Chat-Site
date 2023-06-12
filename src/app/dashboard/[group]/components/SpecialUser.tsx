"use client";

import { useState, useEffect, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import dummyimg from "../../../../../public/blank-profile-picture-973460_1280.webp";
import { BsGithub } from "react-icons/bs";

const SuperProfile = () => {
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
      {() => (
        <>
          <Popover.Button onClick={togglePopover}>
            <Image
              src={dummyimg}
              alt="profile"
              className="rounded-md"
              width={42}
              height={42}
            />
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
              className="absolute top-[-50px]  right-12 w-max bg-[#3C393F] p-4 rounded-lg shadow-md z-50"
              ref={popoverRef}
              style={{ transform: "translateY(-40%)" }}
            >
              <div className="flex flex-col items-center gap-y-4 ">
                <div className="flex items-center gap-x-6 ">
                  <Image
                    className="h-16 w-16 rounded-full"
                    src={dummyimg}
                    alt=""
                  />
                  <div className="flex flex-col  gap-2">
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {"Adewale Kujore"}
                    </h3>
                    <a href="https://github.com/Adewale66" target="_blank">
                      <BsGithub className="text-2xl" />
                    </a>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">
                      {"Super User"}
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default SuperProfile;
