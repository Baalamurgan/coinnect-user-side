export default function Page({ params }: { params: { slug: string[] } }) {
  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log(params.slug);

  // const;

  return "...";
}
