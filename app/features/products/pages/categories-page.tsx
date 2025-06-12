import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import { CategoryCard } from "../components/category-card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Categories | wemake" },
    {
      name: "description",
      content: "Discover the categories of products in our community",
    },
  ];
};

export default function CategoriesPage() {
  return (
    <div>
      <Hero title="Categories" subtitle="Browse products by category" />
      <div className="grid grid-cols-4 gap-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <CategoryCard
            id={`categoryId-${index}`}
            name="Category Name"
            description="Category Description"
            key={`categoryId-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
