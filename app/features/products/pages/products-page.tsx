import type { Route } from "~/types";
import { type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Products | wemake" },
    {
      name: "description",
      content: "Discover the latest products from our community",
    },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function ProductsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">Products</h1>
      <p className="mt-4 text-gray-600">
        Discover the latest products from our community
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Product cards will be rendered here */}
      </div>
    </div>
  );
}
