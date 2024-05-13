import { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./style.css";
import Order from "./OrderItem";
import Pagination from "@/components/fragments/Pagination";
import { useAppSelector } from "@/lib/redux/hooks";
import "lightbox.js-react/dist/index.css";
import OrdersLoading from "./OrdersLoading";

interface Props {
  isLoading: boolean;
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
      {ordersUnfinished.loading || ordersItemLoading || props.isLoading ? (
        <OrdersLoading />
      ) : (
        <div className="orders unfinished !flex flex-col gap-2 w-full pb-10 p-1">
          {ordersUnfinished.data.length > 0 ? (
            <div className="columns-[350px] lg:columns-2 gap-3">
              {ordersUnfinished.data.map((order) => (
                <Order key={order.item_code} order={order} />
              ))}
            </div>
          ) : (
            <h2 className="font-semibold text-base my-10 text-center">
              Data Pesanan tidak ditemukan
            </h2>
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
      {ordersFinished.loading || ordersItemLoading || props.isLoading ? (
        <OrdersLoading />
      ) : (
        <div className="orders finished !flex flex-col gap-2 pb-10 w-full p-1">
          {ordersFinished.data.length > 0 ? (
            <div className="columns-[350px] lg:columns-2 gap-3">
              {ordersFinished.data.map((order) => (
                <Order key={order.item_code} order={order} />
              ))}
            </div>
          ) : (
            <h2 className="font-semibold text-base my-10 text-center">
              Data Pesanan tidak ditemukan
            </h2>
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
