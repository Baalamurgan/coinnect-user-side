export type Cart = {
  id: string;
  user_id: string;
  order_items: OrderItem[];
  billable_amount: number;
  billable_amount_paid: number;
  status: OrderStatus;
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
};

export type OrderStatus = "pending" | "booked" | "cancelled";
export type OrderItemStatus = "pending" | "booked" | "cancelled";

export type AddItemToOrderPayload = {
  order_id: string;
  item_id: string;
  quantity: number;
};
