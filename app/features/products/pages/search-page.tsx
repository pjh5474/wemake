import type { Route } from "~/types";
import { Form, type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Search Products | wemake" },
    {
      name: "description",
      content: "Search for products in our community",
    },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  return { query };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function SearchPage({
  loaderData,
  actionData,
}: Route.ComponentProps<{ query: string }>) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">Search Products</h1>

      <Form method="get" className="mt-8">
        <div className="flex gap-4">
          <input
            type="search"
            name="q"
            defaultValue={loaderData.query}
            placeholder="Search for products..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            Search
          </button>
        </div>
      </Form>

      <div className="mt-8">
        {loaderData.query ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Search results will be rendered here */}
          </div>
        ) : (
          <p className="text-gray-600">Enter a search term to find products</p>
        )}
      </div>
    </div>
  );
}
