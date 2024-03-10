import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./services/token";

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
      const user = await getUser();

      if (user.status != 200) {
        return NextResponse.redirect(
          new URL("/login?callbackUrl=" + pathname, request.url)
        );
      }
    }

    if (authRoutes.includes(pathname)) {
      const user = await getUser();

      if (user.status == 200) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  } catch (e) {
    console.error(e);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
