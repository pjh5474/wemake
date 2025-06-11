import type { Route } from "~/types";
import { type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Category | wemake" },
    {
      name: "description",
      content: "Discover amazing products in the category",
    },
  ];
};

export function loader({ request, params }: Route.LoaderArgs) {
  const { category } = params;
  // 실제로는 데이터베이스에서 카테고리 정보를 가져와야 합니다
  const categoryInfo = {
    id: category,
    name:
      category?.charAt(0).toUpperCase() + category?.slice(1).replace(/-/g, " "),
    description: `Discover amazing products in the ${category} category.`,
  };

  return { category: categoryInfo };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function CategoryPage({
  loaderData,
  actionData,
}: Route.ComponentProps<{
  category: { id: string; name: string; description: string };
}>) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">{loaderData.category.name}</h1>
      <p className="mt-4 text-gray-600">{loaderData.category.description}</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product cards will be rendered here */}
      </div>
    </div>
  );
}
