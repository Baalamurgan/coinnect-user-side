import CategoryList from "@/components/category/category-list";
import ItemsList from "@/components/category/items-list";
import BreadCrumb from "@/components/layout/breadcrumb";
import { getCategories } from "@/lib/getCategories";
import { itemService } from "@/services/item/service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  let categories = null;

  const response = await getCategories();
  if (response.error) {
    notFound();
  } else if (response.data) {
    categories = response.data.categories;
  }

  if (!categories) return notFound();

  const category = categories.find((c) => c.slug === slug.at(-1));

  if (!category) return notFound();

  const { data } = await itemService.getAllOfACategory(
    {},
    {},
    {
      category_id: category.id,
    }
  );

  return (
    <div>
      <BreadCrumb category={category} categories={categories} />
      <h1 className="text-3xl text-blue-600 font-semibold ml-10">
        {category.name}
      </h1>
      {data && data.length > 0 ? (
        <ItemsList category={category} items={data} />
      ) : (
        <CategoryList
          category={category}
          categories={categories}
          items={data}
        />
      )}
    </div>
  );
}
