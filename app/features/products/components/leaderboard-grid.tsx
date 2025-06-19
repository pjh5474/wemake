import { Link } from "react-router";
import { ProductCard } from "./product-card";
import { Button } from "~/common/components/ui/button";

interface Product {
  product_id: number;
  name: string;
  description: string;
  reviews: string;
  views: string;
  upvotes: string;
}

interface LeaderboardGridProps {
  title: string;
  description: string;
  products: Product[];
  linkTo: string;
  keyPrefix: string;
  buttonText: string;
}

export function LeaderboardGrid({
  title,
  description,
  products,
  linkTo,
  keyPrefix,
  buttonText,
}: LeaderboardGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      <div>
        <h2 className="text-3xl font-bold leading-tight tracking-tight">
          {title}
        </h2>
        <p className="text-xl font-light text-foreground">{description}</p>
      </div>
      {products.map((product) => (
        <ProductCard
          id={product.product_id.toString()}
          name={product.name}
          description={product.description}
          reviewsCount={product.reviews}
          viewsCount={product.views}
          votesCount={product.upvotes}
          key={`${keyPrefix}-${product.product_id}`}
        />
      ))}
      <Button variant="link" asChild className="text-lg self-center">
        <Link to={linkTo}>{buttonText} &rarr;</Link>
      </Button>
    </div>
  );
}
