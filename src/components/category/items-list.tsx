import { Category } from "@/services/category/types";
import { Item } from "@/services/item/types";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

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
  return (
    <div className=" shadow-lg rounded-md flex flex-col gap-y-6 items-center p-3 border border-blue-100">
      <Link href={`/product/${item.name}`}>
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
        ₹{item.price.toFixed(2)} +
        <span className="text-xs"> {item.gst}% GST</span>
      </p>
      <Button className="cursor-pointer h-6">Add to cart</Button>
    </div>
  );
};

export default ItemsList;
