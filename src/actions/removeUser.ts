export async function removeMember({
  id,
  groupId,
}: {
  id: string;
  groupId: string;
}) {
  await fetch(`/api/user/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      groupId: groupId,
    }),
  });
}
