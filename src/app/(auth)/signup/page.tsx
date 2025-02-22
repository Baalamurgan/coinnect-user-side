import SignUpPage from "@/components/auth/signup-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Sign Up",
  description: "Sign Up page for authentication.",
};

export default function Page() {
  return <SignUpPage />;
}
