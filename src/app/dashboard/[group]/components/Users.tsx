import { Dispatch, SetStateAction, useState } from "react";
import { Transition } from "@headlessui/react";
import { Userprops } from "@/types/type";

const SearchInputDropdown = ({
  options,
  groupId,
  setData,
}: {
  options: Userprops[] | undefined;
  groupId: string | undefined;
  setData: Dispatch<
    SetStateAction<{
      userId: string;
      groupId: string;
    }>
  >;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options?.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function filterUsers(name: string) {
    const filteredUser = options?.find((d) => d.name === name);

    setData({ groupId: groupId as string, userId: filteredUser?.id as string });
  }

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
    setIsOpen(true);
    setData({ groupId: "", userId: "" });
  };

  const handleOptionClick = (option: Userprops) => {
    setSearchTerm(option.name);
    setIsOpen(false);
    filterUsers(option.name);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
      />
      <Transition
        show={isOpen && filteredOptions && filteredOptions.length > 0}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-2">
          {filteredOptions?.map((option) => (
            <li
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer p-2 hover:bg-blue-100"
            >
              {option.name}
            </li>
          ))}
        </ul>
      </Transition>
    </div>
  );
};

export default SearchInputDropdown;
