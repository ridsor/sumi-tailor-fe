"use server";

import { cookies } from "next/headers";
import { getToken } from "./token";

export interface User {
  id: string;
  name: string;
  email: string;
  status: string;
}

export const getUsers = async (): Promise<User[]> => {
  const refreshToken = await getToken();

  if (refreshToken.status != "success") {
    throw new Error("Failed to fetch data");
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/users`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${refreshToken.authorization.access_token}`,
      Cookie: "refreshToken=" + cookies().get("refreshToken")?.value,
    },
    next: {
      revalidate: 0,
    },
  });

  if (!res.ok && res.status != 200) {
    throw new Error("Failed to fetch data");
  }

  const users = await res.json();

  return users.data;
};
