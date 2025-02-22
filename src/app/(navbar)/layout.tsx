import Navbar from "@/components/layout/navbar";
import Section from "@/components/ui/section";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Section>{children}</Section>
    </>
  );
}
