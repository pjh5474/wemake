import { data, isRouteErrorResponse, Link } from "react-router";
import type { Route } from "./+types/daily-leaderboard-page";
import { DateTime } from "luxon";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
import { LEADERBOARD_PAGE_SIZE } from "../constants";
import { EmptyLeaderboard } from "../components/empty-leaderboard";
import { makeSSRClient } from "~/supa-client";

const paramsSchema = z.object({
	year: z.coerce.number().int(),
	month: z.coerce.number().int(),
	day: z.coerce.number().int(),
});

export const meta: Route.MetaFunction = ({ params }) => {
	const date = DateTime.fromObject({
		year: Number(params.year),
		month: Number(params.month),
		day: Number(params.day),
	})
		.setZone("Asia/Seoul")
		.setLocale("ko");

	if (!date.isValid) {
		return [{ title: "Daily Leaderboard | wemake" }];
	}

	return [
		{ title: `Best of ${date.toLocaleString(DateTime.DATE_MED)} | wemake` },
		{
			name: "description",
			content: "Discover the daily leaderboard from our community",
		},
	];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { serverSideClient } = makeSSRClient(request);
	const { success, data: parsedData } = paramsSchema.safeParse(params);
	if (!success) {
		throw data(
			{
				error_code: "INVALID_PARAMS",
				message: "Invalid params",
			},
			{ status: 400 }
		);
	}
	const date = DateTime.fromObject(parsedData).setZone("Asia/Seoul");
	if (!date.isValid) {
		throw data(
			{
				error_code: "INVALID_DATE",
				message: "Invalid date",
			},
			{ status: 400 }
		);
	}
	const today = DateTime.now().setZone("Asia/Seoul").startOf("day");
	if (date > today) {
		throw data(
			{
				error_code: "FUTURE_DATE",
				message: "Future date",
			},
			{ status: 400 }
		);
	}

	const url = new URL(request.url);
	const products = await getProductsByDateRange(serverSideClient, {
		startDate: date.startOf("day"),
		endDate: date.endOf("day"),
		limit: LEADERBOARD_PAGE_SIZE,
		page: Number(url.searchParams.get("page")) || 1,
	});
	const totalPages = await getProductPagesByDateRange(serverSideClient, {
		startDate: date.startOf("day"),
		endDate: date.endOf("day"),
	});

	return {
		products,
		totalPages,
		...parsedData,
	};
};

export default function DailyLeaderboardPage({
	loaderData,
}: Route.ComponentProps) {
	const urlDate = DateTime.fromObject({
		year: loaderData.year,
		month: loaderData.month,
		day: loaderData.day,
	});
	const previousDay = urlDate.minus({ days: 1 });
	const nextDay = urlDate.plus({ days: 1 });
	const isToday = urlDate.equals(DateTime.now().startOf("day"));
	return (
		<div className="space-y-10">
			<Hero title={`Best of ${urlDate.toLocaleString(DateTime.DATE_MED)}`} />
			<div className="flex items-center justify-center gap-2">
				<Button variant="secondary" asChild>
					<Link
						to={`/products/leaderboards/daily/${previousDay.year}/${previousDay.month}/${previousDay.day}`}
					>
						&larr; {previousDay.toLocaleString(DateTime.DATE_SHORT)}
					</Link>
				</Button>
				{!isToday ? (
					<Button variant="secondary" asChild>
						<Link
							to={`/products/leaderboards/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`}
						>
							{nextDay.toLocaleString(DateTime.DATE_SHORT)} &rarr;
						</Link>
					</Button>
				) : null}
			</div>
			<div className="space-y-5 w-full max-w-screen-md mx-auto">
				{loaderData.products.length === 0 ? (
					<EmptyLeaderboard
						title=""
						description=""
						emptyMessage="😔 There is no product for this date."
						emptyDescription="How about checking another date?"
					/>
				) : (
					loaderData.products.map((product) => (
						<ProductCard
							id={product.product_id}
							name={product.name}
							tagline={product.tagline}
							reviewsCount={product.reviews}
							viewsCount={product.views}
							votesCount={product.upvotes}
							key={`dailyLeaderboardCardId-${product.product_id}`}
						/>
					))
				)}
			</div>
			{loaderData.products.length > 0 && (
				<ProductPagination totalPages={loaderData.totalPages} />
			)}
		</div>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	if (isRouteErrorResponse(error)) {
		return (
			<div>
				{error.data.message} / {error.data.error_code}
			</div>
		);
	}
	if (error instanceof Error) {
		return <div>{error.message}</div>;
	}
	return <div>Unknown error</div>;
}
