import type { Route } from "~/types";
import { type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Weekly Leaderboard | wemake" },
    {
      name: "description",
      content: "Discover the weekly leaderboard from our community",
    },
  ];
};

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, week } = params;
  return { year, week };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function WeeklyLeaderboardPage({
  loaderData,
  actionData,
}: Route.ComponentProps<{ year: string; week: string }>) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">
        Week {loaderData.week}, {loaderData.year} Leaderboard
      </h1>
      <div className="mt-8">
        {/* Leaderboard content will be rendered here */}
      </div>
    </div>
  );
}
