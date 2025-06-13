import { useParams } from "react-router";
import type { Route } from "./+types/post-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Post | wemake" },
    { name: "description", content: "wemake Community Post" },
  ];
};

export default function PostPage() {
  const { postId } = useParams();

  return (
    <div>
      <h1>포스트 {postId}</h1>
    </div>
  );
}
