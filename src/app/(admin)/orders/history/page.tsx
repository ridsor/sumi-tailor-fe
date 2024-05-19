"use client";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import OrderInput from "@/app/(admin)/orders/OrderInput";
import OrderList from "@/app/(admin)/orders/history/OrderList";
import OrderSearch from "@/app/(admin)/orders/OrderSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  changePage,
  handlePageOrderHistory,
} from "@/lib/redux/features/orderHistorySlice";
import "../style.css";

interface OrderInput {
  item_code: string;
  name: string;
  no_hp: string;
  address: string;
  price: string;
  note: string;
  image: string;
}

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const orders = useAppSelector((state) => state.orderHistory.orders);

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [isOrderModal, setOrderModal] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  const toggleOrderModal = () => {
    setOrderModal((prev) => !prev);
  };

  const handleOrderSearch = (value: string) => {
    clearTimeout(searchTimeout);

    setSearchTimeout(
      setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("s", value);
        router.push(pathname + "?" + params.toString());
      }, 1000)
    );
  };

  useEffect(() => {
    if (isLoading) {
      setLoading(false);
    } else {
      const page = searchParams.has("page")
        ? Number(searchParams.get("page"))
        : 1;
      const limit = searchParams.has("limit")
        ? Number(searchParams.get("limit"))
        : 8;
      const search = searchParams.get("s") || "";

      dispatch(changePage(page));
      if (orders.pagination.page != page) {
        dispatch(handlePageOrderHistory({ page: page, limit, search }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, dispatch, isLoading]);

  return (
    <main>
      <section className="py-16">
        <div className="container">
          <article className="px-4">
            <button
              aria-label="Add Order"
              onClick={() => {
                toggleOrderModal();
              }}
              className="fixed bottom-5 right-5 p-3 border border-white bg-two text-white rounded-md text-xl hover:bg-four focus:ring focus:ring-[rgba(179,203,166,.5)] z-40">
              <FaPlus />
            </button>
            <OrderInput modal={isOrderModal} toggleModal={toggleOrderModal} />
            <div className="relative">
              <h2 className="text-2xl font-bold mb-3">Riwayat Pesanan</h2>
              <div className="mb-3">
                <OrderSearch
                  onSearch={handleOrderSearch}
                  value={searchParams.get("s") || ""}
                />
              </div>
              <OrderList isLoading={isLoading} orders={orders} />
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
