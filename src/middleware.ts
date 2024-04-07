import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./services/auth";
import { getToken } from "next-auth/jwt";
import { signOut } from "next-auth/react";

export const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/orders",
  "/accounts",
];
export const authRoutes = ["/login"];
export const publicRoutes = ["/", "/about", "/gallery", "/service"];

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    if (protectedRoutes.includes(pathname)) {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
      const user = await getUser(token?.refreshToken || "");

      if (user?.status != "success") {
        signOut();
        return NextResponse.redirect(
          new URL("/login?callbackUrl=" + pathname, request.url)
        );
      }
    }

    if (authRoutes.includes(pathname)) {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
      const user = await getUser(token?.refreshToken || "");
      if (user?.status == "success") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        signOut();
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
