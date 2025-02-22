import { categories } from "@/data";
import { findCategoryURL } from "@/lib/category";
import { Category } from "@/services/category/types";
import { Item } from "@/services/item/types";
import Link from "next/link";
import { Fragment } from "react";

const BreadCrumb = ({
  category,
  item,
}: {
  category: Category;
  item?: Item;
}) => {
  const categorySlugs = findCategoryURL(category).split("/");
  return (
    <div className="my-10 bg-gray-200 px-8 py-6 w-full">
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
                slug_category.slug === category.slug && !item
                  ? ""
                  : `/category/${findCategoryURL(slug_category)}`
              }
            />
          );
        })}
        {item && <BreadCrumbItem label={item.name} />}
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
  const Component = link ? Link : Fragment;
  return (
    <Component href={link}>
      <p className="hover:text-gray-800 flex items-center gap-x-1 whitespace-nowrap">
        <span className="text-xl">/</span> {label}
      </p>
    </Component>
  );
};

export default BreadCrumb;
