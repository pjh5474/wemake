import type { Route } from "~/types";
import { Link, type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Leaderboard | wemake" },
    {
      name: "description",
      content: "Discover the leaderboard from our community",
    },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function LeaderboardPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">Product Leaderboard</h1>
      <div className="mt-6 space-y-4">
        <Link
          to="/products/leaderboards/yearly/2024"
          className="block p-4 border rounded-lg hover:bg-gray-50"
        >
          Yearly Leaderboard
        </Link>
        <Link
          to="/products/leaderboards/monthly/2024/3"
          className="block p-4 border rounded-lg hover:bg-gray-50"
        >
          Monthly Leaderboard
        </Link>
        <Link
          to="/products/leaderboards/weekly/2024/12"
          className="block p-4 border rounded-lg hover:bg-gray-50"
        >
          Weekly Leaderboard
        </Link>
        <Link
          to="/products/leaderboards/daily/2024/3/15"
          className="block p-4 border rounded-lg hover:bg-gray-50"
        >
          Daily Leaderboard
        </Link>
      </div>
    </div>
  );
}
