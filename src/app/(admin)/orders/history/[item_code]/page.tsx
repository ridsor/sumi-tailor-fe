import { getDay, getMonth, getTime, getYear } from "@/utils/order";
import "@/app/(admin)/orders/style.css";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import NotFound from "@/app/(admin)/orders/history/[item_code]/NotFound";
import Lightbox from "yet-another-react-lightbox";
import NextJsImage from "@/components/fragments/NextJsImage";
import { OrderHistoryType } from "@/types/order";
import { getOrderHistoryById } from "@/services/orders";
import OrderImage from "./OrderImage";

export default async function DetailOrder({
  params,
}: {
  params: { item_code: string };
}) {
  let order: OrderHistoryType | undefined;

  try {
    order = await getOrderHistoryById(params.item_code);
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
          </div>
          <div className="px-4">
            <div className="flex mb-2 mt-3">
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
          </div>
        </div>
      </section>
    </main>
  );
}
