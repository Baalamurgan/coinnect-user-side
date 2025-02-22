import CategoryPage from "@/components/category/category-page";
import { categories } from "@/data";
import { notFound } from "next/navigation";

export default function Page({ params }: { params: { slug: string[] } }) {
  console.log(params.slug);

  const category = categories.find((c) => c.slug === params.slug.at(-1));

  if (!category) return notFound();

  return <CategoryPage category={category} />;
}
