export const getGroup = async (groupName: string) => {
  const group = await fetch(`/api/group/${groupName}`);
  return await group.json();
};

export const getGroups = async () => {
  const groups = await fetch("/api/group");
  return await groups.json();
};
