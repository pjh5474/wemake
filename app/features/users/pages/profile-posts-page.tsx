import type { Route } from "./+types/profile-posts-page";
import { PostCard } from "~/features/community/components/post-card";
import { getUserPostsByUsername } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { serverSideClient } = makeSSRClient(request);
	const posts = await getUserPostsByUsername(serverSideClient, {
		username: params.username,
	});
	return { posts };
};

export default function ProfilePostsPage({ loaderData }: Route.ComponentProps) {
	return (
		<div className="flex flex-col gap-5">
			{loaderData.posts.map((post) => (
				<PostCard
					id={post.post_id}
					title={post.title}
					author={post.author_username}
					authorAvatarUrl={post.author_avatar}
					topic={post.topic}
					createdAt={post.created_at}
					key={post.post_id}
					expanded
				/>
			))}
		</div>
	);
}
