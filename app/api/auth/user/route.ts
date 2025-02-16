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
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const user = verifyToken(authToken);
  if (!user.success) {
    console.log(user.error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userDb = await UserModel.findOne({
    where: { id: user.data.id, email: user.data.email, name: user.data.name },
  });
  if (!userDb) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user.data);
};
