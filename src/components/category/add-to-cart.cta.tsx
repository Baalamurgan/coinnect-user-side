"use client";

import { useCart } from "@/context/CartContext";
import { Item } from "@/services/item/types";
import { useTransition } from "react";
import { Button } from "../ui/button";

const AddToCartCTA = ({ item }: { item: Item }) => {
  const [isLoading, startTransition] = useTransition();
  const { addItemToCartHandler, setOrderSuccessModalType } = useCart();

  return (
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
  );
};

export default AddToCartCTA;
