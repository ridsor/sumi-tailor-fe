import { NextRequest, NextResponse } from "next/server";
import { fetchAuth } from "./services/auth";

export const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/orders",
  "/accounts",
];
export const authRoutes = ["/login"];
export const publicRoutes = ["/", "/about", "/gallery", "/service"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  try {
    if (protectedRoutes.includes(pathname)) {
      const user = await fetchAuth();

      if (user?.status != "success") {
        return NextResponse.redirect(
          new URL("/login?callbackUrl=" + pathname, request.url)
        );
      }
    }

    if (authRoutes.includes(pathname)) {
      const user = await fetchAuth();

      if (user?.status == "success") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    if (pathname === "/register-order") {
      const token = request.nextUrl.searchParams.get("token") || "";
      const registerOrderResponse = await fetch(
        (process.env.NEXT_PUBLIC_API_URL as string) +
          "/api/orders/register-order/check?token=" +
          token
      );

      if (registerOrderResponse.status != 200) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } catch (e) {
    console.error(e);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
