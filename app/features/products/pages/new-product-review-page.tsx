import type { Route } from "./+types/new-product-review-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Write a Review | WeMake" },
    { name: "description", content: "Share your thoughts about this product" },
  ];
};

export default function NewProductReviewPage() {
  return (
    <div>
      <h1>New Product Review</h1>
    </div>
  );
}
