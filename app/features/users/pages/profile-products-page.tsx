import { useParams } from "react-router";
import type { Route } from "./+types/profile-products-page";
import { ProductCard } from "~/features/products/components/product-card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Profile Products | wemake" },
    { name: "description", content: "View user's products" },
  ];
};

export default function ProfileProductsPage() {
  const { username } = useParams();

  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <ProductCard
          id={index}
          name="Product Name"
          tagline="Product Tagline"
          reviewsCount="12"
          viewsCount="12"
          votesCount="120"
          key={`productId-${index}`}
        />
      ))}
    </div>
  );
}
