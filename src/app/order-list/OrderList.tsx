import { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./style.css";
import Order from "./OrderItem";
import Pagination from "@/components/fragments/Pagination";
import "yet-another-react-lightbox/styles.css";
import OrdersLoading from "./OrdersLoading";
import { OrderType, PaginationType } from "@/lib/redux/features/ordersSlice";

interface Props {
  isLoading: boolean;
  ordersFinished: {
    data: OrderType[];
    pagination: PaginationType;
    loading: boolean;
  };
  ordersUnfinished: {
    data: OrderType[];
    pagination: PaginationType;
    loading: boolean;
  };
}

export default function OrderList(props: Props) {
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
      {props.ordersUnfinished.loading || props.isLoading ? (
        <OrdersLoading />
      ) : (
        <div className="orders unfinished !flex flex-col gap-2 w-full pb-10 p-1">
          {props.ordersUnfinished.data.length > 0 ? (
            <div className="columns-[350px] lg:columns-2 gap-3">
              {props.ordersUnfinished.data.map((order) => (
                <Order key={order.item_code} order={order} />
              ))}
            </div>
          ) : (
            <h2 className="font-semibold text-base my-10 text-center">
              Data Pesanan tidak ditemukan
            </h2>
          )}
          <Pagination
            status="isProcess"
            className="mt-3"
            totalPages={Math.ceil(
              Number(props.ordersUnfinished.pagination.total) /
                Number(props.ordersUnfinished.pagination.limit)
            )}
            page={Number(props.ordersUnfinished.pagination.page)}
          />
        </div>
      )}
      {props.ordersFinished.loading || props.isLoading ? (
        <OrdersLoading />
      ) : (
        <div className="orders finished !flex flex-col gap-2 pb-10 w-full p-1">
          {props.ordersFinished.data.length > 0 ? (
            <div className="columns-[350px] lg:columns-2 gap-3">
              {props.ordersFinished.data.map((order) => (
                <Order key={order.item_code} order={order} />
              ))}
            </div>
          ) : (
            <h2 className="font-semibold text-base my-10 text-center">
              Data Pesanan tidak ditemukan
            </h2>
          )}
          <Pagination
            status="isFinished"
            className="mt-3"
            totalPages={Math.ceil(
              Number(props.ordersFinished.pagination.total) /
                Number(props.ordersFinished.pagination.limit)
            )}
            page={Number(props.ordersFinished.pagination.page)}
          />
        </div>
      )}
    </Slider>
  );
}
