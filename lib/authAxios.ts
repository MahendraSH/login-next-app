import axios from "axios";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Function to retrieve the token
const getToken = async () => {
  const token = (await cookies()).get("token");
  return token?.value;
};

export const authAxios = axios.create({
  baseURL: baseUrl,
});

// Intercept requests to add the Authorization header
authAxios.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authAxios;
