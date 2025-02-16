import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function middleware(request: NextRequest) {
  const token = cookies().get("token");
  const siteUrl = new URL(request.url).origin;
  const response = await axios
    .create({
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    })
    .get(siteUrl + "/api/auth/user")
    .then((res) => res.data)
    .catch(() => null);

  console.log(response);
  if (!response) {
    return NextResponse.redirect(new URL("auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard:path*", "/api/routes:path*"],
};
