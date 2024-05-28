"use server";

import { revalidateTag } from "next/cache";
import { getToken } from "./token";

export interface User {
  id: string;
  name: string;
  email: string;
}

export const getUsers = async (search: string = ""): Promise<User[]> => {
  const refreshToken = await getToken();

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/api/users?search=` + search,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${refreshToken?.authorization.access_token}`,
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

export const editProfile = async (user_id: string, formData: FormData) => {
  const token = await getToken();

  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/users/" + user_id,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token?.authorization.access_token,
      },
    }
  );

  if (response.status == 400) {
    return response.json();
  }

  if (response.status != 200) {
    console.error("Failed to edited");
    return;
  }

  revalidateTag("auth");

  return response.json();
};
