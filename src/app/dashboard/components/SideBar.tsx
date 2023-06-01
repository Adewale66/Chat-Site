"use client";

import { AiOutlineSearch, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import Group from "./Group";
import LoggedUser from "./LoggedUser";
import { useState } from "react";
import clsx from "clsx";
import Members from "./Members";
import MyModal from "./Modal";

const SideBar = () => {
  const [hidden, setHidden] = useState(false);
  const [content, setContent] = useState(true);
  return (
    <div>
      <button
        onClick={() => setHidden(false)}
        className={clsx(
          "absolute top-3 left-2 z-20  max-[545px]:block",
          !hidden && "hidden"
        )}
      >
        <IconContext.Provider value={{ color: "white", size: "1.2rem" }}>
          <AiOutlineMenu />
        </IconContext.Provider>
      </button>
      <div
        className={clsx(
          "absolute top-2 z-30 left-[300px] min-[545px]:hidden",
          hidden && "hidden"
        )}
      >
        <button
          className={clsx("text-white bg-black p-2  rounded-lg  top-2")}
          onClick={() => setHidden(true)}
        >
          <IconContext.Provider value={{ color: "white", size: "1.2rem" }}>
            <AiOutlineClose />
          </IconContext.Provider>
        </button>
      </div>
      <aside
        className={clsx(
          "min-h-screen bg-black px-4 py-2 w-72  min-w-[280px] relative  flex flex-col gap-4  z-40  transform transition-transform duration-300 ease-in-out min-[545px]:-translate-x-0",
          hidden && "-translate-x-full",
          !hidden && "-translate-x-0"
        )}
      >
        {!content && (
          <>
            <div className="flex items-center justify-between shadow border-b-2 border-gray-600    p-3">
              <span className=" font-bold text-xl text-[#E0E0E0]">
                Channels
              </span>
              <MyModal />
            </div>
            <div className="flex items-center gap-3 p-3 border-2 rounded-md border-gray-600 bg-[#3C393F]">
              <IconContext.Provider
                value={{ color: "white", size: "1.4em", className: "" }}
              >
                <AiOutlineSearch />
              </IconContext.Provider>

              <input
                type="text"
                placeholder="Search"
                className="pl-2 w-full outline-none border-none bg-[#3C393F] text-white"
              />
            </div>
            <Group title="welcome" />
            <span className="text-white" onClick={() => setContent(true)}>
              test
            </span>
          </>
        )}
        {content && (
          <>
            <div className="flex items-center gap-3 shadow border-b-2 border-gray-600  p-3">
              <IconContext.Provider
                value={{
                  size: "1.5rem",
                  color: "white",
                }}
              >
                <IoIosArrowBack
                  className="hover:cursor-pointer"
                  onClick={() => setContent(false)}
                />
              </IconContext.Provider>
              <h1 className=" font-bold text-base text-[#E0E0E0]">
                All channels
              </h1>
            </div>

            <h2 className="text-white font-bold text-base px-4">
              Frontend Developers
            </h2>

            <p className="text-white px-4 font-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates molestias autem atque?
            </p>
            <span className="text-white font-bold text-base px-4">Members</span>
            <div className="flex flex-col items-center gap-3 px-4">
              <Members name="Wale Kujore" />
            </div>
          </>
        )}
        <LoggedUser />
      </aside>
    </div>
  );
};

export default SideBar;
