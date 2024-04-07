"use server";

import { OrderType, PaginationType } from "@/lib/redux/features/ordersSlice";
import { getToken } from "./auth";

export const getOrders = async ({
  token,
  page = 1,
  limit = 5,
  status,
  search,
}: {
  token: string;
  page?: number;
  limit?: number;
  status: string;
  search: string;
}): Promise<{
  data: OrderType[];
  pagination: PaginationType;
}> => {
  const refreshToken = await getToken(token);

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/api/orders?status=${status}&page=${page}&limit=${limit}&search=${search}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
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

export const getOrderById = async (
  item_code: string,
  token: string = "",
  refreshToken: string
) => {
  const newToken = await getToken(refreshToken);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${item_code}?token=${token}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + newToken,
      },
      cache: "no-store",
    }
  ).catch((e) => {
    throw e;
  });

  if (res.status == 403) {
    throw new Error("Authorization");
  }

  if (res.status != 200) {
    throw new Error("Failed to fetch data");
  }
  const order = await res.json();

  return order.data;
};

export const getRegisterOrder = async (refreshToken: string) => {
  const token = await getToken(refreshToken);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/register-order`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (res.status != 200) {
    throw new Error("Failed to fetch");
  }

  const register_order = await res.json();
  return register_order.data.register_order_token;
};

export const resetRegisterOrder = async (refreshToken: string) => {
  const token = await getToken(refreshToken);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/register-order`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (res.status != 200) {
    throw new Error("Failed to fetch");
  }

  const register_order = await res.json();
  return register_order.data.token;
};
