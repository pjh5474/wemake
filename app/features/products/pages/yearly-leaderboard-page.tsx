import type { Route } from "~/types";
import { type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Yearly Leaderboard | wemake" },
    {
      name: "description",
      content: "Discover the yearly leaderboard from our community",
    },
  ];
};

export function loader({ request, params }: Route.LoaderArgs) {
  const { year } = params;
  return { year };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function YearlyLeaderboardPage({
  loaderData,
  actionData,
}: Route.ComponentProps<{ year: string }>) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">
        Yearly Leaderboard {loaderData.year}
      </h1>
      <div className="mt-8">
        {/* Leaderboard content will be rendered here */}
      </div>
    </div>
  );
}
