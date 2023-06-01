import Image from "next/image";
import dummyimg from "../../../../public/blank-profile-picture-973460_1280.webp";

const Members = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center gap-4 w-full h-full">
      <Image
        src={dummyimg}
        alt="profile"
        className="rounded-md"
        width={42}
        height={42}
      />
      <span className="text-white text-base ml-2">{name}</span>
    </div>
  );
};

export default Members;
