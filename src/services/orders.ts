"use server";

import { PaginateType } from "@/types/paginate";
import { getToken } from "./token";
import { revalidateTag } from "next/cache";
import { OrderHistoryType, OrderType } from "@/types/order";

export const getOrders = async ({
  page = 1,
  limit = 8,
  status,
  search,
}: {
  page?: number;
  limit?: number;
  status: string;
  search: string;
}): Promise<{
  data: OrderType[];
  paginate: PaginateType;
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
        tags: ["order"],
      },
    }
  );

  if (!res.ok && res.status != 200) {
    throw new Error("Failed to fetch data");
  }

  const orders = await res.json();

  return {
    data: orders.data,
    paginate: {
      page: orders.page,
      limit: orders.limit,
      total: orders.total,
    },
  };
};

export const getOrderById = async (
  item_code: string
): Promise<OrderType | undefined> => {
  const refreshToken = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${item_code}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + refreshToken?.authorization.access_token,
      },
      next: {
        revalidate: 60,
        tags: ["order"],
      },
    }
  );

  if (res.status == 200) {
    const order = await res.json();
    return order.data;
  }
};

export const getOrderHistoryById = async (
  item_code: string
): Promise<OrderHistoryType | undefined> => {
  const refreshToken = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/history/${item_code}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + refreshToken?.authorization.access_token,
      },
      next: {
        revalidate: 60,
        tags: ["order_history"],
      },
    }
  );

  if (res.status == 200) {
    const order = await res.json();
    return order.data;
  }
};

export const getOrderHistory = async ({
  page = 1,
  limit = 5,
  search,
}: {
  page?: number;
  limit?: number;
  search: string;
}): Promise<{
  data: OrderHistoryType[];
  paginate: PaginateType;
}> => {
  const refreshToken = await getToken();

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/api/orders/history?page=${page}&limit=${limit}&search=${search}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${refreshToken?.authorization.access_token}`,
      },
      next: {
        revalidate: 60,
        tags: ["order_history"],
      },
    }
  );

  if (!res.ok && res.status != 200) {
    throw new Error("Failed to fetch data");
  }

  const orders = await res.json();

  return {
    data: orders.data,
    paginate: {
      page: orders.page,
      limit: orders.limit,
      total: orders.total,
    },
  };
};

export const createOrder = async (formData: FormData) => {
  const token = await getToken();

  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/orders",
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token?.authorization.access_token,
      },
    }
  );
  console.log(response,token,(process.env.NEXT_PUBLIC_API_URL as string) + "/api/orders");
  if (response.status == 400) {
    return response.json();
  }

  if (response.status != 201) {
    console.error("Failed to created");
    return;
  }

  revalidateTag("order");

  return response.json();
};

export const editOrder = async (item_code: string, formData: FormData) => {
  const token = await getToken();

  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/orders/" + item_code,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token?.authorization.access_token,
      },
    }
  );

  if (response.json) {
    revalidateTag("order");
    return response.json();
  }
};

export const cancelOrder = async (item_code: string) => {
  const token = await getToken();

  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + "/api/orders/" + item_code,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + token.authorization.access_token,
      },
    }
  );

  if (response.status != 200) {
    console.error("Failed to cancel");
    return;
  }

  revalidateTag("order");
  revalidateTag("order_history");

  return response.json();
};

export const changeStatusOrder = async (item_code: string) => {
  const token = await getToken();

  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) +
      "/api/orders/" +
      item_code +
      "/status",
    {
      method: "PUT",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + token?.authorization.access_token,
      },
    }
  );

  if (response.status != 200) {
    console.error("Failed to cancel");
    return;
  }

  revalidateTag("order");

  return response.json();
};

export const orderConfirmation = async (item_code: string) => {
  const token = await getToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${item_code}/confirm`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + token?.authorization.access_token,
      },
    }
  );

  if (response.status != 200) {
    console.error("Failed to input");
    return;
  }

  revalidateTag("order");
  revalidateTag("order_history");

  return response.json();
};
