import { Item } from "../item/types";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  parent_category_id: string | null;
  items: Item[] | null;
  created_at: number;
  updated_at: number;
};
