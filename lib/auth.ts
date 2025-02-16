import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import z from "zod";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: {
  email: string;
  name: string;
  id: number;
}) {
  const token = jwt.sign(
    {
      email: user.email,
      name: user.name,
      id: user.id,
    },
    process.env.NEXTAUTH_SECRET!
  );
  return token;
}

export function decodeToken(token: string) {
  const decodeSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    id: z.number(),
  });
  return decodeSchema.safeParse(jwt.decode(token));
}

export function verifyToken(token: string) {
  const decodeSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    id: z.number(),
  });
  return decodeSchema.safeParse(jwt.decode(token));
}

