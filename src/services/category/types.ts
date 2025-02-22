import { Item } from "../item/types";

export type Category = {
  id: string;
  name: string;
  description: string;
  parent_category_id: null;
  items: Item[];
  created_at: number;
  updated_at: number;
};
