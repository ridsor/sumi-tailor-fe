import { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./style.css";
import Order from "./OrderItem";
import Pagination from "@/components/fragments/Pagination";
import OrderLoading from "./OrderLoading";
import OrdersItemLoading from "./OrdersItemLoading";
import { useAppSelector } from "@/lib/redux/hooks";

interface Props {
  isLoading: boolean;
  onCancel: (item_code: string) => void;
  onStatusChange: (item_code: string) => void;
}

export default function OrderList(props: Props) {
  const ordersItemLoading = useAppSelector(
    (state) => state.orders.ordersItemLoading
  );
  const ordersFinished = useAppSelector((state) => state.orders.ordersFinished);
  const ordersUnfinished = useAppSelector(
    (state) => state.orders.ordersUnfinished
  );

  const sliderSettings = useMemo(
    () => ({
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      infinite: false,
    }),
    []
  );

  return (
    <Slider {...sliderSettings}>
      {ordersUnfinished.loading || props.isLoading ? (
        <OrderLoading />
      ) : (
        <div className="orders unfinished !flex flex-col gap-2 w-full pb-10 p-1">
          {ordersItemLoading ? (
            <OrdersItemLoading />
          ) : ordersUnfinished.data.length > 0 ? (
            ordersUnfinished.data.map((order) => (
              <Order
                key={order.item_code}
                order={order}
                onCancel={props.onCancel}
                onStatusChange={props.onStatusChange}
              />
            ))
          ) : (
            <>Data Pesanan tidak ditemukan</>
          )}
          <Pagination
            totalPages={Math.ceil(
              Number(ordersUnfinished.pagination.total) /
                Number(ordersUnfinished.pagination.limit)
            )}
            page={Number(ordersUnfinished.pagination.page)}
          />
        </div>
      )}
      {ordersFinished.loading || props.isLoading ? (
        <OrderLoading />
      ) : (
        <div className="orders finished !flex flex-col gap-2 pb-10 w-full p-1">
          {ordersItemLoading ? (
            <OrdersItemLoading />
          ) : ordersFinished.data.length > 0 ? (
            ordersFinished.data.map((order) => (
              <Order
                key={order.item_code}
                order={order}
                onCancel={props.onCancel}
                onStatusChange={props.onStatusChange}
              />
            ))
          ) : (
            <>Data Pesanan tidak ditemukan</>
          )}
          <Pagination
            totalPages={Math.ceil(
              Number(ordersFinished.pagination.total) /
                Number(ordersFinished.pagination.limit)
            )}
            page={Number(ordersFinished.pagination.page)}
          />
        </div>
      )}
    </Slider>
  );
}
