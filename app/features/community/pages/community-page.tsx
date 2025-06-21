import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/community-page";
import { Await, data, Form, Link, useSearchParams } from "react-router";
import { Button } from "~/common/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import {
	COMMUNITY_SORTING_PERIOD_OPTIONS,
	COMMUNITY_SORTING_OPTIONS,
} from "../constants";
import { Input } from "~/common/components/ui/input";
import { PostCard } from "../components/post-card";
import { getPosts, getTopics } from "../queries";
import { Suspense } from "react";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

const searchParamsSchema = z.object({
	sorting: z.enum(COMMUNITY_SORTING_OPTIONS).optional().default("newest"),
	period: z.enum(COMMUNITY_SORTING_PERIOD_OPTIONS).optional().default("all"),
	keyword: z.string().optional(),
	topic: z.string().optional(),
});

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Community | wemake" },
		{ name: "description", content: "wemake Community" },
	];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	const { serverSideClient } = makeSSRClient(request);
	// await new Promise((resolve) => setTimeout(resolve, 5000));
	// const topics = await getTopics();
	// const posts = await getPosts();
	// const [topics, posts] = await Promise.all([getTopics(), getPosts()]);

	const url = new URL(request.url);
	const { success: searchParamsParseSuccess, data: parsedSearchParams } =
		searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));
	if (!searchParamsParseSuccess) {
		throw data(
			{ error_code: "INVALID_SEARCH_PARAMS", message: "Invalid search params" },
			{ status: 400 }
		);
	}

	const topics = getTopics(serverSideClient);
	const posts = getPosts(serverSideClient, {
		limit: 10,
		sorting: parsedSearchParams.sorting,
		period: parsedSearchParams.period,
		keyword: parsedSearchParams.keyword,
		topic: parsedSearchParams.topic,
	});
	return { topics, posts };
};

export const clientLoader = async ({
	serverLoader,
}: Route.ClientLoaderArgs) => {
	const { topics, posts } = await serverLoader();
	return { topics, posts };
};

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
	const { topics, posts } = loaderData;

	const [searchParams, setSearchParams] = useSearchParams();
	const sorting = searchParams.get("sorting") || "newest";
	const period = searchParams.get("period") || "all";

	return (
		<div>
			<Hero
				title="Community"
				subtitle="Ask questions, share ideas, and connect with other members of the wemake community."
			/>
			<div className="grid grid-cols-1 md:grid-cols-6 items-start gap-15 xl:gap-40">
				<div className="col-span-1 md:col-span-4 space-y-10">
					<div className="flex justify-between">
						<div className="space-y-5 w-full">
							<div className="flex items-center gap-5">
								<DropdownMenu>
									<DropdownMenuTrigger className="flex items-center gap-1">
										<span className="text-sm capitalize">{sorting}</span>
										<ChevronDownIcon className="size-5" />
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										{COMMUNITY_SORTING_OPTIONS.map((option) => (
											<DropdownMenuCheckboxItem
												key={option}
												className="capitalize cursor-pointer"
												onCheckedChange={(checked: boolean) => {
													if (checked) {
														searchParams.set("sorting", option);
														setSearchParams(searchParams);
													}
												}}
											>
												{option}
											</DropdownMenuCheckboxItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
								{sorting === "popular" && (
									<DropdownMenu>
										<DropdownMenuTrigger className="flex items-center gap-1">
											<span className="text-sm capitalize">{period}</span>
											<ChevronDownIcon className="size-5" />
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											{COMMUNITY_SORTING_PERIOD_OPTIONS.map((option) => (
												<DropdownMenuCheckboxItem
													key={option}
													className="capitalize cursor-pointer"
													onCheckedChange={(checked: boolean) => {
														if (checked) {
															searchParams.set("period", option);
															setSearchParams(searchParams);
														}
													}}
												>
													{option}
												</DropdownMenuCheckboxItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								)}
							</div>
							<Form className="w-2/3">
								{/* 
                // TODO: add hidden inputs for sorting and period
                <Input type="hidden" name="sorting" value={sorting} />
                <Input type="hidden" name="period" value={period} />
                 */}
								<Input
									type="hidden"
									name="topic"
									value={searchParams.get("topic") || ""}
								/>
								<Input
									type="text"
									name="keyword"
									placeholder="Search for dicussions"
								/>
							</Form>
						</div>
						<Button asChild>
							<Link to="/community/submit">Create Discussion</Link>
						</Button>
					</div>
					<Suspense fallback={<div>Loading...</div>}>
						<Await resolve={posts}>
							{(data) => (
								<div className="space-y-5">
									{data.map((post) => (
										<PostCard
											id={post.post_id}
											key={`postCardId-${post.post_id}`}
											title={post.title}
											author={post.author}
											authorAvatarUrl={post.author_avatar}
											topic={post.topic}
											votesCount={post.upvotes}
											createdAt={post.created_at}
											expanded
										/>
									))}
								</div>
							)}
						</Await>
					</Suspense>
				</div>
				<aside className="col-span-1 md:col-span-2 space-y-5">
					<span className="text-sm font-bold text-muted-foreground uppercase">
						Topics
					</span>
					<Suspense fallback={<div>Loading...</div>}>
						<Await resolve={topics}>
							{(data) => (
								<div className="flex flex-col gap-2 items-start">
									{data.map((topic: { name: string; slug: string }) => (
										<Button
											asChild
											variant={"link"}
											key={topic.slug}
											className="pl-0"
										>
											<Link to={`/community?topic=${topic.slug}`}>
												{topic.name}
											</Link>
										</Button>
									))}
								</div>
							)}
						</Await>
					</Suspense>
				</aside>
			</div>
		</div>
	);
}

export function HydratedFallback() {
	return <div>Loading in clientLoader</div>;
}
