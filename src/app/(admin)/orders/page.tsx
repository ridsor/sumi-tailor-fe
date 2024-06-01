import OrderInput from "@/app/(admin)/orders/OrderInput";
import OrderSearch from "@/app/(admin)/orders/OrderSearch";
import history_icon from "@/assets/img/icons/history.png";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import WrapperOrderList from "@/app/(admin)/orders/WrapperOrderList";
import OrdersLoading from "@/app/(admin)/orders/OrdersLoading";

export default function OrdersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main>
      <section className="py-16">
        <div className="container">
          <article className="px-4">
            <OrderInput />
            <div className="relative">
              <h2 className="text-2xl font-bold mb-3">Daftar Pesanan</h2>
              <div className="flex sm:items-center mb-3 gap-3 flex-col sm:flex-row justify-between">
                <OrderSearch />
                <Link
                  href="/orders/history"
                  className="rounded-md flex items-center px-5 py-2 gap-2 font-semibold hover:bg-[rgba(0,0,0,.1)] justify-center bg-gray-100">
                  <Image src={history_icon} alt="" width={32} height={32} />
                  <span>Riwayat Pesanan</span>
                </Link>
              </div>
              <Suspense fallback={<OrdersLoading />}>
                <WrapperOrderList searchParams={searchParams} />
              </Suspense>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
