import { sentencize } from "@/lib/utils";
import { Category } from "@/services/category/types";

const CategoryPage = ({ category }: { category: Category }) => {
  return <div>Category = {sentencize(category.name)}</div>;
};

export default CategoryPage;
