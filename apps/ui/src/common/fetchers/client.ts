export interface ServerFetchResult<T> {
  data: T | null;
  status: number;
  ok: boolean;
}

export const clientFetch = async <T extends object = object>(
  url: string,
  method?: string,
  body?: object,
  headers?: HeadersInit
): Promise<ServerFetchResult<T>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: method ?? "GET",
    credentials: "include",
    body: body ? JSON.stringify(body) : null,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  let data: T | null = null;
  if (response.status !== 204) {
    try {
      data = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
  return { data, status: response.status, ok: response.ok };
};
