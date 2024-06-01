"use server";

import { getToken } from "./token";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

export interface InputsLogin {
  email: string;
  password: string;
  remember_me: boolean;
}

export const login = async (inputs: InputsLogin) => {
  const res = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    }
  );

  if (res.ok) {
    revalidateTag("auth");

    return res.json();
  }
};

export const logout = async () => {
  const token = await getToken();

  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/auth/logout",
    {
      method: "PUT",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token?.authorization.access_token}`,
      },
    }
  );

  if (response.ok) {
    revalidateTag("auth");
    return response.json();
  }
};

export const fetchAuth = async () => {
  const session = await getServerSession(authOption);
  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/auth/me",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user.refreshToken}`,
      },
      next: {
        revalidate: 60,
        tags: ["auth"],
      },
    }
  );

  if (response.ok) {
    return response.json();
  }
};
