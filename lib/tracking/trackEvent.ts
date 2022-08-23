type CreateEventOptions = {
  action?: string;
  category?: string;
  data?: { [key: string]: any };
};

export async function trackEvent(options: CreateEventOptions) {
  const body = {
    source: "Gretabot Results Toner",
    page_title: document ? document.title : null,
    url: window ? window.location.href : null,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV,
    data: {
      ...options.data,
    },
    ...options,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/tracking/events`,
    {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res;
}
