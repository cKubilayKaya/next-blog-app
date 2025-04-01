import { NextResponse } from "next/server";
import { tokenVerifyService } from "./services/authServices";

const unauthenticatedProtectedRoutes = ["/dashboard", "/settings"];
const authenticatedProtectedRoutes = ["/login", "/register"];

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;
  let isValidToken = false;

  if (token) {
    try {
      const { success } = await tokenVerifyService(token);
      if (success) {
        isValidToken = true;
      }
    } catch (error) {
      console.error("Token doğrulama hatası:", error);
      // ❌ Token geçersizse, çerezi (cookie) temizle
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token"); // Çerez (cookie) silme
      return response;
    }
  }

  // 🔵 Kullanıcı giriş yapmamış ve korunan bir sayfaya erişmeye çalışıyorsa
  if (!isValidToken && unauthenticatedProtectedRoutes.some((route) => pathname.startsWith(route))) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token"); // Çerez (cookie) silme
    return response;
  }

  // 🟢 Kullanıcı giriş yapmış ancak /login veya /register sayfasına erişmeye çalışıyorsa
  if (isValidToken && authenticatedProtectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    ...unauthenticatedProtectedRoutes.flatMap((item) => [item, `${item}/:path*`]),
    ...authenticatedProtectedRoutes.flatMap((item) => [item, `${item}/:path*`]),
  ],
};
