import { ChevronUp, StarIcon } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import type { Route } from "./+types/product-overview-layout";
import { cn } from "~/lib/utils";
import { getProductById } from "../queries";
import z from "zod";
import { makeSSRClient } from "~/supa-client";

const paramSchema = z.object({
	productId: z.coerce.string().transform((val) => Number(val)),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { serverSideClient } = makeSSRClient(request);
	const { success, data: parsedParams } = paramSchema.safeParse(params);
	if (!success) {
		throw new Error("Invalid product ID");
	}
	const product = await getProductById(serverSideClient, {
		productId: parsedParams.productId,
	});
	return { product };
};

export const meta: Route.MetaFunction = ({ data }: Route.MetaArgs) => {
	return [
		{ title: `${data?.product.name} Overview | WeMake` },
		{ name: "description", content: data?.product.tagline },
	];
};

export default function ProductOverviewLayout({
	loaderData,
}: Route.ComponentProps) {
	return (
		<div className="space-y-10">
			<div className="flex flex-col lg:flex-row justify-between gap-10">
				<div className="flex gap-10">
					<div className="size-24 md:size-32 lg:size-40 rounded-xl shadow-xl bg-primary/10"></div>
					<div>
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
							{loaderData.product.name}
						</h1>
						<p className="text-lg md:text-xl lg:text-2xl  font-light">
							{loaderData.product.tagline}
						</p>
						<div className="mt-5 flex items-center gap-2">
							<div className="flex text-yellow-500">
								{Array.from({ length: 5 }).map((_, index) => (
									<StarIcon
										key={`starIcon-${index}`}
										className="size-4"
										fill={
											index < Math.floor(loaderData.product.average_rating)
												? "currentColor"
												: "none"
										}
									/>
								))}
							</div>
							<span className="text-muted-foreground text-base">
								{loaderData.product.reviews} reviews
							</span>
						</div>
					</div>
				</div>
				<div className="flex gap-5">
					<Button
						variant="secondary"
						className="text-md lg:text-lg h-14 px-5 lg:px-10"
						asChild
					>
						<Link to={`/products/${loaderData.product.product_id}/visit`}>
							Visit Website
						</Link>
					</Button>
					<Button className="text-md lg:text-lg h-14 px-5 lg:px-10">
						<ChevronUp className="size-4" />
						Upvote ({loaderData.product.upvotes})
					</Button>
				</div>
			</div>
			<div className="flex gap-2.5">
				<NavLink
					className={({ isActive }) =>
						cn(
							buttonVariants({ variant: "outline" }),
							isActive && "bg-primary text-primary-foreground"
						)
					}
					to={`/products/${loaderData.product.product_id}/overview`}
					end
				>
					Overview
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						cn(
							buttonVariants({ variant: "outline" }),
							isActive && "bg-primary text-primary-foreground"
						)
					}
					to={`/products/${loaderData.product.product_id}/reviews`}
					end
				>
					Reviews
				</NavLink>
			</div>
			<div>
				<Outlet
					context={{
						productDescription: loaderData.product.description,
						productHowItWorks: loaderData.product.how_it_works,
						reviewCount: loaderData.product.reviews,
					}}
				/>
			</div>
		</div>
	);
}
