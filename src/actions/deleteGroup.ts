export async function deleteGroup(data: string) {
  await fetch(`/api/group?id=${data}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
