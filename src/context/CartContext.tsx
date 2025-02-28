"use client";

import { getLocal } from "@/lib/localStorage";
import { orderService } from "@/services/order/service";
import { Cart } from "@/services/order/types";
import { useRouter } from "next/navigation";
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

export type ConfimOrderModalVariant = "add_item" | "confirm_order" | "";

interface CartContextType {
  cart: Cart | null | undefined;
  setCart: Dispatch<SetStateAction<Cart | null | undefined>>;
  loading: boolean;
  isConfirmOrderModalSuccessModalOpen: ConfimOrderModalVariant;
  setIsConfirmOrderModalSuccessModalOpen: Dispatch<
    SetStateAction<ConfimOrderModalVariant>
  >;
  fetchCart: (order_id?: string) => Promise<Cart | null>;
  removeItemFromCartHandler: (p: {
    order_id: string;
    order_item_id: string;
  }) => Promise<{
    success: boolean;
  }>;
  addItemToCartHandler: (p: {
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
    isConfirmOrderModalSuccessModalOpen,
    setIsConfirmOrderModalSuccessModalOpen,
  ] = useState<ConfimOrderModalVariant>("");
  const { push } = useRouter();

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
      if (response.error) {
        setCart(null);
        if (response.error.response?.data.message === "not found")
          localStorage.removeItem("order_id");
        return null;
      } else if (response.data) {
        // if (response.data.status !== "pending") {
        //   localStorage.removeItem("order_id");
        //   setCart(null);
        //   return null;
        // }
        if (!order_id_prop) localStorage.setItem("order_id", response.data.id);
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
    const local_user_id = getLocal("user_id") || "";
    let order_id = local_order_id || "";

    if (!local_order_id) {
      const response = await orderService.create(
        {
          user_id: local_user_id,
        },
        {},
        {}
      );
      if (response.error) {
        setCart(null);
        toast.error("Something went wrong. Please refresh and try again");
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
        if (
          response.error.response?.data.message === "order confirmed already"
        ) {
          localStorage.removeItem("order_id");
          toast.error(
            "Your previous order has already been confirmed by our team. Please check your order details."
          );
          push(`/cart/${order_id}`);
          return { success: false };
        }
        return { success: false };
      } else if (response.data) {
        toast.success("Item added to cart");
        await fetchCart(order_id);
        return { success: true };
      }
    }
    return { success: false };
  };

  const removeItemFromCartHandler = async ({
    order_id,
    order_item_id,
  }: {
    order_id: string;
    order_item_id: string;
  }): Promise<{ success: boolean }> => {
    if (order_id) {
      const response = await orderService.removeItem(
        {},
        {},
        {
          order_id,
          order_item_id,
        }
      );
      if (response.error) {
        setCart(null);
        toast.error("Something went wrong. Please try again");
        return { success: false };
      } else if (response.data) {
        toast.success("Item removed to cart");
        await fetchCart(order_id);
        return { success: true };
      }
    }
    return { success: false };
  };

  const value = {
    cart,
    setCart,
    loading,
    isConfirmOrderModalSuccessModalOpen,
    setIsConfirmOrderModalSuccessModalOpen,
    fetchCart,
    addItemToCartHandler,
    removeItemFromCartHandler,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
