export async function addNewMessage(data: {
  message: string;
  groupId: string;
}) {
  const res = await fetch("/api/message", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return await res.json();
}
