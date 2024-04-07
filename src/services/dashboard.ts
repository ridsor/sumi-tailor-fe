"use server";

import { getToken } from "./auth";

export const getDashboard = async (refreshToken: string) => {
  const token = await getToken(refreshToken);

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/dashboard`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok && res.status != 200) {
    throw new Error("Failed to fetch data");
  }

  const result = await res.json();

  return result.data;
};
