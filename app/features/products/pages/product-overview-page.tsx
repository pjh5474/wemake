import { useOutletContext } from "react-router";
import type { Route } from "./+types/product-overview-page";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { serverSideClient } = makeSSRClient(request);
	await serverSideClient.rpc("track_event", {
		event_type: "product_view",
		event_data: {
			product_id: params.productId,
		},
	});
	return null;
};

export default function ProductOverviewPage() {
	const { productDescription, productHowItWorks } = useOutletContext<{
		productDescription: string;
		productHowItWorks: string;
	}>();
	return (
		<div className="space-y-10">
			<div className="space-y-1">
				<h3 className="text-lg font-bold">What is this product?</h3>
				<p className="text-muted-foreground">{productDescription}</p>
			</div>
			<div className="space-y-1">
				<h3 className="text-lg font-bold">How does it work?</h3>
				<p className="text-muted-foreground">{productHowItWorks}</p>
			</div>
		</div>
	);
}
