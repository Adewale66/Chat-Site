import Image from "next/image";
import dummyimg from "../../../../../public/blank-profile-picture-973460_1280.webp";

const Members = () => {
  return (
    <div className=" w-full">
      <Image
        src={dummyimg}
        alt="profile"
        className="rounded-md"
        width={42}
        height={42}
      />
    </div>
  );
};

export default Members;
