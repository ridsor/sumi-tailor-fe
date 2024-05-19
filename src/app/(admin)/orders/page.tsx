"use client";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import OrderInput from "@/app/(admin)/orders/OrderInput";
import OrderList from "@/app/(admin)/orders/OrderList";
import OrderSearch from "./OrderSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  changePage,
  handlePageOrderFinished,
  handlePageOrderUnfinished,
} from "@/lib/redux/features/ordersSlice";
import history_icon from "@/assets/img/icons/history.png";
import Image from "next/image";
import Link from "next/link";

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
  const [isLoading, setLoading] = useState<boolean>(true);
  const [action, setAction] = useState<boolean>(true);

  const toggleOrderModal = () => {
    setOrderModal((prev) => !prev);
  };

  const handleOrderSearch = (value: string) => {
    clearTimeout(searchTimeout);

    setSearchTimeout(
      setTimeout(() => {
        handleAction();
        const params = new URLSearchParams(searchParams.toString());
        params.set("s", value);
        router.push(pathname + "?" + params.toString());
      }, 1000)
    );
  };

  const handleAction = () => {
    setAction(true);
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

      if (ordersFinished.pagination.page != ofpage || action) {
        dispatch(handlePageOrderFinished({ page: ofpage, limit, search }));
      }

      if (ordersUnfinished.pagination.page != oupage || action) {
        dispatch(handlePageOrderUnfinished({ page: oupage, limit, search }));
      }

      setAction(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isLoading]);

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
            <OrderInput
              modal={isOrderModal}
              toggleModal={toggleOrderModal}
              action={handleAction}
            />
            <div className="relative">
              <h2 className="text-2xl font-bold mb-3">Daftar Pesanan</h2>
              <div className="flex sm:items-center mb-3 gap-3 flex-col sm:flex-row justify-between">
                <OrderSearch
                  onSearch={handleOrderSearch}
                  value={searchParams.get("s") || ""}
                />
                <Link
                  href="/orders/history"
                  className="rounded-md flex items-center px-5 py-2 gap-2 font-semibold hover:bg-[rgba(0,0,0,.1)] justify-center bg-gray-100">
                  <Image src={history_icon} alt="" width={32} height={32} />
                  <span>Riwayat Pesanan</span>
                </Link>
              </div>
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
