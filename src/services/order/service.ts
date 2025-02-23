import { createFetcher, ROUTES } from "../api";
import { AddItemToOrderPayload, Cart } from "./types";

const create = createFetcher<
  Cart,
  {
    user_id?: string;
  },
  unknown
>({
  url: ROUTES.ORDER.CREATE,
  method: "POST",
  //   withTokenKey: "profile_token",
});

const getById = createFetcher<
  Cart,
  unknown,
  {
    order_id: string;
  }
>({
  url: ({ order_id }) => ROUTES.ORDER.GETBYID({ order_id }),
  method: "GET",
});

const confirm = createFetcher<
  string,
  {
    user_id: string;
  },
  {
    order_id: string;
  }
>({
  url: ({ order_id }) => ROUTES.ORDER.CONFIRM({ order_id }),
  method: "POST",
});

const addItem = createFetcher<Cart, AddItemToOrderPayload, unknown>({
  url: ROUTES.ORDER.ITEM.ADD,
  method: "POST",
});

const removeItem = createFetcher<
  string,
  unknown,
  {
    order_id: string;
    order_item_id: string;
  }
>({
  url: (p: { order_id: string; order_item_id: string }) =>
    ROUTES.ORDER.ITEM.REMOVE(p),
  method: "DELETE",
});

export const orderService = {
  create,
  getById,
  confirm,
  addItem,
  removeItem,
};
