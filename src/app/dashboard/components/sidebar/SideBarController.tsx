import clsx from "clsx";
import React from "react";
import { IconContext } from "react-icons";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const SideBarController = ({
  hidden,
  setHidden,
}: {
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
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
    </>
  );
};

export default SideBarController;
