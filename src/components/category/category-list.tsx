import { findCategoryURL } from "@/lib/category";
import { Category } from "@/services/category/types";
import { Item } from "@/services/item/types";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const CategoryList = ({
  category,
  categories,
}: {
  category: Category;
  categories: Category[];
  items?: Item[];
}) => {
  const subCategories = categories.filter(
    (c) => c.parent_category_id === category.id
  );
  return (
    <div className="bg-white shadow-md pt-8 pb-5">
      <div className="p-5 px-10">
        {subCategories.length === 0 ? (
          <p className="text-center">No data found</p>
        ) : (
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-8">
            {subCategories.map((category) => {
              return (
                <div key={category.id}>
                  <CategoryCard category={category} categories={categories} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const CategoryCard = ({
  category,
  categories,
}: {
  category: Category;
  categories: Category[];
}) => {
  return (
    <div>
      <Link href={`/category/${findCategoryURL(category, categories)}`}>
        <div className="flex items-center gap-x-1 group cursor-pointer">
          <EnvelopeClosedIcon className="h-5 w-5 group-hover:text-gray-800" />
          <p className="group-hover:text-gray-800 group-hover:underline whitespace-nowrap">
            {category.name}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryList;
