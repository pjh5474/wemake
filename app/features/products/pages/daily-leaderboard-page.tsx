import type { Route } from "~/types";
import { type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Daily Leaderboard | wemake" },
    {
      name: "description",
      content: "Discover the daily leaderboard from our community",
    },
  ];
};

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, month, day } = params;
  return { year, month, day };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function DailyLeaderboardPage({
  loaderData,
  actionData,
}: Route.ComponentProps<{ year: string; month: string; day: string }>) {
  const date = new Date(
    parseInt(loaderData.year),
    parseInt(loaderData.month) - 1,
    parseInt(loaderData.day)
  );

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">
        {date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        Leaderboard
      </h1>
      <div className="mt-8">
        {/* Leaderboard content will be rendered here */}
      </div>
    </div>
  );
}
