"use server";

import { cookies } from "next/headers";
import { getToken } from "./token";

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
      cache: "no-store",
    }
  );

  const json = await res.json();

  if (res.ok) {
    // set refreshToken
    cookies().set({
      name: "refreshToken",
      value: json.refresh_token.token,
      secure: true,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return json;
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
        Authorization: `Bearer ${token.authorization.access_token}`,
      },
      cache: "no-store",
    }
  );

  if (response.ok) {
    cookies().delete("refreshToken");
    return response.json();
  }
};

export const fetchAuth = async () => {
  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/auth/me",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + cookies().get("refreshToken")?.value,
      },
      cache: "no-store",
      credentials: "include",
    }
  );

  if (response.ok) {
    return response.json();
  }
};
