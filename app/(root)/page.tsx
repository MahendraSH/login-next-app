import authAxios from "@/lib/authAxios";
import axios from "axios";

const getUser = async () => {
  try {
    const response = await authAxios.get("/api/auth/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
export default async function Home() {
  const user = await getUser();
  return (
    <>
      <h1> Home </h1>
      <p>
        user:
        {JSON.stringify(user)}
      </p>
    </>
  );
}
