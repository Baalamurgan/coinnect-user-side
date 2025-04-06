import ItemInformation from "@/components/item/item-information";
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

  const { data } = await itemService.getBySlug(
    {},
    {},
    {
      slug,
    }
  );

  let categories = null;

  const response = await getCategories();
  if (response.error) {
    notFound();
  } else if (response.data) {
    categories = response.data.categories;
  }

  if (!categories) return notFound();

  const category = categories.find((c) => c.id === data?.category_id);

  if (!data || !category) return notFound();

  return (
    <div>
      <BreadCrumb category={category} categories={categories} item={data} />
      <ItemInformation
        category={category}
        item={data}
        categories={categories}
      />
      {/* <h1 className="text-3xl text-blue-600 font-semibold">
        {sentencize(category.name)}
      </h1> */}

      {/* {data && data.length > 0 ? (
        <ItemsList category={category} items={data} />
      ) : (
        <CategoryList category={category} items={data} />
      )} */}
    </div>
  );
}
