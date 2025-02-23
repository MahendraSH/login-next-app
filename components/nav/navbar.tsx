import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "@/components/ui/button";
import authAxios from "@/lib/authAxios";
import axios from "axios";
import LogoutButton from "./logout-button";
import { BoxIcon } from "lucide-react";

interface NavbarProps {}

const getAdmin = async () => {
  try {
    const response = await authAxios.get("/api/auth/admin");
    return response.data;
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return null;
  }
};
const getUser = async () => {
  try {
    const response = await authAxios.get("/api/auth/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
const Navbar = async ({}: NavbarProps) => {
  const user = await getUser();
  const admin = (await getAdmin()) || null;

  return (
    <nav className=" flex w-full min-h-16  shadow-sm shadow-secondary-foreground">
      <div className="flex flex-1 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="flex items-center space-x-2 font-semibold text-xl"
          >
            <BoxIcon className="w-8 h-8" /> Logo
          </Link>
        </div>
        <div className="flex items-center space-x-5">
          {user ? (
            <>
              <Link
                className={cn({
                  buttonVariants: {
                    variant: "link",
                  },
                })}
                href="/dashboard"
              >
                Dashboard
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                className={cn({
                  buttonVariants: {
                    variant: "link",
                  },
                })}
                href="/auth/login"
              >
                Login
              </Link>
              <Link
                className={cn({
                  buttonVariants: {
                    variant: "link",
                  },
                })}
                href="/auth/register"
              >
                Register
              </Link>
            </>
          )}
          {admin && admin.isAdmin && (
            <Link
              className={cn({
                buttonVariants: {
                  variant: "link",
                },
              })}
              href="/admin"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
