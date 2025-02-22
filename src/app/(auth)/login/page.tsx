import LoginPage from "@/components/auth/login-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coinnect | Login",
  description: "Login page for authentication.",
};

export default function Page() {
  return <LoginPage />;
}
