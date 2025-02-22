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

const addItem = createFetcher<Cart, AddItemToOrderPayload, unknown>({
  url: ROUTES.ORDER.ADDITEM,
  method: "POST",
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

export const orderService = {
  create,
  getById,
  addItem,
  confirm,
  // removeItem,
  // delete,
};
