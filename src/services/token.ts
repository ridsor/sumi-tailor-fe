"use server";

import { cookies } from "next/headers";

export const getToken = async () => {
  const refreshTokenCookie = cookies().get("refreshToken");

  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/auth/refresh",
    {
      method: "POST",
      headers: {
        Cookie: "refreshToken=" + refreshTokenCookie?.value,
      },
      credentials: "include",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });

  return response;
};

export const getUser = async () => {
  const refreshTokenCookie = cookies().get("refreshToken");

  const response: Response = (await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/auth/me",
    {
      method: "GET",
      headers: {
        Cookie: "refreshToken=" + refreshTokenCookie?.value,
      },
      credentials: "include",
    }
  ).catch((err) => {
    throw err;
  })) as Response;

  return response;
};
