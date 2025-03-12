import { Item } from "../item/types";

export type Cart = {
  id: string;
  user_id: string;
  order_items: OrderItem[];
  billable_amount: number;
  billable_amount_paid: number;
  status: OrderStatus;
  shipping_id: string;
  delivery_id: string;
  status_date: number;
  cancellation_reason: string;
  created_at: number;
  updated_at: number;
};

export type OrderItem = {
  billable_amount: number;
  billable_amount_paid: number;
  created_at: number;
  id: string;
  item_id: string;
  order_id: string;
  order_item_status: OrderItemStatus;
  quantity: number;
  updated_at: number;
  metadata: Omit<Item, "id" | "updated_at" | "created_at" | "slug"> | null;
};

export type OrderStatus =
  | "pending"
  | "booked"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";
export type OrderItemStatus = "pending" | "booked" | "cancelled";

export type AddItemToOrderPayload = {
  order_id: string;
  item_id: string;
  quantity: number;
};

export type UpdateItemsQuantityPayload = {
  order_item_id: string;
  quantity: number;
};
