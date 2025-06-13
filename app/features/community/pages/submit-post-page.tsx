import type { Route } from "./+types/submit-post-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Post | wemake" },
    {
      name: "description",
      content: "Submit a post to the wemake community",
    },
  ];
};

export default function SubmitPostPage() {
  return (
    <div>
      <h1>포스트 작성</h1>
    </div>
  );
}
