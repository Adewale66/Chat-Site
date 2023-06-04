import Image from "next/image";
import dummy from "../../../../../public/blank-profile-picture-973460_1280.webp";

const Message = () => {
  return (
    <div className="flex items-center gap-4 w-full ">
      <Image
        src={dummy}
        alt="dummy"
        width={42}
        height={42}
        className="max-[475px]:self-start"
      />
      <div>
        <div className="flex items-center gap-2 max-[400px]:text-[11px]">
          <span className="text-[#828282] text-base font-bold">
            Wale Kujore
          </span>
          <span className="text-sm text-[#828282] font-medium max-[400px]:text-[10px]">
            yesterday at 1:39PM
          </span>
        </div>
        <p className="text-[#E0E0E0] max-[400px]:text-[13px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
          expedita asperiores dolore!
        </p>
      </div>
    </div>
  );
};

export default Message;
