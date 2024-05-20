"use client";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import OrderList from "@/app/order-list/OrderList";
import OrderSearch from "./OrderSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getOrders } from "@/services/orders";
import { OrderType, PaginationType } from "@/lib/redux/features/ordersSlice";

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
  const pathname = usePathname();

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [action, setAction] = useState<boolean>(true);

  const [ordersFinished, setOrdersFinished] = useState<{
    data: OrderType[];
    pagination: PaginationType;
    loading: boolean;
  }>({
    data: [],
    pagination: {
      limit: 8,
      total: 1,
      page: 1,
    },
    loading: true,
  });
  const [ordersUnfinished, setOrdersUnfinished] = useState<{
    data: OrderType[];
    pagination: PaginationType;
    loading: boolean;
  }>({
    data: [],
    pagination: {
      limit: 8,
      total: 1,
      page: 1,
    },
    loading: true,
  });
  
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

  const handlePageOrder = async ({
    page,
    limit,
    search = "",
    status,
  }: {
    page: number;
    search?: string;
    limit?: number;
    status: "isProcess" | "isFinished";
  }) => {
    if (status === "isProcess") {
      setOrdersUnfinished((prev) => ({
        ...prev,
        loading: true,
      }));
    } else if (status === "isFinished") {
      setOrdersFinished((prev) => ({
        ...prev,
        loading: true,
      }));
    }

    const res = await getOrders({
      page,
      limit,
      status,
      search,
      type: "client",
    });

    if (status === "isProcess") {
      setOrdersUnfinished({
        data: res.data,
        pagination: res.pagination,
        loading: false,
      });
    } else if (status === "isFinished") {
      setOrdersFinished({
        data: res.data,
        pagination: res.pagination,
        loading: false,
      });
    }
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

      try {
        if (ordersUnfinished?.pagination.page != oupage || action) {
          handlePageOrder({ page: oupage, search, limit, status: "isProcess" });
        }
        if (ordersFinished?.pagination.page != ofpage || action) {
          handlePageOrder({
            page: ofpage,
            search,
            limit,
            status: "isFinished",
          });
        }
      } catch (e) {
        console.error(e);
      }

      setAction(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isLoading]);

  return (
    <main>
      <section className="py-36">
        <div className="container">
          <article className="px-4">
            <div className="relative">
              <h2 className="text-2xl font-bold mb-3">Daftar Pesanan</h2>
              <div className="flex sm:items-center mb-3 gap-3 flex-col sm:flex-row justify-between">
                <OrderSearch
                  onSearch={handleOrderSearch}
                  value={searchParams.get("s") || ""}
                />
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
