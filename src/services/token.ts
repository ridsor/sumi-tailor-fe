"use server";

import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getToken = async () => {
  const session = await getServerSession(authOption);

  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/auth/refresh",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session?.user.refreshToken,
      },
      next: {
        revalidate: 60,
      },
    }
  );

  if (response.ok) {
    return response.json();
  }
};
