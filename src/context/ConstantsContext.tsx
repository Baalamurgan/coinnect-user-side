"use client";

import { Category } from "@/services/category/types";
import React, { createContext, ReactNode, useContext } from "react";

interface ConstantContextType {
  categories: Category[] | null | undefined;
}

const ConstantsContext = createContext<ConstantContextType | undefined>(
  undefined
);

export const useConstants = (): ConstantContextType => {
  const context = useContext(ConstantsContext);
  if (!context) {
    throw new Error("useConstants must be used within a ConstantsProvider");
  }
  return context;
};

interface ConstantsProviderProps {
  categories: Category[] | null | undefined;
  children: ReactNode;
}

export const ConstantsProvider: React.FC<ConstantsProviderProps> = ({
  categories,
  children,
}) => {
  const value = {
    categories,
  };

  return (
    <ConstantsContext.Provider value={value}>
      {children}
    </ConstantsContext.Provider>
  );
};
