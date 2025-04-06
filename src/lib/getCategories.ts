import { apiRoute, ErrorResponse } from "@/services/api";
import { Category } from "@/services/category/types";
import { WithPagination } from "@/services/types";

// ISR-style caching
export const getCategories: () => Promise<{
  data?: WithPagination<{ categories: Category[] }>;
  error?: ErrorResponse;
}> = () => {
  return fetch(apiRoute(`/category`), {
    next: {
      revalidate: 3600,
      tags: ["categories"],
    },
  })
    .then(async (res) => {
      const data = await res.json();
      return data;
    })
    .catch((err) => {
      return err;
    });
};
