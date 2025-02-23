import BreadCrumb from "@/components/layout/breadcrumb";
import CategoryList from "@/components/category/category-list";
import ItemsList from "@/components/category/items-list";
import { categories } from "@/data";
import { itemService } from "@/services/item/service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

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
      <BreadCrumb category={category} />
      <h1 className="text-3xl text-blue-600 font-semibold ml-10">
        {category.name}
      </h1>
      {data && data.length > 0 ? (
        <ItemsList category={category} items={data} />
      ) : (
        <CategoryList category={category} items={data} />
      )}
    </div>
  );
}
