import { NextRequest, NextResponse } from "next/server";

export const protectedRoutes = ["/dashboard", "profile", "orders", "accounts"];
export const authRoutes = ["/login"];
export const publicRoutes = ["/", "/about", "/gallery", "/service"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (protectedRoutes.includes(pathname)) {
    const response: Response = (await fetch(
      (process.env.BACKEND_URL as string) + "/api/auth/me",
      {
        method: "POST",
      }
    ).catch((err) => console.error("Error: ", err))) as Response;

    if (response.status != 200) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (authRoutes.includes(pathname)) {
    const response: Response = (await fetch(
      (process.env.BACKEND_URL as string) + "/api/auth/me",
      {
        method: "POST",
      }
    ).catch((err) => console.error("Error: ", err))) as Response;

    if (response.status == 200) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
}
