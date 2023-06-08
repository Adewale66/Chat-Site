export async function addNewMessage(data: {
  message: string;
  groupId: string;
}) {
  const res = await fetch(`/api/message/${data.groupId}`, {
    method: "PATCH",
    body: JSON.stringify({ message: data.message }),
  });
  return await res.json();
}
