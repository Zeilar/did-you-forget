export interface ClientFetchResult<T> {
  data: T;
  status: number;
  ok: boolean;
}

export const clientFetch = async <T extends object | null = null>(
  url: string,
  method?: string,
  body?: object,
  headers?: HeadersInit
): Promise<ClientFetchResult<T>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: method ?? "GET",
    credentials: "include",
    body: body ? JSON.stringify(body) : null,
    next: { tags: [url] },
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  let data = null as T;
  if (response.status !== 204) {
    try {
      data = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
  return { data, status: response.status, ok: response.ok };
};
