import { supabaseClient } from "~/supa-client";

export const getGptIdeas = async ({ limit }: { limit: number }) => {
  const { data, error } = await supabaseClient
    .from("gpt_ideas_view")
    .select("*")
    .limit(limit);
  if (error) throw new Error(error.message);
  return data;
};

export const getGptIdeaById = async ({ ideaId }: { ideaId: number }) => {
  const { data, error } = await supabaseClient
    .from("gpt_ideas_view")
    .select("*")
    .eq("gpt_idea_id", ideaId)
    .single();
  if (error) throw new Error(error.message);
  return data;
};
