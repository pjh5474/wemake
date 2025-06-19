import { ChevronUpIcon, DotIcon } from "lucide-react";
import { DateTime } from "luxon";
import { Link } from "react-router";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
	Card,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/common/components/ui/card";
import { cn } from "~/lib/utils";

interface PostCardProps {
	id: number;
	title: string;
	author: string;
	authorAvatarUrl: string | null;
	topic: string;
	createdAt: string;
	expanded?: boolean;
	votesCount?: number;
}

export function PostCard({
	id,
	title,
	author,
	authorAvatarUrl,
	topic,
	createdAt,
	expanded = false,
	votesCount = 0,
}: PostCardProps) {
	return (
		<Link to={`/community/${id}`} className="block">
			<Card
				className={cn(
					"bg-transparent hover:bg-card/50 transition-colors",
					expanded ? "flex flex-row items-center justify-between" : ""
				)}
			>
				<CardHeader className="flex flex-row items-center gap-2 w-full">
					<Avatar className="size-14">
						<AvatarFallback>{author[0].toUpperCase()}</AvatarFallback>
						{authorAvatarUrl && <AvatarImage src={authorAvatarUrl} />}
					</Avatar>
					<div className="space-y-2 w-full">
						<CardTitle>{title}</CardTitle>
						<div className="flex gap-1 sm:gap-2 text-xs sm:text-sm leading-tight text-muted-foreground">
							<span>{author} on</span>
							<span>{topic}</span>
							<DotIcon className="size-4" />
							<span>{DateTime.fromISO(createdAt).toRelative()}</span>
						</div>
					</div>
				</CardHeader>
				{!expanded && (
					<CardFooter className="flex justify-end">
						<Button variant="link">Reply &rarr;</Button>
					</CardFooter>
				)}
				{expanded && (
					<CardFooter className="flex justify-end pb-0">
						<Button variant="outline" className="flex flex-col h-14">
							<ChevronUpIcon className="size-4 shrink-0" />
							<span>{votesCount}</span>
						</Button>
					</CardFooter>
				)}
			</Card>
		</Link>
	);
}
