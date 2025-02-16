import UserModel from "@/db/models/userModel";
import { generateToken, verifyPassword } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  const result = loginSchema.safeParse(body);
  if (!result.success) {
    return new Response(JSON.stringify(result.error), { status: 400 });
  }
  const user = await UserModel.findOne({ where: { email: result.data.email } });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 400,
    });
  }
  const isPasswordValid = await verifyPassword(
    result.data.password,
    user.password
  );
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: "Invalid password" }), {
      status: 400,
    });
  }
  const token = generateToken({
    email: user.email,
    name: user.name,
    id: user.id,
  });
  const response = new NextResponse();
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
};
