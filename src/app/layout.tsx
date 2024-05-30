import { UserType } from "@/types/user";
import "./globals.css";
import { josenfin_sans, quicksand } from "@/fonts";
import { fetchAuth } from "@/services/auth";
import WrapperLayout from "./WrapperLayout";

const enableNavbar = [
  "/",
  "/about",
  "/gallery",
  "/service",
  "/login",
  "/order-list",
];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
        <WrapperLayout auth={auth}>{children}</WrapperLayout>
      </body>
    </html>
  );
}
