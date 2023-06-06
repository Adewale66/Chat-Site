"use client";

import { addNewMessage } from "@/actions/addNewMessage";
import { AiOutlineSend } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";

const InputMessage = ({ groupId }: { groupId: string | undefined }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newMessage: { message: string; groupId: string }) => {
      return addNewMessage(newMessage);
    },
    {
      onSuccess: () => {
        toast.success("Message sent");
        queryClient.invalidateQueries("data");
      },
      onError: (e) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    console.log(groupId);

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
