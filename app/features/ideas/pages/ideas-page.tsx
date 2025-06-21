import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/ideas-page";
import { IdeaCard } from "../components/idea-card";
import { getGptIdeas } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "IdeasGPT | wemake" },
		{ name: "description", content: "Find ideas for your next project" },
	];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	const { serverSideClient } = makeSSRClient(request);
	const gptIdeas = await getGptIdeas(serverSideClient, {
		limit: 10,
	});
	return { gptIdeas };
};

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
	return (
		<div className="space-y-20">
			<Hero title="IdeasGPT" subtitle="Find ideas for your next project" />
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
				{loaderData.gptIdeas.map((idea) => (
					<IdeaCard
						id={idea.gpt_idea_id}
						idea={idea.idea}
						viewCount={idea.views}
						createdAt={idea.created_at}
						likeCount={idea.likes}
						claimed={idea.is_claimed}
						key={`ideasPageCardId-${idea.gpt_idea_id}`}
					/>
				))}
			</div>
		</div>
	);
}
