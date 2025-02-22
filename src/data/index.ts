import { Category } from "@/services/category/types";
import categoriesJson from "./categories.json";

export const categories = categoriesJson.sort((a, b) =>
  a.created_at < b.created_at ? -1 : 1
) as (Category & {
  slug: string;
})[];
