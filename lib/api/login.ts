export async function login(email: string, password: string) {
  console.log(process.env.NEXT_PUBLIC_API_HOST);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await res.json();
  console.log(json);
  if (json.access_token) {
    localStorage.setItem("jwt", json.access_token);
  }
  return json;
}
