import { GroupType } from "@/types/type";

export const getGroup = async () => {
  const res = await fetch("/api/channel");
  const data = await res.json();
  return [...data];
};
