import type { Route } from "~/types";
import { type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Monthly Leaderboard | wemake" },
    {
      name: "description",
      content: "Discover the monthly leaderboard from our community",
    },
  ];
};

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, month } = params;
  return { year, month };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function MonthlyLeaderboardPage({
  loaderData,
  actionData,
}: Route.ComponentProps<{ year: string; month: string }>) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = monthNames[parseInt(loaderData.month) - 1];

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">
        {monthName} {loaderData.year} Leaderboard
      </h1>
      <div className="mt-8">
        {/* Leaderboard content will be rendered here */}
      </div>
    </div>
  );
}
