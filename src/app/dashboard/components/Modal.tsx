import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { IconContext } from "react-icons/lib";
import { AiOutlinePlus } from "react-icons/ai";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

interface Props<T> {
  children: React.ReactNode;
  func: (data: T) => Promise<void>;
  data: T;
}

export default function MyModal<T>({ children, func, data }: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const mutation = useMutation(func, {
    onSuccess: () => {
      toast.success("Success");
    },
    onSettled: () => {
      setIsOpen(false);
      setLoading(false);
    },
    onError: () => {
      toast.error("Error");
    },
  });

  async function closeModal() {
    setLoading(true);
    await mutation.mutateAsync(data);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <IconContext.Provider
        value={{
          size: "1rem",
          color: "white",
        }}
      >
        <div
          className="bg-[#3C393F] hover:cursor-pointer p-2 rounded-lg"
          onClick={openModal}
        >
          <AiOutlinePlus />
        </div>
      </IconContext.Provider>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#120F13] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-bold leading-6 uppercase text-white"
                  >
                    New Channel
                  </Dialog.Title>
                  {children}
                  <div className="mt-4 w-full flex justify-end">
                    <button
                      disabled={loading}
                      type="button"
                      className={clsx(
                        "inline-flex justify-center   text-[#F2F2F2] rounded-md border border-transparent bg-[#2F80ED] px-4 py-2 text-sm font-medium  hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                        loading && "bg-blue-300"
                      )}
                      onClick={closeModal}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
