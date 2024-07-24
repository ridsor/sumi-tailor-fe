import { getOrderHistory } from "@/services/orders";
import OrderList from "./OrderList";
import { OrderHistoryType } from "@/types/order";
import { PaginateType } from "@/types/paginate";

export default async function WrapperOrderList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = isNaN(Number(searchParams["page"]))
    ? 1
    : Number(searchParams["page"]);

  const limit = isNaN(Number(searchParams["limit"]))
    ? 8
    : Number(searchParams["limit"]);

  const search = searchParams["s"] ?? "";

  let orders: {
    data: OrderHistoryType[];
    paginate: PaginateType;
  } = {
    data: [],
    paginate: {
      page: 1,
      limit: 6,
      total: 1,
    },
  };

  try {
    orders = await getOrderHistory({ page, limit, search: search as string });
  } catch (e) {
    console.error(e);
  }

  return <OrderList orders={orders} />;
}
