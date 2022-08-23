export async function login(email: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await res.json();

  if (json.access_token) {
    localStorage.setItem("jwt", json.access_token);
  }
  return json;
}
