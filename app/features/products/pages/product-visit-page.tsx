import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/product-visit-page";
import { z } from "zod";

const paramSchema = z.object({
	productId: z.string().transform((val) => parseInt(val)),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { serverSideClient } = makeSSRClient(request);
	const { success, data: parsedParams } = paramSchema.safeParse(params);
	if (!success) {
		throw new Error("Invalid product ID");
	}

	const { error, data } = await serverSideClient
		.from("products")
		.select("url")
		.eq("product_id", parsedParams.productId)
		.single();
	if (data) {
		await serverSideClient.rpc("track_event", {
			event_type: "product_visit",
			event_data: {
				product_id: params.productId,
			},
		});
		return redirect(data.url);
	}
};
