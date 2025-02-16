import authAxios from "@/lib/authAxios";
import { FC } from "react";
import { redirect } from "next/navigation";

interface LogoutPageProps {}

const logout = async () => {
  try {
    const response = await authAxios.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return null;
  }
};

const LogoutPage: FC<LogoutPageProps> = async ({}) => {
  const res = await logout();

  if (res) {
    redirect("/");
  }
  return <>{res ? <div>Logout successful</div> : <div>Logout failed</div>}</>;
};

export default LogoutPage;
