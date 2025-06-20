import { data, Outlet } from "react-router";
import type { Route } from "./+types/leaderboard-layout";
import { paginationValidationSchema } from "~/common/utils/pagination-validation-schema";

export const loader = ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success: pageParseSuccess } = paginationValidationSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!pageParseSuccess) {
    throw data(
      { error_code: "INVALID_PAGE", message: "Invalid page" },
      { status: 400 }
    );
  }
};

export default function LeaderboardLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
