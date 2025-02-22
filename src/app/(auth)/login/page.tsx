import LoginPage from "@/components/auth/login-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coinnect | Login",
  description: "Login page for authentication.",
};

const Page = () => {
  return <LoginPage />;
};

export default Page;
