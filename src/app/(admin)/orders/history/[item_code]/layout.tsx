import { getOrderById } from "@/services/orders";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
  searchParams,
}: {
  params: { item_code: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> => {
  const order = await getOrderById(
    params.item_code,
    searchParams?.token as string
  ).catch((e) => console.error(e));

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

export default function layout({ children }: { children: React.ReactNode }) {
  return children;
}
