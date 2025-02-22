import { createFetcher, ROUTES } from "../api";
import { Order } from "./types";

const create = createFetcher<
  Order[] | null,
  {
    user_id: string;
  },
  unknown
>({
  url: ROUTES.ORDER.CREATE,
  method: "POST",
  //   withTokenKey: "profile_token",
});

export const orderService = {
  create,
  // addItem,
  // removeItem,
  // delete,
};
