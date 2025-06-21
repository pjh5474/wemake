import {
	createBrowserClient,
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader,
	type CookieMethodsServer,
} from "@supabase/ssr";
import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";
import type { Database as SupabaseDatabase } from "database.types";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
	throw new Error("Missing Supabase URL or key");
}

export type Database = MergeDeep<
	SupabaseDatabase,
	{
		public: {
			Views: {
				community_post_list_view: {
					Row: SetFieldType<
						SetNonNullable<
							SupabaseDatabase["public"]["Views"]["community_post_list_view"]["Row"]
						>,
						"author_avatar",
						string | null
					>;
				};
				gpt_ideas_view: {
					Row: SetNonNullable<
						SupabaseDatabase["public"]["Views"]["gpt_ideas_view"]["Row"]
					>;
				};
				product_overview_view: {
					Row: SetNonNullable<
						SupabaseDatabase["public"]["Views"]["product_overview_view"]["Row"]
					>;
				};
				community_post_detail_view: {
					Row: SetFieldType<
						SetNonNullable<
							SupabaseDatabase["public"]["Views"]["community_post_detail_view"]["Row"]
						>,
						"author_avatar",
						string | null
					>;
				};
			};
		};
	}
>;

export const supabaseBrowserClient = createBrowserClient<Database>(
	supabaseUrl,
	supabaseKey
);

export const makeSSRClient = (request: Request) => {
	const headers = new Headers();
	const cookies: CookieMethodsServer = {
		getAll() {
			const cookies = parseCookieHeader(request.headers.get("Cookie") ?? "");
			return cookies.map(({ name, value }) => ({ name, value: value ?? "" }));
		},
		setAll(cookiesToSet) {
			cookiesToSet.forEach(({ name, value, options }) => {
				headers.append(
					"Set-Cookie",
					serializeCookieHeader(name, value, options)
				);
			});
		},
	};
	const serverSideClient = createServerClient<Database>(
		supabaseUrl,
		supabaseKey,
		{
			cookies,
		}
	);
	return { serverSideClient, headers };
};
