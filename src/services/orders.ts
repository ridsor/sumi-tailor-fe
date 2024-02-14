"use server";

export interface Order {
  id: number;
  item_code: number;
  name: string;
  nohp: "";
  address: "";
  price: number | null;
  description: string | null;
  finished: number;
  created_at: string | number;
  updated_at: string | number;
}

interface Pagination {
  totalItems: number;
  totalPages: number;
  page: number;
}

export const getOrders = async ({
  page = 1,
  totalItems = 10,
  status,
}: {
  page?: number;
  totalItems?: number;
  status: string;
}): Promise<{
  data: Order[];
  pagination: Pagination;
}> => {
  const res = await fetch(
    process.env.BACKEND_URL + `/orders?_page=${page}&_per_page=${totalItems}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return {
    data: data.data,
    pagination: {
      totalItems: totalItems as number,
      totalPages: data.pages,
      page: page as number,
    },
  };
};
