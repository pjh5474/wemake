import type { SupabaseClient } from "@supabase/supabase-js";
import { type Database } from "~/supa-client";

export const getGptIdeas = async (
	supabaseClient: SupabaseClient<Database>,
	{ limit }: { limit: number }
) => {
	const { data, error } = await supabaseClient
		.from("gpt_ideas_view")
		.select("*")
		.limit(limit);
	if (error) throw new Error(error.message);
	return data;
};

export const getGptIdeaById = async (
	supabaseClient: SupabaseClient<Database>,
	{ ideaId }: { ideaId: number }
) => {
	const { data, error } = await supabaseClient
		.from("gpt_ideas_view")
		.select("*")
		.eq("gpt_idea_id", ideaId)
		.single();
	if (error) throw new Error(error.message);
	return data;
};
