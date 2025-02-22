import BreadCrumb from "@/components/layout/breadcrumb";
import ItemInformation from "@/components/item/item-information";
import { categories } from "@/data";
import { itemService } from "@/services/item/service";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const { data } = await itemService.getBySlug(
    {},
    {},
    {
      slug,
    }
  );

  const category = categories.find((c) => c.id === data?.category_id);

  if (!data || !category) return notFound();

  return (
    <div>
      <BreadCrumb category={category} item={data} />
      <ItemInformation category={category} item={data} />
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
