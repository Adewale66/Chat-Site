export async function addGroup(channelName: {
  name: string;
  description: string;
}) {
  await fetch("/api/channel", {
    method: "POST",
    body: JSON.stringify(channelName),
  });
}
