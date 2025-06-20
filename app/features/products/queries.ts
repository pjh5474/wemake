import type { DateTime } from "luxon";
import { supabaseClient } from "~/supa-client";
import { CATEGORY_PAGE_SIZE, LEADERBOARD_PAGE_SIZE } from "./constants";

const productSelectList = `
product_id,
name,
tagline,
upvotes:stats->>upvotes,
views:stats->>views,
reviews:stats->>reviews
`;

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
    .select(productSelectList)
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

export const getCategories = async () => {
  const { data, error } = await supabaseClient.from("categories").select(`
    category_id,
    name,
    description
    `);
  if (error) throw error;
  return data;
};

export const getCategoryById = async ({
  categoryId,
}: {
  categoryId: number;
}) => {
  const { data, error } = await supabaseClient
    .from("categories")
    .select(
      `
    category_id,
    name,
    description
    `
    )
    .eq("category_id", categoryId)
    .single();
  if (error) throw error;
  return data;
};

export const getProductsByCategoryId = async ({
  categoryId,
  page = 1,
}: {
  categoryId: number;
  page?: number;
}) => {
  const { data, error } = await supabaseClient
    .from("products")
    .select(productSelectList)
    .eq("category_id", categoryId)
    .range((page - 1) * CATEGORY_PAGE_SIZE, page * CATEGORY_PAGE_SIZE - 1)
    .order("stats->>upvotes", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};

export const getCategoryPagesByCategoryId = async ({
  categoryId,
}: {
  categoryId: number;
}) => {
  const { count, error } = await supabaseClient
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .eq("category_id", categoryId);

  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / CATEGORY_PAGE_SIZE);
};

export const getProductsBySearch = async ({
  query,
  page = 1,
}: {
  query: string;
  page?: number;
}) => {
  const { data, error } = await supabaseClient
    .from("products")
    .select(productSelectList)
    .or(`name.ilike.%${query}%, tagline.ilike.%${query}%`)
    .range((page - 1) * CATEGORY_PAGE_SIZE, page * CATEGORY_PAGE_SIZE - 1);

  if (error) throw error;
  return data;
};

export const getPagesBySearch = async ({ query }: { query: string }) => {
  const { count, error } = await supabaseClient
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .or(`name.ilike.%${query}%, tagline.ilike.%${query}%`);

  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / CATEGORY_PAGE_SIZE);
};
