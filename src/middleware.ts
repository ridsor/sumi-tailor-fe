import { NextRequest, NextResponse } from "next/server";
import { routeFiltering } from "./utils/middleware";
import { getToken } from "next-auth/jwt";

export const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/orders*",
  "/accounts",
];
export const authRoutes = ["/login"];
export const publicRoutes = ["/", "/about", "/gallery", "/service"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  try {
    if (routeFiltering(pathname, protectedRoutes)) {
      const token = await getToken({ req: request });

      if (!token) {
        return NextResponse.redirect(
          new URL("/login?callbackUrl=" + pathname, request.url)
        );
      }
    }

    if (authRoutes.includes(pathname)) {
      const token = await getToken({ req: request });

      if (token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  } catch (e) {
    console.error(e);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
