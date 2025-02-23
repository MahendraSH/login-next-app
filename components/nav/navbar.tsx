import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "@/components/ui/button";
import authAxios from "@/lib/authAxios";
import axios from "axios";
import LogoutButton from "./logout-button";

interface NavbarProps {}

const getAdmin = async () => {
  try {
    const response = await authAxios.post("/api/auth/admin");
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
const Navbar: FC<NavbarProps> = async ({}) => {
  const user = await getUser();
  const admin = await getAdmin();

  return (
    <nav className=" flex w-full min-h-16  shadow-sm shadow-secondary-foreground">
      <div className="flex flex-1 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <img
              src="https://nextjs.org/icons/next.svg"
              alt="Next.js Logo"
              width={50}
              height={50}
              className="dark:invert"
            />
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
                {user.name}
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
          {admin && (
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
