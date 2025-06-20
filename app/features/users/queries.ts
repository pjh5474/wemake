import { supabaseClient } from "~/supa-client";
import { productSelectList } from "../products/queries";

export const getUserProfileByUsername = async (username: string) => {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select(
      `
    profile_id,
    name,
    username,
    avatar,
    role,
    headline,
    bio
    `
    )
    .eq("username", username)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const getUserProductsByUsername = async (username: string) => {
  const { data, error } = await supabaseClient
    .from("products")
    .select(
      `${productSelectList},
      user:profiles!fk_products_to_profiles(
        profile_id
      )`
    )
    .eq("profiles.username", username)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

export const getUserPostsByUsername = async (username: string) => {
  const { data, error } = await supabaseClient
    .from("community_post_list_view")
    .select("*")
    .eq("author_username", username);
  if (error) throw new Error(error.message);
  return data;
};
