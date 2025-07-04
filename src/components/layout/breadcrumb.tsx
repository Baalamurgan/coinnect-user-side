import { findCategoryURL } from "@/lib/category";
import { Category } from "@/services/category/types";
import { Item } from "@/services/item/types";
import Link from "next/link";

const BreadCrumb = ({
  cart = false,
  category,
  categories,
  item,
}: {
  cart?: boolean;
  category?: Category;
  categories: Category[];
  item?: Item;
}) => {
  const categorySlugs = category
    ? findCategoryURL(category, categories).split("/")
    : [];
  return (
    <div className="my-10 bg-gray-200 px-6 py-6 w-full">
      <div className="flex flex-wrap items-center gap-x-1 text-sm text-gray-600">
        <Link href="/">
          <p className="hover:text-gray-800">Home</p>
        </Link>
        {categorySlugs.map((s) => {
          const slug_category = categories.find((c) => c.slug === s);
          if (!slug_category) return null;
          return (
            <BreadCrumbItem
              key={s}
              label={slug_category.name}
              link={
                category && slug_category.slug === category.slug && !item
                  ? ""
                  : `/category/${findCategoryURL(slug_category, categories)}`
              }
            />
          );
        })}
        {item && <BreadCrumbItem label={item.name} />}
        {cart && <BreadCrumbItem label={"Cart"} />}
      </div>
    </div>
  );
};

const BreadCrumbItem = ({
  label,
  link = "",
}: {
  label: string;
  link?: string;
}) => {
  return link ? (
    <Link href={link}>
      <p className="hover:text-gray-800 flex items-center gap-x-1 whitespace-nowrap">
        <span className="text-xl">/</span> {label}
      </p>
    </Link>
  ) : (
    <p className="hover:text-gray-800 flex items-center gap-x-1 whitespace-nowrap">
      <span className="text-xl">/</span> {label}
    </p>
  );
};

export default BreadCrumb;
