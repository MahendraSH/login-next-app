import UserModel from "@/db/models/userModel";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const token = cookies().get("token");
  const Authorization = req.headers.get("Authorization");

  const authToken = token
    ? token.value
    : Authorization && Authorization.split(" ")[1];

  if (!authToken) {
    return NextResponse.json({ isAuth: false });
  }
  const user = verifyToken(authToken);
  if (!user.success) {
    console.log(user.error);
    return NextResponse.json({ isAuth: false });
  }
  const userDb = await UserModel.findOne({
    where: { id: user.data.id, email: user.data.email, name: user.data.name },
  });
  if (!userDb) {
    return NextResponse.json({ isAuth: false });
  }

  return NextResponse.json({ isAuth: true });
};
