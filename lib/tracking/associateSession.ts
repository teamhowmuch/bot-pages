type AssociateSessionOptions = { user_email?: string };

export async function associateSession(options?: AssociateSessionOptions) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/tracking/associate`,
    {
      method: "POST",
      body: JSON.stringify(options),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
