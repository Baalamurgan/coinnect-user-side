"use client";

import { useCart } from "@/context/CartContext";
import { findCategoryURL } from "@/lib/category";
import displayPrice from "@/lib/price";
import { cn, sentencize } from "@/lib/utils";
import clearCachesByServerAction from "@/server/server";
import { Category } from "@/services/category/types";
import { Item } from "@/services/item/types";
import { orderService } from "@/services/order/service";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Tabs from "../ui/tabs";

const ItemInformation = ({
  item,
  category,
  categories,
}: {
  item: Item;
  category: Category;
  categories: Category[];
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, startTransition] = useTransition();
  const {
    cart,
    addItemToCartHandler,
    removeItemFromCartHandler,
    setOrderSuccessModalType,
    fetchCart,
  } = useCart();
  const pathname = usePathname();

  const itemAlreadyPresentInCart = useMemo(
    () => cart?.order_items.find((o) => o.item_id === item.id),
    [cart, item.id]
  );

  useEffect(() => {
    if (itemAlreadyPresentInCart)
      setQuantity(itemAlreadyPresentInCart.quantity);
  }, [cart, itemAlreadyPresentInCart]);

  const removeItemFromCart = useCallback(async () => {
    if (!cart || !itemAlreadyPresentInCart) return;
    const response = await removeItemFromCartHandler({
      order_id: cart.id,
      order_item_id: itemAlreadyPresentInCart.id,
    });
    if (response.success) {
      setQuantity(1);
      clearCachesByServerAction(pathname);
    }
  }, [cart, itemAlreadyPresentInCart, pathname, removeItemFromCartHandler]);

  const updateItemsQuantityHandler = useCallback(async () => {
    if (!cart || !itemAlreadyPresentInCart) return;
    const response = await orderService.updateItemsQuantity({
      order_item_id: itemAlreadyPresentInCart.id,
      quantity,
    });
    if (response.data) {
      await fetchCart();
      setQuantity(quantity);
      clearCachesByServerAction(pathname);
      toast.success("Updated item's quantity successfully!");
    } else toast.error("Something went wrong. Please try again");
  }, [cart, itemAlreadyPresentInCart, pathname, quantity, fetchCart]);

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
          <div className="flex flex-col">
            <div className="flex items-center gap-x-2">
              {item.stock > 1 || itemAlreadyPresentInCart ? (
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={cart && itemAlreadyPresentInCart ? 0 : 1}
                  max={
                    cart && itemAlreadyPresentInCart
                      ? itemAlreadyPresentInCart.quantity + item.stock
                      : item.stock
                  }
                  className="max-w-[60px] border-[0.1px] h-7 border-green-500 border-solid"
                />
              ) : null}
              <Button
                className={cn(
                  "my-3 h-5 w-[100px] cursor-pointer",
                  quantity === 0 ||
                    (itemAlreadyPresentInCart &&
                      item.stock === 0 &&
                      quantity === itemAlreadyPresentInCart.quantity)
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                )}
                loading={isLoading}
                onClick={async () => {
                  startTransition(async () => {
                    if (itemAlreadyPresentInCart && cart) {
                      if (
                        quantity === 0 ||
                        (itemAlreadyPresentInCart &&
                          item.stock === 0 &&
                          quantity === itemAlreadyPresentInCart.quantity)
                      ) {
                        removeItemFromCart();
                      } else {
                        updateItemsQuantityHandler();
                      }
                    } else {
                      const response = await addItemToCartHandler({
                        item_id: item.id,
                        quantity,
                      });
                      if (response.success) {
                        setOrderSuccessModalType("add_item");
                        setQuantity(1);
                        clearCachesByServerAction(pathname);
                      } else
                        toast.error("Something went wrong. Please try again");
                    }
                  });
                }}
              >
                {itemAlreadyPresentInCart
                  ? quantity === 0 ||
                    (itemAlreadyPresentInCart &&
                      item.stock === 0 &&
                      quantity === itemAlreadyPresentInCart.quantity)
                    ? `Remove from cart`
                    : `Update cart`
                  : `Add to cart (${quantity})`}
              </Button>
            </div>
            {cart && itemAlreadyPresentInCart && (
              <p className="text-sm">
                Currently in cart: {itemAlreadyPresentInCart.quantity}
              </p>
            )}
          </div>
          <hr />
          <div className="flex items-center gap-x-5 text-sm">
            {/* <p>
              <span className="font-medium">SKU:</span> {item.sku}
            </p> */}
            <div className="flex items-center">
              <p className="font-medium">Category:</p>
              <Link href={`/category/${findCategoryURL(category, categories)}`}>
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
