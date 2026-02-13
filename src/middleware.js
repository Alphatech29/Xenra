import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  const isAuthPage = pathname.startsWith("/auth/login");
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // No session → login
  if (!accessToken && !refreshToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Rotate token ONLY on protected routes
  if (!accessToken && refreshToken && isProtectedRoute) {
    const refreshRes = await fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
      credentials: "include",
    });

    if (!refreshRes.ok) {
      const res = NextResponse.redirect(new URL("/auth/login", req.url));
      res.cookies.delete("access_token");
      res.cookies.delete("refresh_token");
      return res;
    }

    // Backend already set cookies
    return NextResponse.next();
  }

  // Logged-in user should not see login page
  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login/:path*"],
};
