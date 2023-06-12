export async function getMessages(id: string) {
  const res = await fetch(`/api/message/${id}`);
  return await res.json();
}
