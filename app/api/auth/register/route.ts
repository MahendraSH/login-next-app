import { generateToken, hashPassword } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/db/models/userModel";
import { z } from "zod";
import Roles from "@/constants/Roles";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  });
  const result = registerSchema.safeParse(body);
  if (!result.success) {
    return new Response(JSON.stringify(result.error), { status: 400 });
  }
  const hashedPassword = await hashPassword(result.data.password);
  const user = await UserModel.create({
    name: result.data.name,
    email: result.data.email,
    password: hashedPassword,
    role: Roles.USER,
  });
  const token = generateToken({
    email: user.email,
    name: user.name,
    id: user.id,
  });
  const response = new NextResponse();
  response.cookies.set("token", token);
  return response;
};
