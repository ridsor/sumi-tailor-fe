import "./globals.css";
import { josenfin_sans, quicksand } from "@/fonts";
import WrapperLayout from "./WrapperLayout";
import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]/route";

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
}: {
  children: React.ReactNode;
  params: { session: Session };
}) {
  let session = await getServerSession(authOption);

  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${quicksand.variable} ${josenfin_sans.variable}`}>
        <WrapperLayout session={session}>{children}</WrapperLayout>
      </body>
    </html>
  );
}
