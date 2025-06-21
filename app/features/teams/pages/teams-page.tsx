import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/teams-page";
import { TeamCard } from "../components/team-card";
import { getTeams } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Teams | wemake" },
		{ name: "description", content: "Discover and join amazing teams" },
	];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	const { serverSideClient } = makeSSRClient(request);
	const teams = await getTeams(serverSideClient, {
		limit: 8,
	});
	return { teams };
};

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
	return (
		<div className="space-y-20">
			<Hero title="Teams" subtitle="Find a team looking for a new member." />
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
				{loaderData.teams.map((team) => (
					<TeamCard
						id={team.team_id}
						leaderUsername={team.team_leader.username}
						leaderAvatarUrl={team.team_leader.avatar}
						positions={team.roles.split(",")}
						projectDescription={team.product_description}
						key={`teamCardId-${team.team_id}`}
					/>
				))}
			</div>
		</div>
	);
}
