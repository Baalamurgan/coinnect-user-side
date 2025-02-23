"use client";

import EmptyCart from "@/components/cart/empty-cart";
import Loader from "@/components/loader";
import Confetti from "@/components/ui/confetti";
import { useCart } from "@/context/CartContext";
import { getLocal } from "@/lib/localStorage";
import displayPrice from "@/lib/price";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { order_id } = useParams<{ order_id: string }>();
  const { cart, fetchCart } = useCart();

  useEffect(() => {
    async function fetchCartHandler(order_id: string) {
      await fetchCart(order_id);
    }
    const local_order_id = getLocal("order_id");
    if (order_id && local_order_id != order_id) fetchCartHandler(order_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order_id]);

  if (cart === undefined) return <Loader className="h-full" />;
  if (cart === null) return notFound();
  if (cart.order_items.length === 0) return <EmptyCart />;

  return (
    <div className="flex flex-col items-center justify-center">
      <Confetti />
      <h1 className="mt-20">Your Order received successfully!🎉</h1>
      <p className="mt-5">
        We&apos;ll call you within 1-2 business days to confirm your order and
        payment details
      </p>
      <p className="mt-1">
        Total Amount:{" "}
        <span className="text-lg font-semibold">
          {displayPrice({ price: cart.billable_amount })}
        </span>
      </p>
      <div className="my-10 flex flex-col items-center gap-y-3 mt-20">
        <p>If you want to chat with us, get us quickly in the below link</p>
        <Link href={`/cart/${order_id}`} className="text-blue-600 underline">
          Chat with us!
        </Link>
      </div>
      <div className="my-10 flex flex-col items-center gap-y-3 mt-20">
        <p>If you want to chat with us, get us quickly in the below link</p>
        <a
          href={`https://wa.me/9444975758`}
          className="text-blue-600 underline"
        >
          Chat with us!
        </a>
      </div>
    </div>
  );
}
