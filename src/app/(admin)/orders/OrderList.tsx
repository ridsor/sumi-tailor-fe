import { useCallback, useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./style.css";
import Order from "./OrderItem";
import Pagination from "@/components/fragments/Pagination";
import { TypeOrders, TypePagination, getOrders } from "@/services/orders";
import OrderLoading from "./OrderLoading";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import OrderItemsLoading from "./OrderItemsLoading";

export default function OrderList() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOrderItemsLoading, setOrdersItemsLoading] = useState<boolean>(false);

  const [ordersFinished, setOrderFinished] = useState<{
    data: TypeOrders[];
    pagination: TypePagination;
    loading: boolean;
  }>({
    data: [],
    pagination: {
      limit: 5,
      total: 1,
      page: 1,
    },
    loading: true,
  });
  const [ordersUnfinished, setOrderUnfinished] = useState<{
    data: TypeOrders[];
    pagination: TypePagination;
    loading: boolean;
  }>({
    data: [],
    pagination: {
      limit: 5,
      total: 1,
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
    async (page: number, limit?: number) => {
      try {
        const result = await getOrders({
          page,
          limit,
          status: "isFinished",
        });

        setOrderFinished({
          data: (result.data as TypeOrders[]) || [],
          pagination: result.pagination as TypePagination,
          loading: false,
        });
      } catch (e) {
        console.error(e);
        router.push("/login");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handlePageOrderUnfinished = useCallback(
    async (page: number, limit?: number) => {
      try {
        const result = await getOrders({
          page,
          limit,
          status: "isProcess",
        });

        setOrderUnfinished({
          data: (result.data as TypeOrders[]) || [],
          pagination: result.pagination as TypePagination,
          loading: false,
        });
      } catch (e) {
        console.error(e);
        router.push("/login");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (isLoading) {
      setLoading(false);
    } else {
      const page = searchParams.has("page")
        ? Number(searchParams.get("page"))
        : 1;
      const limit = searchParams.has("limit")
        ? Number(searchParams.get("limit"))
        : 5;

      setOrderFinished((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          page: page,
        },
      }));
      setOrderUnfinished((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          page: page,
        },
      }));

      setOrdersItemsLoading(true);
      handlePageOrderFinished(page, limit);
      handlePageOrderUnfinished(page, limit).then(() =>
        setOrdersItemsLoading(false)
      );
    }
  }, [
    searchParams,
    handlePageOrderFinished,
    handlePageOrderUnfinished,
    isLoading,
  ]);

  return (
    <Slider {...sliderSettings}>
      {ordersUnfinished.loading || isLoading ? (
        <OrderLoading />
      ) : (
        <div className="orders unfinished !flex flex-col gap-2 w-full pb-10 p-1">
          <Pagination
            totalPages={Math.ceil(
              Number(ordersUnfinished.pagination.total) /
                Number(ordersUnfinished.pagination.limit)
            )}
            page={Number(ordersUnfinished.pagination.page)}
          />
          {isOrderItemsLoading ? (
            <OrderItemsLoading />
          ) : ordersUnfinished.data.length > 0 ? (
            ordersUnfinished.data.map((order) => (
              <Order key={order.id} order={order} />
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
      {ordersFinished.loading || isLoading ? (
        <OrderLoading />
      ) : (
        <div className="orders finished !flex flex-col gap-2 pb-10 w-full p-1">
          <Pagination
            totalPages={Math.ceil(
              Number(ordersFinished.pagination.total) /
                Number(ordersFinished.pagination.limit)
            )}
            page={Number(ordersFinished.pagination.page)}
          />
          {isOrderItemsLoading ? (
            <OrderItemsLoading />
          ) : ordersFinished.data.length > 0 ? (
            ordersFinished.data.map((order) => (
              <Order key={order.id} order={order} />
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
