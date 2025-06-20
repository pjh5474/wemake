import type { SupabaseClient } from "@supabase/supabase-js";
import { type Database } from "~/supa-client";

export const getTeams = async (
	supabaseClient: SupabaseClient<Database>,
	{ limit }: { limit: number }
) => {
	const { data, error } = await supabaseClient
		.from("teams")
		.select(
			`
        team_id,
        roles,
        product_description,
        team_leader:profiles!inner(
        username,
        avatar
        )
    `
		)
		.limit(limit);

	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const getTeamById = async (
	supabaseClient: SupabaseClient<Database>,
	{ team_id }: { team_id: number }
) => {
	const { data, error } = await supabaseClient
		.from("teams")
		.select(
			`
        team_id,
        team_leader:profiles!inner(
            username,
            avatar,
            role
        ),
        product_name,
        team_size,
        equity_split,
        roles,
        product_description,
        product_stage,
        created_at
    `
		)
		.eq("team_id", team_id)
		.single();

	if (error) {
		throw new Error(error.message);
	}
	return data;
};
