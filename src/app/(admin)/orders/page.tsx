"use client";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import OrderInput from "@/app/(admin)/orders/OrderInput";
import OrderList from "@/app/(admin)/orders/OrderList";
import TokenModal from "./TokenModal";
import OrderSearch from "./OrderSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  changePage,
  handlePageOrderFinished,
  handlePageOrderUnfinished,
} from "@/lib/redux/features/ordersSlice";

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

  const ordersFinished = useAppSelector((state) => state.orders.ordersFinished);
  const ordersUnfinished = useAppSelector(
    (state) => state.orders.ordersUnfinished
  );

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [isOrderModal, setOrderModal] = useState<boolean>(false);
  const [isTokenModal, setTokenModal] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  const toggleOrderModal = () => {
    setOrderModal((prev) => !prev);
  };
  const toggleTokenModal = () => {
    setTokenModal((prev) => !prev);
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
      const ofpage = searchParams.has("ofpage")
        ? Number(searchParams.get("ofpage"))
        : 1;
      const oupage = searchParams.has("oupage")
        ? Number(searchParams.get("oupage"))
        : 1;
      const limit = searchParams.has("limit")
        ? Number(searchParams.get("limit"))
        : 8;
      const search = searchParams.get("s") || "";

      dispatch(
        changePage({
          ordersFinished: ofpage,
          ordersUnfinished: oupage,
        })
      );

      if (ordersFinished.pagination.page != ofpage) {
        dispatch(handlePageOrderFinished({ page: ofpage, limit, search }));
      }

      if (ordersUnfinished.pagination.page != oupage) {
        dispatch(handlePageOrderUnfinished({ page: oupage, limit, search }));
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
              <h2 className="text-2xl font-bold mb-2">Daftar Pesanan</h2>
              <button
                className="text-gray-500 mb-4"
                onClick={() => toggleTokenModal()}>
                Token pendaftaran pesanan
              </button>
              <TokenModal active={isTokenModal} openclose={toggleTokenModal} />
              <OrderSearch
                onSearch={handleOrderSearch}
                value={searchParams.get("s") || ""}
              />
              <OrderList
                isLoading={isLoading}
                ordersFinished={ordersFinished}
                ordersUnfinished={ordersUnfinished}
              />
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
