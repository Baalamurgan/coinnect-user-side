"use client";

import CartItems from "@/components/cart/cart-items";
import EmptyCart from "@/components/cart/empty-cart";
import BreadCrumb from "@/components/layout/breadcrumb";
import Loader from "@/components/loader";
import { useCart } from "@/context/CartContext";
import { getLocal } from "@/lib/localStorage";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { order_id: url_order_id } = useParams<{ order_id: string }>();
  const local_order_id = getLocal("order_id");
  const { cart, fetchCart } = useCart();
  const [isFetchingUrlCart, setIsFetchingUrlCart] = useState(true);

  useEffect(() => {
    async function fetchCartHandler(order_id: string) {
      setIsFetchingUrlCart(true);
      await fetchCart(order_id);
      setIsFetchingUrlCart(false);
    }

    if (url_order_id && local_order_id != url_order_id)
      fetchCartHandler(url_order_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url_order_id]);

  useEffect(() => {
    if (cart) setIsFetchingUrlCart(false);
  }, [cart]);

  useEffect(() => {
    /// removing so user can add another order when navigating away from this page
    if (cart && cart.status !== "pending" && local_order_id === cart.id)
      localStorage.removeItem("order_id");
  }, [local_order_id, cart]);

  if (
    cart === undefined ||
    (local_order_id != url_order_id && cart === null && isFetchingUrlCart)
  )
    return <Loader className="h-full" />;
  if (cart === null) return notFound();
  if (cart.order_items.length === 0) return <EmptyCart />;

  return (
    <div>
      <BreadCrumb cart />
      <h1 className="text-3xl text-blue-600 font-semibold ml-10">Your cart</h1>
      <div>
        <CartItems cart={cart} />
      </div>
    </div>
  );
}
