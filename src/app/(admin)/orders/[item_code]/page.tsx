import OrderConfirmation from "./OrderConfirmation";
import { getDay, getMonth, getTime, getYear } from "@/utils/order";
import OrderMenu from "./OrderMenu";
import "@/app/(admin)/orders/style.css";
import { getOrderById } from "@/services/orders";
import { OrderType } from "@/types/order";
import OrderImage from "./OrderImage";
import NotFound from "./NotFound";

export default async function DetailOrder({
  params,
}: {
  params: { item_code: string };
}) {
  let order: OrderType | undefined;

  try {
    order = await getOrderById(params.item_code);
  } catch (e) {
    console.error(e);
  }

  if (!order) {
    return <NotFound />;
  }

  return (
    <main>
      <section className="py-15 md:text-base">
        <div className="container border-4 h-screen flex flex-col max-h-[1080px] min-h-[508px]">
          <div className="flex justify-between px-4 py-2 border-b border-five items-center gap-2">
            <h1 className="font-bold text-xl md:text-3xl">Detail Pesanan</h1>
            <OrderMenu order={order} />
          </div>
          <div className="px-4">
            <h2 className="font-semibold text-base md:text-xl border-b py-2 mb-3 border-five">
              Status Pesanan:{" "}
              <span className="font-bold">
                {order.status === "isFinished" ? "Selesai" : "Diproses"}
              </span>
            </h2>
            <div className="flex mb-2">
              <div className="flex justify-between flex-1 gap-2">
                <span className="font-semibold">Nama</span>
                <span id="name">{order.name}</span>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="flex justify-between flex-1 gap-2">
                <span className="font-semibold">No Handphone</span>
                <span id="no_hp">{order.no_hp}</span>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="flex justify-between flex-1 gap-2">
                <span className="font-semibold">Alamat</span>
                <span id="address">{order.address}</span>
              </div>
            </div>
            <div className="flex mb-3">
              <div className="flex justify-between flex-1 gap-2">
                <span className="font-semibold">Tanggal Pemesanan</span>
                <span id="date">
                  {`${getDay(order.updated_at)} ${getMonth(
                    order.updated_at
                  )} ${getYear(order.updated_at)}, ${getTime(
                    order.updated_at
                  )} WIT`}
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 border-t-8 flex-1 flex flex-col">
            <OrderImage order={order} />
            <div
              className="border flex flex-col rounded-md py-2 px-3 border-five flex-1"
              id="note">
              <h6 className="font-semibold">Catatan</h6>
              <p className="flex-1">{order.note}</p>
              <hr className="my-3 border-five" />
              <div className="text-[12px]">Total Harga</div>
              <div className="font-bold" id="price">
                Rp
                {order.price
                  ? Intl.NumberFormat("id-ID").format(order.price)
                  : " -"}
              </div>
            </div>
            <OrderConfirmation item_code={params.item_code} />
          </div>
        </div>
      </section>
    </main>
  );
}
