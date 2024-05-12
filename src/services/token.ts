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
      next: {
        revalidate: 3600 * 24,
      },
    }
  );

  if (response.ok) {
    return response.json();
  }
};
