"use client";

import Navbar from "@/components/layout/navbar";
import Loader from "@/components/loader";
import ItemAddedToCartModal from "@/components/modal/item-added-to-cart";
import Section from "@/components/ui/section";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { orderSuccessModalType, setOrderSuccessModalType } = useCart();
  const { user } = useAuth();

  if (user === undefined) return <Loader className="h-full" />;

  return (
    <>
      <Navbar user={user} />
      <Section className="h-[calc(100vh-60px)]">{children}</Section>
      {orderSuccessModalType && (
        <ItemAddedToCartModal
          isOpen={!!orderSuccessModalType}
          setIsOpen={(value) =>
            setOrderSuccessModalType((p) => (value ? p : ""))
          }
        />
      )}
    </>
  );
}
