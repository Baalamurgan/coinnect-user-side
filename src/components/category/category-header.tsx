import { categories } from "@/data";
import { findCategoryURL } from "@/lib/category";
import { Category } from "@/services/category/types";
import Link from "next/link";

const CategoryHeader = ({
  category,
  slug,
}: {
  category: Category;
  slug: string[];
}) => {
  return (
    <div className="my-10 bg-gray-200 px-8 py-6 w-full">
      <div className="flex items-center gap-x-1 text-sm text-gray-600">
        <span>
          <Link href="/">
            <p className="hover:text-gray-800">Home</p>
          </Link>
        </span>
        {slug.map((s) => {
          const slug_category = categories.find((c) => c.slug === s);
          if (!slug_category) return null;
          if (category.slug === s)
            return (
              <div key={s}>
                <p className="hover:text-gray-800">/ {slug_category.name}</p>
              </div>
            );
          return (
            <div key={s}>
              <Link href={`/category/${findCategoryURL(slug_category)}`}>
                <p className="hover:text-gray-800">/ {slug_category.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryHeader;
