import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import type { Route } from "./+types/category-page";
import ProductPagination from "~/common/components/product-pagination";
import { data } from "react-router";
import { z } from "zod";
import {
	getCategoryById,
	getCategoryPagesByCategoryId,
	getProductsByCategoryId,
} from "../queries";
import { paginationValidationSchema } from "~/common/utils/pagination-validation-schema";
import { makeSSRClient } from "~/supa-client";

const paramSchema = z.object({
	categoryId: z.coerce.string().transform((val) => parseInt(val)),
});

export const meta: Route.MetaFunction = ({ data }: Route.MetaArgs) => {
	return [
		{ title: `${data?.category.name} | wemake` },
		{
			name: "description",
			content: `Browse Developer Tools products`,
		},
	];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { serverSideClient } = makeSSRClient(request);
	const { categoryId } = params;
	const url = new URL(request.url);

	const { success: paramParseSuccess, data: parsedData } =
		paramSchema.safeParse({ categoryId });
	if (!paramParseSuccess) {
		throw data({
			message: "Invalid category ID",
			status: 400,
		});
	}

	const { success: pageParseSuccess, data: parsedPage } =
		paginationValidationSchema.safeParse(Object.fromEntries(url.searchParams));
	if (!pageParseSuccess) {
		throw data({
			message: "Invalid page",
			status: 400,
		});
	}

	const [category, products, totalPages] = await Promise.all([
		getCategoryById(serverSideClient, {
			categoryId: parsedData.categoryId,
		}),
		getProductsByCategoryId(serverSideClient, {
			categoryId: parsedData.categoryId,
			page: parsedPage.page,
		}),
		getCategoryPagesByCategoryId(serverSideClient, {
			categoryId: parsedData.categoryId,
		}),
	]);

	return { products, category, totalPages };
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
	return (
		<div className="space-y-10">
			<Hero
				title={loaderData.category.name}
				subtitle={loaderData.category.description}
			/>
			<div className="space-y-5 w-full max-w-screen-md mx-auto">
				{loaderData.products.map((product) => (
					<ProductCard
						id={product.product_id}
						name={product.name}
						tagline={product.tagline}
						reviewsCount={product.reviews}
						viewsCount={product.views}
						votesCount={product.upvotes}
						key={`productCardId-${product.product_id}`}
					/>
				))}
			</div>
			<ProductPagination totalPages={loaderData.totalPages} />
		</div>
	);
}
