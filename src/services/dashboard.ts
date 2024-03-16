"use server";

import { getToken } from "./token";

export const getDashboard = async () => {
  const refreshToken = await getToken();

  if (refreshToken.status != "success") {
    throw new Error("Failed to fetch data");
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/dashboard`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${refreshToken.authorization.access_token}`,
    },
    cache: "no-store",
  });

  if (!res.ok && res.status != 200) {
    throw new Error("Failed to fetch data");
  }

  const result = await res.json();

  return result;
};
