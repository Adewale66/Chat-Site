import Message from "./Message";

const Body = () => {
  return (
    <section className="flex flex-col gap-4 w-full">
      <header className="text-[#E0E0E0] text-base font-bold uppercase max-[575px]:pl-6">
        Front end DEvelopers
      </header>
      <section className="flex flex-col gap-5">
        <Message />
        <Message />
        <Message />
        <Message />
      </section>
    </section>
  );
};

export default Body;
