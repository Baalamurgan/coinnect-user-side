import { Item } from "@/services/item/types";

export const findItemURL = (item: Item): string => {
  return item.slug;
};
