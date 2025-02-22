import { categories } from "@/data";
import { Category } from "@/services/category/types";

const CATEGORY_URL_SEPARATOR = "/";

export const findCategoryURL = (
  category: Category,
  existingURL?: string
): string => {
  const url = existingURL || "";
  if (!category.parent_category_id)
    return category.slug + (existingURL ? CATEGORY_URL_SEPARATOR : "") + url;
  const parent_category = categories.find(
    (c) => c.id === category.parent_category_id
  );
  if (!parent_category) return url;
  return findCategoryURL(
    parent_category,
    category.slug + (existingURL ? CATEGORY_URL_SEPARATOR : "") + url
  );
};
