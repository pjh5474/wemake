import type { Route } from "./+types/dashboard-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "대시보드" },
    { name: "description", content: "사용자 대시보드" },
  ];
};

export default function DashboardPage() {
  return (
    <div>
      <h1>대시보드</h1>
    </div>
  );
}
