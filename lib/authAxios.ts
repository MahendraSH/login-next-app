import axios from "axios";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export const authAxios = axios.create({
  headers: {
    Authorization: `Bearer ${cookies().get("token")?.value}`,
  },
  baseURL: baseUrl,
});

export default authAxios;
