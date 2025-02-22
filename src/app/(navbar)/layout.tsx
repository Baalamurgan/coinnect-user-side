"use client";

import Navbar from "@/components/layout/navbar";
import ItemAddedToCartModal from "@/components/modal/item-added-to-cart";
import Section from "@/components/ui/section";
import { useCart } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    isItemAddedToCartSuccessModalOpen,
    setIsItemAddedToCartSuccessModalOpen,
  } = useCart();
  return (
    <>
      <Navbar />
      <Section>{children}</Section>
      {isItemAddedToCartSuccessModalOpen && (
        <ItemAddedToCartModal
          isOpen={isItemAddedToCartSuccessModalOpen}
          setIsOpen={setIsItemAddedToCartSuccessModalOpen}
        />
      )}
    </>
  );
}
