const Group = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-2 justify-between hover:cursor-pointer rounded-md p-2  hover:bg-gray-200 hover:bg-opacity-20">
      <div className="p-2 flex items-center bg-[#252329] rounded-lg text-white justify-center  w-[42px]">
        {title
          .split(" ")
          .slice(0, 2)
          .map((w) => w[0].toUpperCase())}
      </div>
      <span className="uppercase w-full text-base text-[#BDBDBD] font-bold">
        {title}
      </span>
    </div>
  );
};

export default Group;
