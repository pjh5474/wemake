import type { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "내 아이디어" },
    { name: "description", content: "내가 작성한 아이디어 목록" },
  ];
};

export default function DashboardIdeasPage() {
  return (
    <div>
      <h1>내 아이디어</h1>
    </div>
  );
}
