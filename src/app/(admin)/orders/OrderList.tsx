import { useCallback, useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./style.css";
import Order from "./OrderItem";
import Pagination from "@/components/fragments/Pagination";
import OrderLoading from "./OrderLoading";
import { useRouter, useSearchParams } from "next/navigation";
import OrdersItemLoading from "./OrdersItemLoading";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  changePage,
  handlePageOrderFinished,
  handlePageOrderUnfinished,
} from "@/lib/redux/features/ordersSlice";
import { getToken } from "@/services/token";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export default function OrderList() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(true);

  const ordersItemLoading = useAppSelector(
    (state) => state.orders.ordersItemLoading
  );
  const orders = useAppSelector((state) => state.orders);
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

  const handleCancelOrder = useCallback(
    async (item_code: string) => {
      try {
        const result = await withReactContent(Swal)
          .mixin({
            customClass: {
              confirmButton:
                "bg-success px-3 py-1.5 rounded-md text-white ml-1",
              cancelButton: "bg-fail px-3 py-1.5 rounded-md text-white mr-1",
            },
            buttonsStyling: false,
          })
          .fire({
            title: "Apa kamu yakin?",
            text: "Anda tidak akan dapat mengembalikan ini!",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            reverseButtons: true,
          });

        if (result.isConfirmed) {
          const token = await getToken();

          if (token.status != "success") {
            console.error("Failed to cancel");
            return;
          }

          const response = await fetch(
            (process.env.NEXT_PUBLIC_API_URL as string) +
              "/api/orders/" +
              item_code,
            {
              method: "DELETE",
              credentials: "include",
              headers: {
                Authorization: "Bearer " + token.authorization.access_token,
              },
            }
          );

          if (response.status != 200) {
            console.error("Failed to cancel");
            return;
          }

          if (
            searchParams.get("page") != null &&
            searchParams.get("page") != "1"
          ) {
            router.push("/orders?page=1");
          } else {
            dispatch(handlePageOrderFinished({ page: 1 }));
            dispatch(handlePageOrderUnfinished({ page: 1 }));
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, router, searchParams]
  );

  const handleStatusChange = useCallback(
    async (item_code: string) => {
      try {
        const token = await getToken();

        if (token.status != "success") {
          console.error("Failed to cancel");
          return;
        }

        const response = await fetch(
          (process.env.NEXT_PUBLIC_API_URL as string) +
            "/api/orders/" +
            item_code +
            "/status",
          {
            method: "PUT",
            credentials: "include",
            headers: {
              Authorization: "Bearer " + token.authorization.access_token,
            },
          }
        );

        if (response.status != 200) {
          console.error("Failed to cancel");
          return;
        }

        if (
          searchParams.get("page") != null &&
          searchParams.get("page") != "1"
        ) {
          router.push("/orders?page=1");
        } else {
          dispatch(handlePageOrderFinished({ page: 1 }));
          dispatch(handlePageOrderUnfinished({ page: 1 }));
        }

        withReactContent(Swal)
          .mixin({
            customClass: {
              popup: "max-w-[200px] w-full h-[100px]",
              icon: "scale-50 -translate-y-8",
            },
            buttonsStyling: false,
          })
          .fire({
            position: "top-end",
            icon: "success",
            showConfirmButton: false,
            timer: 500,
          });
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, router, searchParams]
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
      dispatch(changePage(page));
      dispatch(handlePageOrderUnfinished({ page, limit }));
      dispatch(handlePageOrderFinished({ page, limit }));
    }
  }, [searchParams, dispatch, isLoading]);

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
          {ordersItemLoading ? (
            <OrdersItemLoading />
          ) : ordersUnfinished.data.length > 0 ? (
            ordersUnfinished.data.map((order) => (
              <Order
                key={order.item_code}
                order={order}
                onCancel={handleCancelOrder}
                onStatusChange={handleStatusChange}
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
          {ordersItemLoading ? (
            <OrdersItemLoading />
          ) : ordersFinished.data.length > 0 ? (
            ordersFinished.data.map((order) => (
              <Order
                key={order.item_code}
                order={order}
                onCancel={handleCancelOrder}
                onStatusChange={handleStatusChange}
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
