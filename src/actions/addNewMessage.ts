export async function addNewMessage(data: {
  message: string;
  groupId: string;
}) {
  const res = await fetch(`/api/message`, {
    method: "POST",
    body: JSON.stringify({ message: data.message, groupId: data.groupId }),
  });
  return await res.json();
}
