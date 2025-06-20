import type { Route } from "./+types/profile-products-page";
import { ProductCard } from "~/features/products/components/product-card";
import { getUserProductsByUsername } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { serverSideClient } = makeSSRClient(request);
	const products = await getUserProductsByUsername(serverSideClient, {
		username: params.username,
	});
	return { products };
};

export default function ProfileProductsPage({
	loaderData,
}: Route.ComponentProps) {
	return (
		<div className="flex flex-col gap-5">
			{loaderData.products.map((product) => (
				<ProductCard
					id={product.product_id}
					name={product.name}
					tagline={product.tagline}
					reviewsCount={product.reviews}
					viewsCount={product.views}
					votesCount={product.upvotes}
					key={`productId-${product.product_id}`}
				/>
			))}
		</div>
	);
}
