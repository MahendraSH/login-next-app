import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import Roles from "./constants/Roles";
export async function middleware(request: NextRequest) {
  const token = cookies().get("token");
  const siteUrl = new URL(request.url).origin;
  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  const userResponse = await authAxios
    .get(siteUrl + "/api/auth/is-auth")
    .then((res) => res.data)
    .catch(() => null);

  if (!userResponse || userResponse.isAuth === false) {
    return NextResponse.redirect(new URL("auth/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const adminResponse = await authAxios
      .get(siteUrl + "/api/auth/admin")
      .then((res) => res.data)
      .catch(() => null);

    if (!adminResponse || adminResponse.isAdmin === false) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard:path*", "/api/routes:path*", "/admin:path*"],
};
