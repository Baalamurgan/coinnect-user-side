"use client";
import EmptyCart from "@/components/cart/empty-cart";
import Loader from "@/components/loader";
import { getLocal } from "@/lib/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [isNoOrderID, setIsNoOrderID] = useState(false);
  const { replace } = useRouter();

  useEffect(() => {
    const local_order_id = getLocal("order_id");
    if (local_order_id) replace(`/cart/${local_order_id}`);
    else setIsNoOrderID(true);
  }, [replace]);

  if (!isNoOrderID) return <Loader className="h-full" />;
  else return <EmptyCart />;
}
