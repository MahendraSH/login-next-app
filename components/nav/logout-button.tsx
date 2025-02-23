"use client";
import { FC, use, useEffect, useState } from "react";
import { Button } from "../ui/button";
import authAxios from "@/lib/authAxios";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LogoutButtonProps {}

const LogoutButton: FC<LogoutButtonProps> = ({}) => {
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      router.push("/auth/login");
      router.refresh();
      toast.success(response.data.message || "Logout successful");
      return response.data;
    } catch (error) {
      console.error("Error fetching admin data:", error);
      return null;
    } finally {
      setIsLogout(false);
    }
  };
  const [isLogout, setIsLogout] = useState<boolean>(false);
  useEffect(() => {
    if (isLogout) {
      logout();
    }
  }, [logout]);

  return <Button onClick={() => setIsLogout(true)}>Logout</Button>;
};

export default LogoutButton;
