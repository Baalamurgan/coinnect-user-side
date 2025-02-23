"use client";

import { getLocal } from "@/lib/localStorage";
import { orderService } from "@/services/order/service";
import { Cart } from "@/services/order/types";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

interface CartContextType {
  cart: Cart | null | undefined;
  loading: boolean;
  isItemAddedToCartSuccessModalOpen: boolean;
  setIsItemAddedToCartSuccessModalOpen: Dispatch<SetStateAction<boolean>>;
  fetchCart: (_order_id?: string) => Promise<Cart | null>;
  addItemToCartHandler: ({
    item_id,
    quantity,
  }: {
    order_id?: string;
    item_id: string;
    quantity?: number;
  }) => Promise<{ success: boolean }>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | undefined | null>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [
    isItemAddedToCartSuccessModalOpen,
    setIsItemAddedToCartSuccessModalOpen,
  ] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async (order_id_prop?: string) => {
    console.log("fetching cart");
    setCart(undefined);
    setLoading(true);
    const order_id = order_id_prop || getLocal("order_id");
    if (order_id) {
      const response = await orderService.getById(
        {},
        {},
        {
          order_id,
        }
      );
      console.log({ order_id, response });

      if (response.error) {
        setCart(null);
        return null;
      } else if (response.data) {
        localStorage.setItem("order_id", response.data.id);
        setCart(response.data);
        return response.data;
      }
    } else {
      setCart(null);
      return null;
    }
    setLoading(false);
    return null;
  };

  const addItemToCartHandler = async ({
    item_id,
    quantity = 1,
  }: {
    order_id?: string;
    item_id: string;
    quantity?: number;
  }): Promise<{ success: boolean }> => {
    const local_order_id = getLocal("order_id");
    let order_id = local_order_id || "";

    if (!local_order_id) {
      const response = await orderService.create({}, {}, {});
      if (response.error) {
        setCart(null);
        toast.error("Something went wrong. Please try again");
        return { success: false };
      } else if (response.data) {
        localStorage.setItem("order_id", response.data.id);
        order_id = response.data.id;
        setCart(response.data);
      }
    }

    if (order_id) {
      const response = await orderService.addItem(
        {
          order_id,
          item_id,
          quantity,
        },
        {}
      );
      if (response.error) {
        setCart(null);
        toast.error("Something went wrong. Please try again");
        return { success: false };
      } else if (response.data) {
        toast.success("Item added to cart");
        await fetchCart(order_id);
        return { success: true };
      }
    }
    return { success: false };
  };

  const value = {
    cart,
    loading,
    isItemAddedToCartSuccessModalOpen,
    setIsItemAddedToCartSuccessModalOpen,
    fetchCart,
    addItemToCartHandler,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
