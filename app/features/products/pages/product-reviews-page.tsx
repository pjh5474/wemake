import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/product-reviews-page";
import { ReviewCard } from "../components/review-card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogTrigger,
} from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";
import { useOutletContext } from "react-router";
import { getReviewsByProductId } from "../queries";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

const paramSchema = z.object({
	productId: z.coerce.string().transform((val) => Number(val)),
});

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Product Reviews | WeMake" },
		{ name: "description", content: "Read and write product reviews" },
	];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { serverSideClient } = makeSSRClient(request);
	const { success, data: parsedParams } = paramSchema.safeParse(params);
	if (!success) {
		throw new Error("Invalid product ID");
	}

	const reviews = await getReviewsByProductId(serverSideClient, {
		productId: parsedParams.productId,
	});
	return { reviews };
};

export default function ProductReviewsPage({
	loaderData,
}: Route.ComponentProps) {
	const { reviewCount } = useOutletContext<{ reviewCount: number }>();
	return (
		<Dialog>
			<div className="space-y-10 max-w-xl">
				<div className="flex justify-between items-center">
					<h2 className="text-2xl font-bold">
						{reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
					</h2>
					<DialogTrigger asChild>
						<Button variant="secondary">Write a reivew</Button>
					</DialogTrigger>
				</div>
				<div className="space-y-20">
					{loaderData.reviews.map((review) => (
						<ReviewCard
							key={review.review_id}
							username={review.user.username}
							displayName={review.user.name}
							avatarUrl={review.user.avatar}
							rating={review.rating}
							content={review.review}
							createdAt={review.created_at}
						/>
					))}
				</div>
			</div>
			<CreateReviewDialog />
		</Dialog>
	);
}
