import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { IconContext } from "react-icons/lib";
import { AiOutlinePlus } from "react-icons/ai";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

interface Props<T> {
  children: React.ReactNode;
  func: (data: T) => Promise<void>;
  data: T;
  clearData: () => void;
  invalidate: string;
  title: string;
}

export default function MyModal<T>({
  children,
  func,
  title,
  data,
  clearData,
  invalidate,
}: Props<T>) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const mutation = useMutation(func, {
    onSuccess: () => {
      toast.success("Success");
      queryClient.invalidateQueries(invalidate);
    },
    onSettled: () => {
      setIsOpen(false);
      setLoading(false);
    },
    onError: () => {
      toast.error("Error");
    },
  });

  console.log(loading);

  function itemsNotEmpty(data: T) {
    for (const k in data) {
      if (!data[k]) return false;
    }
    return true;
  }

  async function closeModal() {
    setLoading(true);

    if (itemsNotEmpty(data)) {
      await mutation.mutateAsync(data);
    } else {
      setIsOpen(false);
      setLoading(false);
    }
  }

  function handleClose() {
    clearData();
    setIsOpen(false);
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
        <button
          className="bg-[#3C393F]  p-2 max-w-[35px] flex justify-center rounded-lg"
          onClick={openModal}
        >
          <AiOutlinePlus />
        </button>
      </IconContext.Provider>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={handleClose}>
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
                <Dialog.Panel className="w-full max-w-md overflow-y-auto transform overflow-hidden rounded-2xl bg-[#120F13] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-bold leading-6 uppercase text-white"
                  >
                    New {title}
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
