export async function createChat(values: { [key: string]: any }) {
  const authToken = localStorage.getItem("jwt");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/chats`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  const json = await res.json();

  return json;
}
