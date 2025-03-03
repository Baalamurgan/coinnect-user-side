"use client";

import { useCart } from "@/context/CartContext";
import { findItemURL } from "@/lib/item";
import displayPrice from "@/lib/price";
import { cn } from "@/lib/utils";
import { Category } from "@/services/category/types";
import { Item } from "@/services/item/types";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { Button } from "../ui/button";

const ItemsList = ({ items }: { items: Item[]; category: Category }) => {
  return (
    <div className="pt-8 pb-5">
      <div className="flex flex-wrap gap-x-10 gap-y-3 px-10">
        {items.map((item) => {
          return (
            <div key={item.id}>
              <ItemCard item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ItemCard = ({ item }: { item: Item }) => {
  const [isLoading, startTransition] = useTransition();
  const { addItemToCartHandler, setOrderSuccessModalType } = useCart();
  return (
    <div className=" shadow-lg rounded-md flex flex-col items-center p-3 border border-blue-100">
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
      <p className="text-sm mt-6">
        {displayPrice({ price: item.price, gst: item.gst })}
      </p>
      <div
        className={cn(
          "flex flex-col items-center mt-8",
          item.stock === 0 && "!mt-6"
        )}
      >
        {item.stock === 0 ? (
          <p className="text-red-500 text-sm mt-2">Out of stock!</p>
        ) : null}
        <Button
          className="cursor-pointer h-6"
          disabled={item.stock === 0}
          loading={isLoading}
          onClick={async () => {
            startTransition(async () => {
              const response = await addItemToCartHandler({
                item_id: item.id,
              });
              if (response.success) setOrderSuccessModalType("add_item");
            });
          }}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ItemsList;
