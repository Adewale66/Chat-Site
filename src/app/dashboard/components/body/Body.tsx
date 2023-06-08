import Message from "./Message";
import { MessageProp } from "@/types/type";

const Body = ({
  messages,
  title,
}: {
  messages: MessageProp[] | undefined;
  title: string;
}) => {
  return (
    <section className="flex flex-col gap-4 w-full">
      <header className="text-[#E0E0E0] text-base font-bold uppercase max-[575px]:pl-6">
        {title}
      </header>
      <section className="flex flex-col gap-5">
        {messages &&
          messages.map((m) => (
            <Message
              key={m.id}
              message={m.message}
              time={m.createdAt}
              user={m.user.name}
            />
          ))}
      </section>
    </section>
  );
};

export default Body;
