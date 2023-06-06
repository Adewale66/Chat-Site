"use client";

import { useQuery } from "react-query";
import Message from "./Message";
import { getGroup } from "@/actions/getGroups";
import { useMemo } from "react";

interface UserProp {
  name: string;
}

interface MessageProp {
  id: string;
  message: string;
  createdAt: string;
  user: UserProp;
}

interface Props {
  id: string;
  title: string;
  messages: MessageProp[];
}

const Body = ({ id }: { id: string | undefined }) => {
  const { isLoading, data } = useQuery<Props[]>("data", getGroup);
  const messages = useMemo<Props | undefined>(
    () => data?.find((d) => d.id === id),
    [data, id]
  );
  console.log(messages);

  console.log(data);

  if (isLoading) return <p>lOadufn </p>;

  return (
    <section className="flex flex-col gap-4 w-full">
      <header className="text-[#E0E0E0] text-base font-bold uppercase max-[575px]:pl-6">
        {messages?.title}
      </header>
      <section className="flex flex-col gap-5">
        {messages?.messages &&
          messages.messages.map((m) => (
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
