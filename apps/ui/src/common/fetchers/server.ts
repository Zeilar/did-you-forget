import { cookies } from "next/headers";

interface ServerFetchResult<T> {
  data: T | null;
  status: number;
}

export const serverFetch = async <T extends object = object>(
  url: string,
  body?: object,
  headers?: HeadersInit
): Promise<ServerFetchResult<T>> => {
  const _cookies = await cookies();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    credentials: "include",
    body: body ? JSON.stringify(body) : null,
    headers: {
      cookie: `${_cookies}`,
      "Content-Type": "application/json",
      ...headers,
    },
  });
  return { data: await response.json(), status: response.status };
};
