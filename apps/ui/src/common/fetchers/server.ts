import { cookies } from "next/headers";

export interface ServerFetchResult<T> {
  data: T | null;
  status: number;
  ok: boolean;
}

export const serverFetch = async <T extends object = object>(
  url: string,
  method?: string,
  body?: object | null,
  headers?: HeadersInit | null
): Promise<ServerFetchResult<T>> => {
  const _cookies = await cookies();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: method ?? "GET",
    credentials: "include",
    cache: "no-store",
    body: body ? JSON.stringify(body) : null,
    headers: {
      cookie: `${_cookies}`,
      "Content-Type": "application/json",
      ...headers,
    },
  });
  return { data: await response.json(), status: response.status, ok: response.ok };
};
