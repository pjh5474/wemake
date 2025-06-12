import type { Route } from "./+types/product-reviews-page";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Reviews | WeMake" },
    { name: "description", content: "Read and write product reviews" },
  ];
};

export default function ProductReviewsPage() {
  return (
    <div>
      <h1>Product Reviews</h1>
    </div>
  );
}
