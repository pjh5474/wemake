import { Form, Link, useParams } from "react-router";
import type { Route } from "./+types/post-page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Post | wemake" },
    { name: "description", content: "wemake Community Post" },
  ];
};

export default function PostPage() {
  const { postId } = useParams();

  return (
    <div className="grid grid-cols-6 items-start gap-40">
      <div className="col-span-4 space-y-10">
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
                <Link to="/community?topic=productivity">Productivity</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/community/${postId}`}>
                  What is the best productivity tool?
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex w-full items-start gap-10">
          <Button variant="outline" className="flex flex-col h-14">
            <ChevronUpIcon className="size-4 shrink-0" />
            <span>10</span>
          </Button>
          <div className="space-y-20">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">
                What is the best productivity tool?
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>@Nico </span>
                <DotIcon className="size-5" />
                <span>12 hours ago</span>
                <DotIcon className="size-5" />
                <span>10 replies</span>
              </div>
              <p className="text-muted-foreground w-3/4">
                생산성 도구를 찾고 있는데, 현재 여러 가지 옵션들이 있어서 어떤
                것을 선택해야 할지 고민이 됩니다. Notion, Trello, Asana 등
                다양한 도구들이 있는데, 각각의 장단점이 있어서 결정하기가
                어렵네요. 특히 일정 관리, 할 일 목록, 문서 작성, 협업 기능 등이
                잘 통합된 도구를 찾고 있습니다. 여러분의 경험과 추천을 듣고
                싶습니다. 어떤 도구를 사용하시나요? 그리고 그 도구의 어떤 점이
                특히 좋으신가요?
              </p>
            </div>
            <Form className="flex items-start gap-5 w-3/4">
              <Avatar className="size-14">
                <AvatarImage src="https://github.com/apple.png" />
                <AvatarFallback>N</AvatarFallback>
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
          </div>
        </div>
      </div>
      <aside className="col-span-2"></aside>
    </div>
  );
}
