export async function AddUserToGroup(data: {
  groupId: string;
  userId: string;
}) {
  await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
