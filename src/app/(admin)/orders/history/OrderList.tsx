"use client";

import React from "react";
import OrderItem from "@/app/(admin)/orders/history/OrderItem";
import Paginate from "@/components/fragments/Pagination";
import "yet-another-react-lightbox/styles.css";
import { PaginateType } from "@/types/paginate";
import { OrderHistoryType } from "@/types/order";

interface Props {
  orders: {
    data: OrderHistoryType[];
    paginate: PaginateType;
  };
}

export default function OrderList(props: Props) {
  return (
    <div className="orders !flex flex-col gap-2 w-full pb-10 p-1">
      {props.orders.data.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-3">
            {props.orders.data.map((order) => (
              <OrderItem key={order.item_code} order={order} />
            ))}
          </div>
          <Paginate
            className="mt-3"
            totalPages={Math.ceil(
              Number(props.orders.paginate.total) /
                Number(props.orders.paginate.limit)
            )}
            page={Number(props.orders.paginate.page)}
          />
        </>
      ) : (
        <h2 className="font-semibold text-base my-10 text-center">
          Data Pesanan tidak ditemukan
        </h2>
      )}
    </div>
  );
}
