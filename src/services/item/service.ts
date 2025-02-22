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

const getBySlug = createFetcher<
  Item,
  unknown,
  {
    slug: string;
  }
>({
  url: ({ slug }) => ROUTES.ITEM.GETBYSLUG({ slug }),
  method: "GET",
});

export const itemService = {
  getAllOfACategory,
  getBySlug,
};
