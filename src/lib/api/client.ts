const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

type FetchOptions = RequestInit & {
  token?: string | undefined;
};

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, ...rest } = options;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...rest.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Unknown error" }));
    if (typeof error === "object" && error !== null && "message" in error) {
      const message = String((error as { message: unknown }).message);
      throw new Error(message || `HTTP ${res.status}`);
    }
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(endpoint: string, token?: string) =>
    apiFetch<T>(endpoint, { method: "GET", ...(token ? { token } : {}) }),
  post: <T>(endpoint: string, body: unknown, token?: string) =>
    apiFetch<T>(endpoint, { method: "POST", body: JSON.stringify(body), ...(token ? { token } : {}) }),
  patch: <T>(endpoint: string, body: unknown, token?: string) =>
    apiFetch<T>(endpoint, { method: "PATCH", body: JSON.stringify(body), ...(token ? { token } : {}) }),
  delete: <T>(endpoint: string, token?: string) =>
    apiFetch<T>(endpoint, { method: "DELETE", ...(token ? { token } : {}) }),
};
