"use server";

import { cookies } from "next/headers";

export const getToken = async () => {
  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/auth/refresh",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + cookies().get("refreshToken")?.value,
      },
      cache: "no-store",
    }
  ).then((res) => {
    return res.json();
  });

  return response;
};
