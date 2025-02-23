"use client";

import { findCategoryURL } from "@/lib/category";
import displayPrice from "@/lib/price";
import { sentencize } from "@/lib/utils";
import { Category } from "@/services/category/types";
import { Item } from "@/services/item/types";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Tabs from "../ui/tabs";
import { useCart } from "@/context/CartContext";

const ItemInformation = ({
  item,
  category,
}: {
  item: Item;
  category: Category;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, startTransition] = useTransition();
  const { addItemToCartHandler, setIsConfirmOrderModalSuccessModalOpen } =
    useCart();
  return (
    <div>
      <div className="flex gap-x-8">
        <div>
          <div className="max-h-[150px] max-w-[320px]">
            <Image
              width={450}
              height={240}
              src={item.image_url}
              alt={`coin - ${item.name}`}
              className="group-hover:scale-105"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <p className="text-blue-600 font-medium text-lg">{item.name}</p>
          <p>{displayPrice({ price: item.price, gst: item.gst })}</p>
          {item.stock >= 1 ? (
            <p className="text-green-600">{item.stock} in stock</p>
          ) : (
            <p className="text-lg text-red-600">No stock available</p>
          )}
          <hr />
          <div className="flex items-center gap-x-2">
            {item.stock > 1 ? (
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                max={item.stock}
                className="max-w-[60px] border-[0.1px] h-7 border-green-500 border-solid"
              />
            ) : null}
            <Button
              className="my-3 bg-green-600 hover:bg-green-700 h-5 w-[100px] cursor-pointer"
              loading={isLoading}
              onClick={async () => {
                startTransition(async () => {
                  const response = await addItemToCartHandler({
                    item_id: item.id,
                    quantity,
                  });
                  if (response.success) {
                    setIsConfirmOrderModalSuccessModalOpen("add_item");
                  }
                });
              }}
            >
              Add to cart ({quantity})
            </Button>
          </div>
          <hr />
          <div className="flex items-center gap-x-5 text-sm">
            <p>
              <span className="font-medium">SKU:</span> {item.sku}
            </p>
            <div className="flex items-center">
              <p className="font-medium">Category:</p>
              <Link href={`/category/${findCategoryURL(category)}`}>
                <p className="text-blue-600 hover:text-blue-800 ml-1">
                  {item.year}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Tabs
          tabs={["description", "additional_information"]}
          render={{
            description: (
              <div>
                <p className="text-green-700 text-2xl font-medium">
                  Description
                </p>
                <p>{item.description}</p>
              </div>
            ),
            additional_information: (
              <div>
                <p className="text-green-700 text-2xl font-medium">
                  Additional Information
                </p>
                <div className="flex flex-col gap-y-3 mt-5">
                  {item.details.map((detail) => (
                    <div key={detail.id} className="grid grid-cols-2 gap-x-10">
                      <p className="font-semibold">
                        {sentencize(detail.attribute)}
                      </p>
                      <p>{detail.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default ItemInformation;
