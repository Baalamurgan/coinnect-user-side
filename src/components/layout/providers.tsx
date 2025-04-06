import { ConstantsProvider } from "@/context/ConstantsContext";
import { getCategories } from "@/lib/getCategories";
import React from "react";
import ClientProviders from "./clientProviders";

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <>
      <ConstantsProvider categories={categories.data?.categories || null}>
        <ClientProviders>{children}</ClientProviders>
      </ConstantsProvider>
    </>
  );
}
