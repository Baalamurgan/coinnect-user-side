import SignUpPage from "@/components/auth/signup-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Sign Up",
  description: "Sign Up page for authentication.",
};

const Page = () => {
  return <SignUpPage />;
};

export default Page;
