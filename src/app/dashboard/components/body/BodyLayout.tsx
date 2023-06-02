const BodyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className=" flex flex-col pl-16 pr-12  py-2 bg-[#333333] w-full min-h-screen max-[545px]:absolute max-[545px]:pb-3 max-[545px]:pr-4 max-[545px]:pl-5 z-10 ">
      {children}
    </section>
  );
};

export default BodyLayout;
