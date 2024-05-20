import { PaginationType } from "@/lib/redux/features/ordersSlice";
import React from "react";
import OrdersLoading from "../OrdersLoading";
import OrderItem from "@/app/(admin)/orders/history/OrderItem";
import Paginate from "@/components/fragments/Pagination";
import { OrderHistory } from "@/lib/redux/features/orderHistorySlice";

interface Props {
  isLoading: boolean;
  orders: {
    data: OrderHistory[];
    pagination: PaginationType;
    loading: boolean;
  };
}

export default function OrderList(props: Props) {
  return props.orders.loading || props.isLoading ? (
    <OrdersLoading />
  ) : (
    <div className="orders unfinished !flex flex-col gap-2 w-full pb-10 p-1">
      {props.orders.data.length > 0 ? (
        <div className="flex flex-wrap">
          {props.orders.data.map((order) => (
            <OrderItem key={order.item_code} order={order} />
          ))}
        </div>
      ) : (
        <h2 className="font-semibold text-base my-10 text-center">
          Data Pesanan tidak ditemukan
        </h2>
      )}
      <Paginate
        className="mt-3"
        totalPages={Math.ceil(
          Number(props.orders.pagination.total) /
            Number(props.orders.pagination.limit)
        )}
        page={Number(props.orders.pagination.page)}
      />
    </div>
  );
}
