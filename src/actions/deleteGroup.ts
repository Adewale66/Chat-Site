export async function deleteGroup(id: string) {
  await fetch(`/api/group/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
