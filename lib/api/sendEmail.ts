export async function sharePartner(email: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/email/share`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 201) {
    return true;
  } else {
    console.error(res);
  }
}
