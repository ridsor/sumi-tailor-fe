import { Suspense } from "react";
import OrdersLoading from "@/app/order-list/OrdersLoading";
import WrapperOrderList from "@/app/order-list/WrapperOrderList";
import OrderSearch from "./OrderSearch";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main>
      <section className="pt-[125px] mb-[125px]">
        <div className="container">
          <article className="px-4">
            <div className="relative">
              <h2 className="text-5xl font-bold mb-12 text-background lg:text-one text-center lg:text-left">Daftar Pesanan</h2>
              <div className="flex sm:items-center mb-3 gap-3 flex-col sm:flex-row justify-between">
                <OrderSearch />
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
