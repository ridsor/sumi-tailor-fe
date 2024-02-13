import { useCallback, useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./style.css";
import Order from "./OrderItem";
import Pagination from "@/components/fragments/Paginate";
import { getOrders } from "@/services/orders";
import OrderLoading from "./OrderLoading";

interface Order {
  id: number;
  item_code: number;
  name: string;
  category: string;
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

export default function OrderList() {
  const [ordersFinished, setOrderFinished] = useState<{
    data: Order[];
    pagination: Pagination;
    loading: boolean;
  }>({
    data: [],
    pagination: {
      totalItems: 2,
      totalPages: 1,
      page: 1,
    },
    loading: true,
  });
  const [ordersUnfinished, setOrderUnfinished] = useState<{
    data: Order[];
    pagination: Pagination;
    loading: boolean;
  }>({
    data: [],
    pagination: {
      totalItems: 2,
      totalPages: 1,
      page: 1,
    },
    loading: true,
  });

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

  const handlePageOrderFinished = useCallback(
    async (page: number) => {
      const result = await getOrders({
        page: page,
        totalItems: ordersFinished.pagination.totalItems,
        status: "finished",
      });

      setOrderFinished({
        data: result.data,
        pagination: result.pagination,
        loading: false,
      });
    },
    [ordersFinished.pagination.totalItems]
  );

  const handlePageOrderUnfinished = useCallback(
    async (page: number) => {
      const result = await getOrders({
        page: page,
        totalItems: ordersUnfinished.pagination.totalItems,
        status: "unfinished",
      });

      setOrderUnfinished({
        data: result.data,
        pagination: result.pagination,
        loading: false,
      });
    },
    [ordersUnfinished.pagination.totalItems]
  );

  useEffect(() => {
    handlePageOrderFinished(1);
    handlePageOrderUnfinished(1);
  }, [handlePageOrderFinished, handlePageOrderUnfinished]);

  return (
    <Slider {...sliderSettings}>
      {ordersUnfinished.loading ? (
        <OrderLoading />
      ) : (
        <div className="orders unfinished !flex flex-col gap-2 w-full pb-10 p-1">
          {ordersUnfinished.data.length > 0 && (
            <Pagination
              totalPages={ordersUnfinished.pagination.totalPages}
              currentPage={ordersUnfinished.pagination.page}
              handleChangeCurrentPage={handlePageOrderUnfinished}
            />
          )}
          {ordersUnfinished.data.length > 0 ? (
            ordersUnfinished.data.map((order) => (
              <Order
                key={order.id}
                id={order.id}
                date={order.updated_at}
                name={order.name}
                category={order.category}
                price={order.price}
                description={order.description}
                finished={order.finished}
              />
            ))
          ) : (
            <>Data Pesanan tidak ditemukan</>
          )}
          {ordersUnfinished.data.length > 0 && (
            <Pagination
              totalPages={ordersUnfinished.pagination.totalPages}
              currentPage={ordersUnfinished.pagination.page}
              handleChangeCurrentPage={handlePageOrderUnfinished}
            />
          )}
        </div>
      )}
      {ordersFinished.loading ? (
        <OrderLoading />
      ) : (
        <div className="orders finished !flex flex-col gap-2 pb-10 w-full p-1">
          {ordersFinished.data.length > 0 && (
            <Pagination
              totalPages={ordersFinished.pagination.totalPages}
              currentPage={ordersFinished.pagination.page}
              handleChangeCurrentPage={handlePageOrderFinished}
            />
          )}
          {ordersFinished.data.length > 0 ? (
            ordersFinished.data.map((order) => (
              <Order
                key={order.id}
                id={order.id}
                date={order.updated_at}
                name={order.name}
                category={order.category}
                price={order.price}
                description={order.description}
                finished={order.finished}
              />
            ))
          ) : (
            <>Data Pesanan tidak ditemukan</>
          )}
          {ordersFinished.data.length > 0 && (
            <Pagination
              totalPages={ordersFinished.pagination.totalPages}
              currentPage={ordersFinished.pagination.page}
              handleChangeCurrentPage={handlePageOrderFinished}
            />
          )}
        </div>
      )}
    </Slider>
  );
}
