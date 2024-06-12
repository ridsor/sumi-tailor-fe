"use client";

import { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./style.css";
import Order from "./OrderItem";
import Pagination from "@/components/fragments/Pagination";
import "yet-another-react-lightbox/styles.css";
import { OrderType } from "@/types/order";
import { PaginateType } from "@/types/paginate";

interface Props {
  ordersFinished: {
    data: OrderType[];
    paginate: PaginateType;
  };
  ordersUnfinished: {
    data: OrderType[];
    paginate: PaginateType;
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
      <div className="orders unfinished !flex flex-col gap-2 w-full pb-10 p-1">
        {props.ordersUnfinished.data.length > 0 ? (
          <>
            <div className="columns-[350px] lg:columns-2 gap-3">
              {props.ordersUnfinished.data.map((order) => (
                <Order key={order.item_code} order={order} />
              ))}
            </div>
            <Pagination
              status="isProcess"
              className="mt-3"
              totalPages={Math.ceil(
                Number(props.ordersUnfinished.paginate.total) /
                  Number(props.ordersUnfinished.paginate.limit)
              )}
              page={Number(props.ordersUnfinished.paginate.page)}
            />
          </>
        ) : (
          <h2 className="font-semibold text-base my-10 text-center">
            Data Pesanan tidak ditemukan
          </h2>
        )}
      </div>
      <div className="orders finished !flex flex-col gap-2 pb-10 w-full p-1">
        {props.ordersFinished.data.length > 0 ? (
          <>
            <div className="columns-[350px] lg:columns-2 gap-3">
              {props.ordersFinished.data.map((order) => (
                <Order key={order.item_code} order={order} />
              ))}
            </div>
            <Pagination
              status="isFinished"
              className="mt-3"
              totalPages={Math.ceil(
                Number(props.ordersFinished.paginate.total) /
                  Number(props.ordersFinished.paginate.limit)
              )}
              page={Number(props.ordersFinished.paginate.page)}
            />
          </>
        ) : (
          <h2 className="font-semibold text-base my-10 text-center">
            Data Pesanan tidak ditemukan
          </h2>
        )}
      </div>
    </Slider>
  );
}
