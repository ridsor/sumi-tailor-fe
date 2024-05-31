import { UserType } from "@/types/user";
import "./globals.css";
import { josenfin_sans, quicksand } from "@/fonts";
import { fetchAuth } from "@/services/auth";
import WrapperLayout from "./WrapperLayout";
import { Metadata } from "next";
import { Session } from "next-auth";

const enableNavbar = [
  "/",
  "/about",
  "/gallery",
  "/service",
  "/login",
  "/order-list",
];

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
    shortcut: ["/apple-touch-icon.png"],
  },
  title: "Sumi Tailor",
  description:
    "Temukan solusi ideal untuk gaya pakaian Anda! Tim penjahit kami siap membantu Anda mengatasi kesulitan dengan pakaian yang tidak pas. Dengan keahlian dan pengalaman kami, kami menciptakan pakaian yang disesuaikan dengan bentuk dan gaya tubuh unik Anda. Mulailah mewujudkan impian mode Anda sekarang!",
  authors: [
    {
      name: "Ryan Syukur",
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
  ],

  openGraph: {
    type: "website",
    title: "Sumi Tailor",
    images: [process.env.NEXT_PUBLIC_BASE_URL + "/image/sumi-tailor-v1.jpg"],
    description:
      "Temukan solusi ideal untuk gaya pakaian Anda! Tim penjahit kami siap membantu Anda mengatasi kesulitan dengan pakaian yang tidak pas. Dengan keahlian dan pengalaman kami, kami menciptakan pakaian yang disesuaikan dengan bentuk dan gaya tubuh unik Anda. Mulailah mewujudkan impian mode Anda sekarang!",
  },
};

export default async function RootLayout({
  children,
  params: { session },
}: {
  children: React.ReactNode;
  params: { session: Session };
}) {
  let auth: UserType | undefined;

  try {
    auth = await fetchAuth().then((result) => result?.data);
  } catch (e) {
    console.error(e);
  }

  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${quicksand.variable} ${josenfin_sans.variable}`}>
        <WrapperLayout auth={auth} session={session}>
          {children}
        </WrapperLayout>
      </body>
    </html>
  );
}
