import { data, isRouteErrorResponse, type MetaFunction } from "react-router";
import type { Route } from "./+types/daily-leaderboard-page";
import { DateTime } from "luxon";
import { z } from "zod";

const paramsSchema = z.object({
  year: z.coerce.number().int(),
  month: z.coerce.number().int(),
  day: z.coerce.number().int(),
});

export const meta: MetaFunction = () => {
  return [
    { title: "Daily Leaderboard | wemake" },
    {
      name: "description",
      content: "Discover the daily leaderboard from our community",
    },
  ];
};

export const loader = ({ request, params }: Route.LoaderArgs) => {
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
  return {
    date,
  };
};

export default function DailyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">Leaderboard</h1>
      <div className="mt-8"></div>
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
