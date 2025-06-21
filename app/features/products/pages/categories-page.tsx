import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import { CategoryCard } from "../components/category-card";
import { getCategories } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Categories | wemake" },
		{
			name: "description",
			content: "Discover the categories of products in our community",
		},
	];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	const { serverSideClient } = makeSSRClient(request);
	const categories = await getCategories(serverSideClient);
	return { categories };
};

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
	return (
		<div>
			<Hero title="Categories" subtitle="Browse products by category" />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
				{loaderData.categories.map((category) => (
					<CategoryCard
						id={category.category_id}
						name={category.name}
						description={category.description}
						key={`categoryCardId-${category.category_id}`}
					/>
				))}
			</div>
		</div>
	);
}
