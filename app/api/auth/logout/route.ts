import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const token = (await cookies()).get("token");
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const response = new NextResponse();
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  });
  return response;
}
