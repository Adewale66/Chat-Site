import { deleteGroup } from "@/actions/deleteGroup";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import { IconContext } from "react-icons";
import { AiOutlineDelete } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";

export default function DeleteGroup({
  groupId,
  groupName,
}: {
  groupId: string;
  groupName: string;
}) {
  let [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteGroup, {
    onSettled: () => {
      setIsOpen(false);
    },
    onSuccess: () => {
      toast.success("Group deleted");
      queryClient.invalidateQueries("groups");
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Error deleting group");
    },
  });

  async function closeModal() {
    setIsOpen(false);
  }
  async function deleteGroupfromDb() {
    await mutation.mutateAsync(groupId);
  }
  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="mt-auto w-full">
      <IconContext.Provider
        value={{
          size: "2rem",
          color: "red",
        }}
      >
        <button
          className="flex justify-center items-center w-full"
          onClick={openModal}
        >
          <AiOutlineDelete />
        </button>
      </IconContext.Provider>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                    className="text-lg font-medium leading-6 text-red-500"
                  >
                    Delete Group?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete{" "}
                      <span className="font-bold ">{groupName}?</span>
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={deleteGroupfromDb}
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
    </div>
  );
}
