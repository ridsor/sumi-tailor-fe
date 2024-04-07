"use server";

export const getToken = async (refreshToken: string) => {
  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/auth/refresh",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + refreshToken,
      },
      cache: "no-store",
    }
  ).catch((err) => {
    console.log(err);
  });

  if (response?.ok) {
    const data = await response.json();

    return data.authorization.access_token;
  }
};

export const getUser = async (refreshToken: string) => {
  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/auth/me",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + refreshToken,
      },
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const logout = async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  )
    .then((res) => res.json())
    .catch((e) => {
      throw e;
    });

  return res;
};
