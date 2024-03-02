"use server";

import { getToken } from "./token";

export interface TypeOrders {
  id: number;
  item_code: number;
  name: string;
  email: string;
  nohp: "";
  address: "";
  price: number | null;
  description: string | null;
  finished: number;
  created_at: string | number;
  updated_at: string | number;
}

export interface TypePagination {
  limit: number;
  total: number;
  page: number;
}

export const getOrders = async ({
  page = 1,
  limit = 5,
  status,
}: {
  page?: number;
  limit?: number;
  status: string;
}): Promise<{
  data: TypeOrders[];
  pagination: TypePagination;
}> => {
  const refreshToken = await getToken();

  if (refreshToken.status != "success") {
    throw new Error("Failed to logout");
  }

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/api/orders?status=${status}&page=${page}&limit=${limit}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${refreshToken.authorization.access_token}`,
      },
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok && res.status != 200) {
    throw new Error("Failed to fetch data");
  }

  const orders = await res.json();

  return {
    data: orders.data,
    pagination: {
      page: orders.page,
      limit: orders.limit,
      total: orders.total,
    },
  };
};
