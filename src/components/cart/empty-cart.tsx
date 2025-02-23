"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const EmptyCart = () => {
  const { push } = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
      <ShoppingCart className="w-16 h-16 text-gray-400" />
      <h1 className="text-xl font-semibold">Your Cart is Empty</h1>
      <p className="text-gray-500">
        Looks like you haven&apos;t added anything yet.
      </p>
      <Button className="mt-4 cursor-pointer" onClick={() => push(`/home`)}>
        Browse Products
      </Button>
    </div>
  );
};

export default EmptyCart;
