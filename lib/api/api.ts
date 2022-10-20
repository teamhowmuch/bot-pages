import { JWT_KEY } from "../contants";

type BaseApiOptions = Pick<RequestInit, "method" | "body" | "headers">;

function headers(options?: { [key: string]: any }) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const token = localStorage.getItem(JWT_KEY);
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      headers.append(key, value);
    });
  }
  return headers;
}

export class ApiError {
  constructor(
    public url: string,
    public status: number,
    public statusText: string,
    public error?: any
  ) {
    if (this.status >= 500) {
      console.log("API error", this.url, `[${this.status}]`, this.statusText);
      console.log(this.error);
    }
  }
}

export async function api<T>(
  path: string,
  options?: BaseApiOptions
): Promise<T> {
  const method = options?.method || "GET";
  const url = new URL(path, process.env.NEXT_PUBLIC_API_HOST);

  const init: RequestInit = {
    method,
    headers: headers(options?.headers),
  };

  if (options?.body) {
    init.body = options.body;
  }

  try {
    const res = await fetch(url, init);
    let json;

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      json = await res.json();
    }

    if (res.ok) {
      if (json) {
        return json;
      } else {
        return true as any;
      }
    } else if (json) {
      throw new ApiError(url.toString(), res.status, res.statusText, json);
    } else {
      throw new ApiError(url.toString(), res.status, res.statusText);
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(url.toString(), 500, "ApiClient error", error);
  }
}
