import { Form, Link, useParams } from "react-router";
import type { Route } from "./+types/post-page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import { ChevronUpIcon, DotIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Reply } from "../components/reply";
import { getPostById, getRepliesByPostId } from "../queries";
import z from "zod";
import { DateTime } from "luxon";

const paramsSchema = z.object({
  postId: z.string().transform((val) => parseInt(val)),
});

export const meta: Route.MetaFunction = ({ data }: Route.MetaArgs) => {
  return [
    { title: `${data?.post.title} | wemake` },
    { name: "description", content: "wemake Community Post" },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { success, data: parsedParams } = paramsSchema.safeParse(params);
  if (!success) {
    throw new Error("Invalid post ID");
  }
  const post = await getPostById({ post_id: parsedParams.postId });
  const replies = await getRepliesByPostId({ post_id: parsedParams.postId });
  return { post, replies };
};

export default function PostPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community">Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community?topic=${loaderData.post.topic_slug}`}>
                {loaderData.post.topic_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/${loaderData.post.post_id}`}>
                {loaderData.post.title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 xl:grid-cols-6 items-start gap-10 xl:gap-40">
        <div className="col-span-1 xl:col-span-4 space-y-10">
          <div className="flex w-full items-start gap-10">
            <Button variant="outline" className="flex flex-col h-14">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>{loaderData.post.upvotes}</span>
            </Button>
            <div className="space-y-20 w-full">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">
                  What is the best productivity tool?
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>@{loaderData.post.author_name} </span>
                  <DotIcon className="size-5" />
                  <span>
                    {DateTime.fromISO(loaderData.post.created_at).toRelative()}
                  </span>
                  <DotIcon className="size-5" />
                  <span>
                    {loaderData.post.replies_count}{" "}
                    {loaderData.post.replies_count === 1 ? "reply" : "replies"}
                  </span>
                </div>
                <p className="text-muted-foreground w-3/4">
                  {loaderData.post.content}
                </p>
              </div>
              <Form className="flex items-start gap-5 w-3/4">
                <Avatar className="size-14">
                  <AvatarImage src="https://github.com/microsoft.png" />
                  <AvatarFallback>{"N"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-5 w-full items-end">
                  <Textarea
                    placeholder="Write a reply"
                    className="w-full resize-none"
                    rows={5}
                  />
                  <Button type="submit">Reply</Button>
                </div>
              </Form>
              <div className="space-y-10">
                <h4 className="font-semibold">
                  {loaderData.post.replies_count}{" "}
                  {loaderData.post.replies_count === 1 ? "reply" : "replies"}
                </h4>
                <div className="flex flex-col gap-5">
                  {loaderData.replies.map((reply) => (
                    <Reply
                      key={reply.post_reply_id}
                      content={reply.reply}
                      createdAt={reply.created_at}
                      avatarUrl={reply.user.avatar}
                      username={reply.user.username}
                      topLevel={true}
                      replies={reply.post_replies}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-1 xl:col-span-2 space-y-5 border rounded-lg shadow-sm p-6">
          <div className="flex gap-5">
            <Avatar className="size-14">
              {loaderData.post.author_avatar && (
                <AvatarImage src={loaderData.post.author_avatar} />
              )}
              <AvatarFallback>
                {loaderData.post.author_name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <h4 className="text-lg font-medium">
                {loaderData.post.author_name}
              </h4>
              <Badge variant="secondary" className="capitalize">
                {loaderData.post.author_role}
              </Badge>
            </div>
          </div>
          <div className="text-sm flex flex-col gap-2">
            <span>
              😾 Joined{" "}
              {DateTime.fromISO(loaderData.post.author_created_at).toRelative()}
            </span>
            <span>
              🚀 Launched {loaderData.post.author_products_count} products
            </span>
          </div>
          <Button variant="outline" className="w-full">
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
