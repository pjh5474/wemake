import type { Route } from "./+types/product-overview-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Overview | WeMake" },
    { name: "description", content: "View product details and reviews" },
  ];
};

export default function ProductOverviewPage({
  params: { productId },
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h3 className="text-lg font-bold">What is this product?</h3>
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        </p>
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold">How does it work?</h3>
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        </p>
      </div>
    </div>
  );
}
