export const getGroup = async () => {
  const groups = await fetch("/api/group");
  return groups.json();
};
