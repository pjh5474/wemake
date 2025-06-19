import type { DateTime } from "luxon";
import { supabaseClient } from "~/supa-client";
import { LEADERBOARD_PAGE_SIZE } from "./constants";

export const getProductsByDateRange = async ({
  startDate,
  endDate,
  limit,
  page = 1,
}: {
  startDate: DateTime;
  endDate: DateTime;
  limit: number;
  page?: number;
}) => {
  const { data, error } = await supabaseClient
    .from("products")
    .select(
      `
        product_id,
        name, 
        description,
        upvotes:stats->>upvotes,
        views:stats->>views,
        reviews:stats->>reviews
        `
    )
    .order("stats->>upvotes", { ascending: false })
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO())
    .range(
      (page - 1) * LEADERBOARD_PAGE_SIZE,
      page * LEADERBOARD_PAGE_SIZE - 1
    );
  if (error) throw error;
  return data;
};

export const getProductPagesByDateRange = async ({
  startDate,
  endDate,
}: {
  startDate: DateTime;
  endDate: DateTime;
}) => {
  const { count, error } = await supabaseClient
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO());
  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / LEADERBOARD_PAGE_SIZE);
};
