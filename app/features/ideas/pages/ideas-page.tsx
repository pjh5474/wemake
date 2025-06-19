import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/ideas-page";
import { IdeaCard } from "../components/idea-card";
import { getGptIdeas } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "IdeasGPT | wemake" },
    { name: "description", content: "Find ideas for your next project" },
  ];
};

export const loader = async () => {
  const gptIdeas = await getGptIdeas({
    limit: 10,
  });
  return { gptIdeas };
};

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero title="IdeasGPT" subtitle="Find ideas for your next project" />
      <div className="grid grid-cols-4 gap-4">
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
