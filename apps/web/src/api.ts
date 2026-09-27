export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
export const CURRENT_USER_ID = "user-1";

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      "x-user-id": CURRENT_USER_ID,
      ...options.headers,
    },
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message ?? "Не удалось выполнить запрос");
  return body as T;
}
