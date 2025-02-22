"use client";

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
  fetchCart: () => Promise<void>;
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

  const fetchCart = async () => {
    setCart(undefined);
    setLoading(true);
    const order_id = localStorage.getItem("order_id") as string | undefined;
    if (order_id) {
      const response = await orderService.getById(
        {},
        {},
        {
          order_id,
        }
      );
      if (response.error) setCart(null);
      else if (response.data) {
        localStorage.setItem("order_id", response.data.id);
        setCart(response.data);
      }
    } else {
      setCart(null);
    }
    setLoading(false);
  };

  const addItemToCartHandler = async ({
    item_id,
    quantity = 1,
  }: {
    order_id?: string;
    item_id: string;
    quantity?: number;
  }): Promise<{ success: boolean }> => {
    const local_order_id = localStorage.getItem("order_id") as
      | string
      | undefined;

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
        await fetchCart();
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
