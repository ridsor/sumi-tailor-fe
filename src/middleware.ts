import { NextRequest, NextResponse } from "next/server";

export const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/orders",
  "/accounts",
];
export const authRoutes = ["/login"];
export const publicRoutes = ["/", "/about", "/gallery", "/service"];

export async function middleware(request: NextRequest) {
  const getUser = async () => {
    const response: Response = (await fetch(
      (process.env.NEXT_PUBLIC_API_URL as string) + "/api/auth/me",
      {
        method: "GET",
        headers: {
          Cookie: "refreshToken=" + cookie?.value,
        },
        credentials: "include",
      }
    ).catch((err) => {
      throw err;
    })) as Response;

    return response;
  };

  const cookie = request.cookies.get("refreshToken");
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
}
