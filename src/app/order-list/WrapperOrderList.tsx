import { getOrders } from "@/services/orders";
import OrderList from "./OrderList";
import { OrderType } from "@/types/order";
import { PaginateType } from "@/types/paginate";

export default async function WrapperOrderList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const ofpage = isNaN(Number(searchParams["ofpage"]))
    ? 1
    : Number(searchParams["ofpage"]);
  const oupage = isNaN(Number(searchParams["oupage"]))
    ? 1
    : Number(searchParams["oupage"]);
  const limit = isNaN(Number(searchParams["limit"]))
    ? 6
    : Number(searchParams["limit"]);
  const search = searchParams["s"] ?? "";

  let ordersFinished: {
    data: OrderType[];
    paginate: PaginateType;
  } = {
    data: [],
    paginate: {
      page: 1,
      limit: 6,
      total: 1,
    },
  };
  let ordersUnfinished: {
    data: OrderType[];
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
    ordersUnfinished = await getOrders({
      page: oupage,
      limit,
      status: "isProcess",
      search: search as string,
    });

    ordersFinished = await getOrders({
      page: ofpage,
      limit,
      status: "isFinished",
      search: search as string,
    });
  } catch (e) {
    console.error(e);
  }

  return (
    <OrderList
      ordersFinished={ordersFinished}
      ordersUnfinished={ordersUnfinished}
    />
  );
}
