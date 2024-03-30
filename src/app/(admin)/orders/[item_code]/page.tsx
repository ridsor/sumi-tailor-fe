import { getOrderById } from "@/services/orders";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import OrderConfirmation from "./OrderConfirmation";
import { getUser } from "@/services/token";

interface Props {
  params: { item_code: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export const generateMetadata = async ({
  params,
  searchParams,
}: Props): Promise<Metadata> => {
  const order = await getOrderById(
    params.item_code,
    searchParams.token as string
  ).catch((e) => {
    console.error(e);
  });

  let title = "Sumi Tailor";
  if (typeof order != "undefined") title = "Sumi Tailor · " + order.name;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
    icons: {
      icon: ["/favicon.ico"],
      apple: ["/apple-touch-icon.png"],
      shortcut: ["/apple-touch-icon.png"],
    },
    title,
    description:
      "Temukan solusi ideal untuk gaya pakaian Anda! Tim penjahit kami siap membantu Anda mengatasi kesulitan dengan pakaian yang tidak pas. Dengan keahlian dan pengalaman kami, kami menciptakan pakaian yang disesuaikan dengan bentuk dan gaya tubuh unik Anda. Mulailah mewujudkan impian mode Anda sekarang!",
    authors: [
      {
        name: "Ryan Syukur",
        url: process.env.BASE_URL,
      },
    ],

    openGraph: {
      type: "website",
      title: "Sumi Tailor",
      images: [process.env.BASE_URL + "/image/sumi-tailor-v1.jpg"],
      description:
        "Temukan solusi ideal untuk gaya pakaian Anda! Tim penjahit kami siap membantu Anda mengatasi kesulitan dengan pakaian yang tidak pas. Dengan keahlian dan pengalaman kami, kami menciptakan pakaian yang disesuaikan dengan bentuk dan gaya tubuh unik Anda. Mulailah mewujudkan impian mode Anda sekarang!",
    },
  };
};

export default async function DetailOrder(props: Props) {
  const user = await getUser().catch((e) => console.error(e));

  const order = await getOrderById(
    props.params.item_code,
    props.searchParams.token as string
  ).catch((e) => {
    console.error(e);
    if (e.message === "Authorization") {
      redirect("/");
    } else {
      redirect("/orders");
    }
  });

  let date = Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(new Date(order.updated_at));

  return (
    <main>
      <section className="py-15">
        <div className="container">
          <h1 className="font-bold text-xl border-b px-4 py-2 border-five">
            Detail Pesanan
          </h1>
          <div className="px-4">
            <h2 className="font-semibold text-base border-b py-2 mb-3 border-five">
              Pesanan {order.status === "isFinished" ? "Selesai" : "Diproses"}
            </h2>
            <div className="flex mb-2">
              <div className="flex justify-between flex-1">
                <span>Nama</span>
                <span id="name">{order.name}</span>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="flex justify-between flex-1">
                <span>Email</span>
                <span id="email">{order.email}</span>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="flex justify-between flex-1">
                <span>No Handphone</span>
                <span id="no_hp">{order.no_hp}</span>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="flex justify-between flex-1">
                <span>Alamat</span>
                <span id="address">{order.address}</span>
              </div>
            </div>
            <div className="flex mb-3">
              <div className="flex justify-between flex-1">
                <span>Tanggal Pembelian</span>
                <span id="date">{date} WIT</span>
              </div>
            </div>
          </div>
          <div className="p-4 border-y-8">
            <div
              className="border rounded-md py-2 px-3 border-five"
              id="description">
              <p>{order.description}</p>
              <hr className="my-3 border-five" />
              <div className="text-[12px]">Total Harga</div>
              <div className="font-bold" id="price">
                Rp
                {order.price
                  ? Intl.NumberFormat("id-ID").format(order.price)
                  : " -"}
              </div>
            </div>
            {user?.ok && (
              <OrderConfirmation item_code={props.params.item_code} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
