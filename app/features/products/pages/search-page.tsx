import { z } from "zod";
import type { Route } from "./+types/search-page";
import { data, Form } from "react-router";
import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";
import { ProductCard } from "../components/product-card";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { getPagesBySearch, getProductsBySearch } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Search Products | wemake" },
    {
      name: "description",
      content: "Search for products in our community",
    },
  ];
};

const paramsSchema = z.object({
  query: z.string().optional().default(""),
  page: z.coerce.number().int().optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      {
        error_code: "INVALID_PARAMS",
        message: "Invalid params",
      },
      { status: 400 }
    );
  }

  if (parsedData.query.length < 3) {
    return {
      products: [],
      totalPages: 1,
      query: "",
      queryLengthLessThanThree: true,
    };
  }

  const products = await getProductsBySearch({
    query: parsedData.query,
    page: parsedData.page,
  });

  const totalPages = await getPagesBySearch({
    query: parsedData.query,
  });

  return {
    products,
    totalPages,
    query: parsedData.query,
  };
};

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="Search" subtitle="Search for products by title or tagline" />
      <Form className="flex justify-center mx-auto max-w-screen-sm items-center gap-2">
        <Input
          name="query"
          placeholder="Search for products..."
          className="text-lg"
        />
        <Button type="submit">Search</Button>
      </Form>
      {/* Query length less than 3 */}
      {loaderData.queryLengthLessThanThree ? (
        <div className="text-center text-gray-600">
          <h2 className="text-lg font-semibold">
            Search query must be at least 3 characters long
          </h2>
        </div>
      ) : loaderData.products.length === 0 ? (
        <div className="text-center text-gray-600">
          <h2 className="text-lg font-semibold">
            No products found with "{loaderData.query}"
          </h2>
          <p>Try searching for something else</p>
        </div>
      ) : null}

      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {loaderData.products.map((product) => (
          <ProductCard
            id={product.product_id}
            name={product.name}
            tagline={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
            key={`searchProductCardId-${product.product_id}`}
          />
        ))}
      </div>
      {loaderData.products.length > 0 && (
        <ProductPagination totalPages={loaderData.totalPages} />
      )}
    </div>
  );
}
