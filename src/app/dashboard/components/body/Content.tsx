import Members from "./Members";

const Content = () => {
  return (
    <div className=" bg-black px-4 py-2 flex flex-col  gap-4 ">
      <button className="bg-white px-2 py-2 rounded-md">+</button>
      <Members />
      <Members />
      <Members />
    </div>
  );
};

export default Content;
