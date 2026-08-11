import type { User, UserFormData } from "./types";

const API_URL = "https://jsonplaceholder.typicode.com/users";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  // DELETE responses can have an empty body.
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const userApi = {
  getUsers: () => request<User[]>(API_URL),

  createUser: (data: UserFormData) =>
    request<User>(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateUser: (id: number, data: UserFormData) =>
    request<User>(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ id, ...data }),
    }),

  deleteUser: (id: number) =>
    request<void>(`${API_URL}/${id}`, {
      method: "DELETE",
    }),
};