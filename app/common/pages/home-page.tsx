import { data, Link } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { Button } from "../components/ui/button";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { JobCard } from "~/features/jobs/components/job-card";
import { TeamCard } from "~/features/teams/components/team-card";
import type { Route } from "./+types/home-page";
import { getProductsByDateRange } from "~/features/products/queries";
import { DateTime } from "luxon";
import { getPosts } from "~/features/community/queries";
import { getGptIdeas } from "~/features/ideas/queries";
import { getJobs } from "~/features/jobs/queries";
import { getTeams } from "~/features/teams/queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Home | wemake" },
		{ name: "description", content: "Welcome to wemake" },
	];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	const { serverSideClient, headers } = makeSSRClient(request);
	const [products, posts, gptIdeas, jobs, teams] = await Promise.all([
		getProductsByDateRange(serverSideClient, {
			startDate: DateTime.now().startOf("day"),
			endDate: DateTime.now().endOf("day"),
			limit: 7,
		}),
		getPosts(serverSideClient, {
			limit: 7,
			sorting: "newest",
		}),
		getGptIdeas(serverSideClient, {
			limit: 7,
		}),
		getJobs(serverSideClient, {
			limit: 7,
		}),
		getTeams(serverSideClient, {
			limit: 7,
		}),
	]);
	return { products, posts, gptIdeas, jobs, teams };
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
	return (
		<div className="px-20 space-y-40">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<div>
					<h2 className="text-5xl font-bold leading-tight tracking-tight">
						Today's Products
					</h2>
					<p className="text-xl font-light text-foreground">
						The best products made by our community today.
					</p>
					<Button variant="link" asChild className="text-lg p-0">
						<Link to="/products/leaderboards">Explore all products &rarr;</Link>
					</Button>
				</div>
				{loaderData.products.map((product) => (
					<ProductCard
						id={product.product_id}
						name={product.name}
						tagline={product.tagline}
						reviewsCount={product.reviews}
						viewsCount={product.views}
						votesCount={product.upvotes}
						key={`productCardId-${product.product_id}`}
					/>
				))}
			</div>
			<div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
				<div>
					<h2 className="text-5xl font-bold leading-tight tracking-tight">
						Latest Discussions
					</h2>
					<p className="text-xl font-light text-foreground">
						The latest discussions from our community.
					</p>
					<Button variant="link" asChild className="text-lg p-0">
						<Link to="/community">Explore all discussions &rarr;</Link>
					</Button>
				</div>
				{loaderData.posts.map((post) => (
					<PostCard
						id={post.post_id}
						title={post.title}
						author={post.author}
						authorAvatarUrl={post.author_avatar}
						topic={post.topic}
						createdAt={post.created_at}
						key={`postCardId-${post.post_id}`}
					/>
				))}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
				<div>
					<h2 className="text-5xl font-bold leading-tight tracking-tight">
						IdeasGPT
					</h2>
					<p className="text-xl font-light text-foreground">
						Find ideas for your next project.
					</p>
					<Button variant="link" asChild className="text-lg p-0">
						<Link to="/ideas">Explore all ideas &rarr;</Link>
					</Button>
				</div>
				{loaderData.gptIdeas.map((idea) => (
					<IdeaCard
						id={idea.gpt_idea_id}
						idea={idea.idea}
						viewCount={idea.views}
						createdAt={idea.created_at}
						likeCount={idea.likes}
						claimed={idea.is_claimed}
						key={`ideaCardId-${idea.gpt_idea_id}`}
					/>
				))}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
				<div>
					<h2 className="text-5xl font-bold leading-tight tracking-tight">
						Latest Jobs
					</h2>
					<p className="text-xl font-light text-foreground">
						Find your dream job.
					</p>
					<Button variant="link" asChild className="text-lg p-0">
						<Link to="/jobs">Explore all jobs &rarr;</Link>
					</Button>
				</div>
				{loaderData.jobs.map((job) => (
					<JobCard
						id={job.job_id}
						company={job.company_name}
						companyLocation={job.company_location}
						companyLogo={job.company_logo}
						createdAt={job.created_at}
						overview={job.overview}
						jobType={job.job_type}
						locationType={job.location_type}
						salaryRange={job.salary_range}
						key={`jobCardId-${job.job_id}`}
					/>
				))}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
				<div>
					<h2 className="text-5xl font-bold leading-tight tracking-tight">
						Find a team mate
					</h2>
					<p className="text-xl font-light text-foreground">
						Join a team looking for a new member.
					</p>
					<Button variant="link" asChild className="text-lg p-0">
						<Link to="/teams" prefetch="viewport">
							Explore all teams &rarr;
						</Link>
					</Button>
				</div>
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
