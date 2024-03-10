"use server";

import { OrderType, PaginationType } from "@/lib/redux/features/ordersSlice";
import { getToken } from "./token";

export const getOrders = async ({
  page = 1,
  limit = 5,
  status,
}: {
  page?: number;
  limit?: number;
  status: string;
}): Promise<{
  data: OrderType[];
  pagination: PaginationType;
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
