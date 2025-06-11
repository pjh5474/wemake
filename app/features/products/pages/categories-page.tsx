import type { Route } from "~/types";
import { Link, type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Categories | wemake" },
    {
      name: "description",
      content: "Discover the categories of products in our community",
    },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  // 실제로는 데이터베이스에서 카테고리 목록을 가져와야 합니다
  const categories = [
    { id: "productivity", name: "Productivity" },
    { id: "developer-tools", name: "Developer Tools" },
    { id: "design-tools", name: "Design Tools" },
    { id: "ai-ml", name: "AI & Machine Learning" },
  ];

  return { categories };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function CategoriesPage({
  loaderData,
  actionData,
}: Route.ComponentProps<{ categories: Array<{ id: string; name: string }> }>) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">Categories</h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loaderData.categories.map((category) => (
          <Link
            key={category.id}
            to={`/products/categories/${category.id}`}
            className="block p-6 border rounded-lg hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
