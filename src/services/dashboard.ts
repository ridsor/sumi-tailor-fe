"use server";

import { getToken } from "./token";

export const getDashboard = async () => {
  const refreshToken = await getToken();

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/dashboard`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${refreshToken?.authorization.access_token}`,
    },
    next: {
      revalidate: 3600 * 12,
    },
  });
  if (!res.ok && res.status != 200) {
    throw new Error("Failed to fetch data");
  }

  const result = await res.json();

  return result;
};
