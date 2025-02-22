import { createFetcher, ROUTES } from "@/services/api";
import { Category } from "./types";
import { WithPagination } from "../types";

const getAll = createFetcher<
  WithPagination<{ categories: Category[] }>,
  unknown,
  {
    page: number;
    limit: number;
  }
>({
  url: ROUTES.CATEGORY.GETALL,
  method: "GET",
});

export const categoryService = {
  getAll,
};
