export async function addGroup(channelName: { name: string }) {
  await fetch("/api/group", {
    method: "POST",
    body: JSON.stringify(channelName),
  });
}
