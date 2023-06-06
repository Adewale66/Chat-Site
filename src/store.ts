import { create } from "zustand";
import { GroupType } from "./app/dashboard/components/sidebar/SidebarContent";

interface Props {
  groups: GroupType[];
  setGroups: (groups: GroupType[]) => void;
}

const useStore = create<Props>((set) => ({
  groups: [],
  setGroups: (groups) => set(() => ({ groups })),
}));

export default useStore;
