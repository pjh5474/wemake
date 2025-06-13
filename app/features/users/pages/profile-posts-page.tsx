import { useParams } from "react-router";
import type { Route } from "./+types/profile-posts-page";
import { PostCard } from "~/features/community/components/post-card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Profile Posts | wemake" },
    { name: "description", content: "View user's posts" },
  ];
};

export default function ProfilePostsPage() {
  const { username } = useParams();

  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <PostCard
          id={`postId-${index}`}
          title={`Discussion Title ${index}`}
          author="Nico"
          authorAvatarUrl="https://github.com/shadcn.png"
          category="Productivity"
          timeAgo="12 hours ago"
          key={`postId-${index}`}
          expanded
        />
      ))}
    </div>
  );
}
