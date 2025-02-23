"use client";
import EmptyCart from "@/components/cart/empty-cart";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [isNoOrderID, setIsNoOrderID] = useState(false);
  const { replace } = useRouter();

  useEffect(() => {
    const order_id = localStorage.getItem("order_id") as string | undefined;
    if (order_id) replace(`/cart/${order_id}`);
    else setIsNoOrderID(true);
  }, [replace]);

  if (!isNoOrderID) return <Loader className="h-full" />;
  else return <EmptyCart />;
}
