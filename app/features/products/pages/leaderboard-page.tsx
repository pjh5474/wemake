import { Hero } from "~/common/components/hero";
import { EmptyLeaderboard } from "../components/empty-leaderboard";
import { LeaderboardGrid } from "../components/leaderboard-grid";
import type { Route } from "./+types/leaderboard-page";
import { getProductsByDateRange } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Leaderboard | wemake" },
		{
			name: "description",
			content: "Discover the leaderboard from our community",
		},
	];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	const { serverSideClient } = makeSSRClient(request);
	const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] =
		await Promise.all([
			getProductsByDateRange(serverSideClient, {
				startDate: DateTime.now().startOf("day"),
				endDate: DateTime.now().endOf("day"),
				limit: 7,
			}),
			getProductsByDateRange(serverSideClient, {
				startDate: DateTime.now().startOf("week"),
				endDate: DateTime.now().endOf("week"),
				limit: 7,
			}),
			getProductsByDateRange(serverSideClient, {
				startDate: DateTime.now().startOf("month"),
				endDate: DateTime.now().endOf("month"),
				limit: 7,
			}),
			getProductsByDateRange(serverSideClient, {
				startDate: DateTime.now().startOf("year"),
				endDate: DateTime.now().endOf("year"),
				limit: 7,
			}),
		]);
	return { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts };
};

export default function LeaderboardPage({ loaderData }: Route.ComponentProps) {
	return (
		<div className="space-y-20">
			<Hero
				title="Leaderboards"
				subtitle="The most popular products on wemake"
			/>

			{loaderData.dailyProducts.length === 0 ? (
				<EmptyLeaderboard
					title="Daily Leaderboard"
					description="The most popular products on wemake by day."
					emptyMessage="No products found"
					emptyDescription="There are no products for today."
					linkTo="/products/leaderboards/daily"
				/>
			) : (
				<LeaderboardGrid
					title="Daily Leaderboard"
					description="The most popular products on wemake by day."
					products={loaderData.dailyProducts}
					linkTo="/products/leaderboards/daily"
					keyPrefix="dailyProductCardId"
					buttonText="Explore all products by day"
				/>
			)}

			{loaderData.weeklyProducts.length === 0 ? (
				<EmptyLeaderboard
					title="Weekly Leaderboard"
					description="The most popular products on wemake by week."
					emptyMessage="No products found"
					emptyDescription="There are no products for this week."
					linkTo="/products/leaderboards/weekly"
				/>
			) : (
				<LeaderboardGrid
					title="Weekly Leaderboard"
					description="The most popular products on wemake by week."
					products={loaderData.weeklyProducts}
					linkTo="/products/leaderboards/weekly"
					keyPrefix="weeklyProductCardId"
					buttonText="Explore all products by week"
				/>
			)}

			{loaderData.monthlyProducts.length === 0 ? (
				<EmptyLeaderboard
					title="Monthly Leaderboard"
					description="The most popular products on wemake by month."
					emptyMessage="No products found"
					emptyDescription="There are no products for this month."
					linkTo="/products/leaderboards/monthly"
				/>
			) : (
				<LeaderboardGrid
					title="Monthly Leaderboard"
					description="The most popular products on wemake by month."
					products={loaderData.monthlyProducts}
					linkTo="/products/leaderboards/monthly"
					keyPrefix="monthlyProductCardId"
					buttonText="Explore all products by month"
				/>
			)}

			{loaderData.yearlyProducts.length === 0 ? (
				<EmptyLeaderboard
					title="Yearly Leaderboard"
					description="The most popular products on wemake by year."
					emptyMessage="No products found"
					emptyDescription="There are no products for this year."
					linkTo="/products/leaderboards/yearly"
				/>
			) : (
				<LeaderboardGrid
					title="Yearly Leaderboard"
					description="The most popular products on wemake by year."
					products={loaderData.yearlyProducts}
					linkTo="/products/leaderboards/yearly"
					keyPrefix="yearlyProductCardId"
					buttonText="Explore all products by year"
				/>
			)}
		</div>
	);
}
