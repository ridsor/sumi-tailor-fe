"use server";

import { OrderType, PaginationType } from "@/lib/redux/features/ordersSlice";
import { getToken } from "./token";
import { cookies } from "next/headers";
import { OrderInput } from "@/app/(admin)/orders/OrderInput";

export const getOrders = async ({
  page = 1,
  limit = 5,
  status,
  search,
}: {
  page?: number;
  limit?: number;
  status: string;
  search: string;
}): Promise<{
  data: OrderType[];
  pagination: PaginationType;
}> => {
  const refreshToken = await getToken();

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/api/orders?status=${status}&page=${page}&limit=${limit}&search=${search}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${refreshToken?.authorization.access_token}`,
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

export const getOrderById = async (item_code: string, token: string = "") => {
  const refreshToken = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${item_code}?token=${token}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + refreshToken.authorization.access_token,
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

export const getRegisterOrder = async () => {
  const token = await getToken();

  if (token.status !== "success") {
    throw new Error("Failed to fetch");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/register-order`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + token.authorization.access_token,
        Cookie: ("refreshToken=" +
          cookies().get("refreshToken")?.value) as string,
      },
    }
  );

  if (res.status != 200) {
    throw new Error("Failed to fetch");
  }

  const register_order = await res.json();
  return register_order.data.register_order_token;
};

export const resetRegisterOrder = async () => {
  const token = await getToken();

  if (token.status !== "success") {
    throw new Error("Failed to fetch");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/register-order`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + token.authorization.access_token,
        Cookie: ("refreshToken=" +
          cookies().get("refreshToken")?.value) as string,
      },
    }
  );

  if (res.status != 200) {
    throw new Error("Failed to fetch");
  }

  const register_order = await res.json();
  return register_order.data.token;
};

export const createOrder = async (inputs: OrderInput) => {
  const token = await getToken();

  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/orders",
    {
      method: "POST",
      body: JSON.stringify(inputs),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token?.authorization.access_token,
      },
    }
  );

  if (response.json) {
    return response.json();
  }
};
