// import { count, desc, eq } from "drizzle-orm";
// import db from "~/db";
// import { posts, postUpvotes, topics } from "./schema";
// import { profiles } from "../users/schema";

import { DateTime } from "luxon";
import type {
	COMMUNITY_SORTING_OPTIONS,
	COMMUNITY_SORTING_PERIOD_OPTIONS,
} from "./constants";
import type { Database } from "~/supa-client";
import type { SupabaseClient } from "@supabase/supabase-js";

// export const getTopics = async () => {
//   const allTopics = await db
//     .select({
//       name: topics.name,
//       slug: topics.slug,
//     })
//     .from(topics);
//   return allTopics;
// };

// export const getPosts = async () => {
//   const allPosts = await db
//     .select({
//       id: posts.post_id,
//       title: posts.title,
//       createdAt: posts.created_at,
//       topic: topics.name,
//       author: profiles.name,
//       authorAvatarUrl: profiles.avatar,
//       username: profiles.username,
//       upvotes: count(postUpvotes.post_id),
//     })
//     .from(posts)
//     .innerJoin(topics, eq(posts.topic_id, topics.topic_id))
//     .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
//     .leftJoin(postUpvotes, eq(posts.post_id, postUpvotes.post_id))
//     .groupBy(
//       posts.post_id,
//       profiles.name,
//       profiles.avatar,
//       profiles.username,
//       topics.name
//     )
//     .orderBy(desc(posts.post_id));
//   return allPosts;
// };

export const getTopics = async (supabaseClient: SupabaseClient<Database>) => {
	const { data, error } = await supabaseClient
		.from("topics")
		.select("name, slug");
	if (error) throw new Error(error.message);
	return data;
};

// export const getPosts = async () => {
//   const { data, error } = await supabaseClient.from("posts").select(`
//     post_id,
//     title,
//     created_at,
//     topic:topics!inner (
//       name
//     ),
//     author:profiles!posts_profile_id_profiles_profile_id_fk!inner (
//       name,
//       avatar,
//       username
//     ),
//     upvotes:post_upvotes (
//       count
//     )
//     `);
//   if (error) throw new Error(error.message);
//   return data;
// };

export const getPosts = async (
	supabaseClient: SupabaseClient<Database>,
	{
		limit,
		sorting = "newest",
		period = "all",
		keyword,
		topic,
	}: {
		limit: number;
		sorting: (typeof COMMUNITY_SORTING_OPTIONS)[number];
		period?: (typeof COMMUNITY_SORTING_PERIOD_OPTIONS)[number];
		keyword?: string;
		topic?: string;
	}
) => {
	const baseQuery = supabaseClient
		.from("community_post_list_view")
		.select("*")
		.limit(limit);
	if (sorting === "newest") {
		baseQuery.order("created_at", { ascending: false });
	} else if (sorting === "popular") {
		if (period === "all") {
			baseQuery.order("upvotes", { ascending: false });
		} else {
			const today = DateTime.now();
			if (period === "today") {
				baseQuery.gte("created_at", today.startOf("day").toISO());
			} else if (period === "week") {
				baseQuery.gte("created_at", today.startOf("week").toISO());
			} else if (period === "month") {
				baseQuery.gte("created_at", today.startOf("month").toISO());
			} else if (period === "year") {
				baseQuery.gte("created_at", today.startOf("year").toISO());
			}
			baseQuery.order("upvotes", { ascending: false });
		}
	}

	if (keyword) {
		baseQuery.ilike("title", `%${keyword}%`);
	}

	if (topic) {
		baseQuery.eq("topic_slug", topic);
	}

	const { data, error } = await baseQuery;
	if (error) throw new Error(error.message);
	return data;
};

export const getPostById = async (
	supabaseClient: SupabaseClient<Database>,
	{ post_id }: { post_id: number }
) => {
	const { data, error } = await supabaseClient
		.from("community_post_detail_view")
		.select("*")
		.eq("post_id", post_id)
		.single();
	if (error) throw new Error(error.message);
	return data;
};

export const getRepliesByPostId = async (
	supabaseClient: SupabaseClient<Database>,
	{ post_id }: { post_id: number }
) => {
	const replyQuery = `
  post_reply_id,
  reply,
  created_at,
  user:profiles (
    name,
    avatar,
    username
  )
  `;
	const { data, error } = await supabaseClient
		.from("post_replies")
		.select(
			`
      ${replyQuery},
      post_replies (
        ${replyQuery}
      )
      `
		)
		.eq("post_id", post_id);
	if (error) throw new Error(error.message);
	return data;
};
