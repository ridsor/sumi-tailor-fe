import OrderSearch from "@/app/(admin)/orders/OrderSearch";
import "../style.css";
import WrapperOrderList from "./WrapperOrderList";

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
            <div className="relative">
              <h2 className="text-2xl font-bold mb-3">Riwayat Pesanan</h2>
              <div className="mb-3">
                <OrderSearch />
              </div>
              <WrapperOrderList searchParams={searchParams} />
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
