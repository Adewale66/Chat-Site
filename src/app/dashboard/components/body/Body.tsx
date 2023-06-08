import Message from "./Message";
import { MessageProp } from "@/types/type";
import React, { useRef, useEffect } from "react";

const Body = ({
  messages,
  title,
}: {
  messages: MessageProp[] | undefined;
  title: string;
}) => {
  const scrollableDivRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
  }, [messages]);

  return (
    <section className="flex flex-col gap-4 w-full">
      <header className="text-[#E0E0E0] text-base font-bold uppercase max-[575px]:pl-6 pt-4">
        {title}
      </header>
      <hr className="border-[#E0E0E0] border-1 max-[575px]:pl-6" />
      <section
        ref={scrollableDivRef}
        className="flex flex-col gap-5 overflow-y-auto h-[580px] max-[575px]:h-[590px]"
      >
        {messages &&
          messages.map((m) => (
            <Message
              key={m.id}
              length={messages.length}
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
