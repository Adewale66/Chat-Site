"use client";

import { addNewMessage } from "@/actions/addNewMessage";
import { AiOutlineSend } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useMutation, useQueryClient } from "react-query";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { pusherClient } from "@/libs/pusherlib";
import { MessageProp } from "@/types/type";

const InputMessage = ({ groupId }: { groupId: string | undefined }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newMessage: { message: string; groupId: string }) => {
      return addNewMessage(newMessage);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("messages");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
      onSettled: () => {
        setMessage("");
        setIsSending(false);
      },
    }
  );

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const channel = pusherClient.subscribe(groupId!);

    channel.bind("new-message", (data: any) => {
      queryClient.setQueryData(
        "messages",
        (prevData: MessageProp[] | undefined) => {
          if (prevData) return [...prevData, data];
          return [data];
        }
      );
    });

    return () => {
      channel.unbind("new-message");
      pusherClient.unsubscribe("messages");
      pusherClient.disconnect();
    };
  }, [queryClient, groupId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    if (groupId && message) {
      mutation.mutate({
        message,
        groupId,
      });
    } else {
      setIsSending(false);
      toast.error("Server error");
    }
  };
  return (
    <div className=" mt-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-[#3C393F] flex items-center justify-between p-2 rounded-md shadow-md"
      >
        <input
          disabled={isSending}
          value={message}
          type="text"
          placeholder="Type a message here "
          className="w-full bg-transparent pl-2 outline-none text-white"
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconContext.Provider value={{ size: "1.2rem", color: "white" }}>
          <button
            disabled={isSending || !message}
            type="submit"
            className="bg-[#2F80ED] p-2 rounded-md hover:cursor-pointer"
          >
            <AiOutlineSend />
          </button>
        </IconContext.Provider>
      </form>
    </div>
  );
};

export default InputMessage;
