"use client";

import { useCart } from "@/context/CartContext";
import { findItemURL } from "@/lib/item";
import displayPrice from "@/lib/price";
import { Category } from "@/services/category/types";
import { Item } from "@/services/item/types";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { Button } from "../ui/button";

const ItemsList = ({ items }: { items: Item[]; category: Category }) => {
  return (
    <div className="mt-10 flex gap-x-10 gap-y-3">
      {items.map((item) => {
        return (
          <div key={item.id}>
            <ItemCard item={item} />
          </div>
        );
      })}
    </div>
  );
};

const ItemCard = ({ item }: { item: Item }) => {
  const [isLoading, startTransition] = useTransition();
  const { addItemToCartHandler, setIsItemAddedToCartSuccessModalOpen } =
    useCart();
  return (
    <div className=" shadow-lg rounded-md flex flex-col gap-y-6 items-center p-3 border border-blue-100">
      <Link href={`/item/${findItemURL(item)}`}>
        <div className="flex flex-col items-center gap-y-4 group cursor-pointer max-w-[200px] transition-all">
          <div className="max-h-[100px] max-w-[200px]">
            <Image
              width={200}
              height={160}
              src={item.image_url}
              alt={`coin - ${item.name}`}
              className="group-hover:scale-105"
            />
          </div>
          <p className="text-sm text-blue-600 group-hover:text-blue-950 text-center">
            {item.name}
          </p>
        </div>
      </Link>
      <p className="text-sm">
        {displayPrice({ price: item.price, gst: item.gst })}
      </p>
      <Button
        className="cursor-pointer h-6"
        loading={isLoading}
        onClick={async () => {
          startTransition(async () => {
            const response = await addItemToCartHandler({
              item_id: item.id,
            });
            if (response.success) setIsItemAddedToCartSuccessModalOpen(true);
          });
        }}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ItemsList;
