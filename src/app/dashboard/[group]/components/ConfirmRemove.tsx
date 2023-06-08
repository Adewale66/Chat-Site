"use client";

import { removeMember } from "@/actions/removeUser";
import { Userprops } from "@/types/type";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";

export default function ConfirmRemove({
  user,
  isOpen,
  setIsOpen,
  id,
}: {
  user: Userprops;
  isOpen: boolean;
  id: string | undefined;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation(removeMember, {
    onSettled: () => {
      setIsOpen(false);
    },
    onSuccess: () => {
      toast.success("User removed");
      queryClient.invalidateQueries("users");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  function closeModal() {
    setIsOpen(false);
  }

  async function removeUser() {
    if (id) await mutation.mutateAsync({ id: user.id, groupId: id });
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete {user.name}?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete{" "}
                      <span className="font-medium text-red-600">
                        {user.name}
                      </span>
                      ? This action can not be cancelled.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={removeUser}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      No
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
