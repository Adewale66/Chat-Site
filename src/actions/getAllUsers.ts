export async function getUsers() {
  const res = await fetch("/api/user");
  return await res.json();
}
