"use server";

import { revalidateTag } from "next/cache";
import { getToken } from "./token";
import { UserType } from "@/types/user";

export const getUsers = async (search: string = ""): Promise<UserType[]> => {
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
        tags: ["user"],
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
  revalidateTag("user");

  return response.json();
};

export const registerUser = async (inputs: {
  name: string;
  email: string;
  password: string;
}) => {
  const token = await getToken();

  const body = JSON.stringify({
    name: inputs.name,
    email: inputs.email,
    password: inputs.password,
  });

  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token?.authorization.access_token,
      },
      body,
    }
  );

  if (response.status != 201) {
    throw new Error("Failed to register");
  }

  revalidateTag("user");

  return response.json();
};

export const editUser = async (
  user_id: string,
  inputs: {
    name: string;
    email: string;
  }
) => {
  const token = await getToken();

  const body = JSON.stringify({
    name: inputs.name,
    email: inputs.email,
  });

  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/users/" + user_id,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token?.authorization.access_token,
      },
      body,
    }
  );

  if (response.status != 200) {
    console.error("Failed to edited");
    return;
  }

  revalidateTag("user");
  revalidateTag("auth");

  return response.json();
};

export const deleteUser = async (user_id: string) => {
  const token = await getToken();

  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/auth/delete/" + user_id,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token.authorization.access_token,
      },
    }
  );

  if (response.status != 200) {
    console.error("Failed to delete");
    return;
  }

  revalidateTag("user");

  return response.json();
};
