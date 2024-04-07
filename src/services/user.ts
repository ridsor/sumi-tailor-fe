"use server";

import { getToken } from "./auth";

export interface User {
  id: string;
  name: string;
  email: string;
  status: string;
}

export const getUsers = async (
  refreshToken: string,
  search: string = ""
): Promise<User[]> => {
  const token = await getToken(refreshToken);

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/api/users?search=` + search,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok && res.status != 200) {
    throw new Error("Failed to fetch data");
  }

  const users = await res.json();

  return users.data;
};
