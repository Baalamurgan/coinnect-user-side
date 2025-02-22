import { Item } from "@/services/item/types";

export const findProductURL = (item: Item): string => {
  return item.slug;
};
