import { createFetcher, ROUTES } from "@/services/api";
import { Item } from "./types";

const getAllOfACategory = createFetcher<
  Item[],
  unknown,
  {
    category_id: string;
  }
>({
  url: ({ category_id }) => ROUTES.ITEM.GETALLOFACATEGORY({ category_id }),
  method: "GET",
});

export const itemService = {
  getAllOfACategory,
};
