import OrdersLoading from "@/app/order-list/OrdersLoading";

export default function loading() {
  return (
    <main>
      <section className="py-36 animate-pulse">
        <div className="container">
          <article className="px-4">
            <div className=" rounded-md h-[32px] bg-[#bdc3c7] max-w-[250px] mb-3" />
            <div className=" rounded-md h-[32px] bg-[#bdc3c7] max-w-[350px] mb-3  " />
            <OrdersLoading />
          </article>
        </div>
      </section>
    </main>
  );
}
