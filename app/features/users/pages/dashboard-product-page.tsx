import type { Route } from "./+types/dashboard-product-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "제품 관리" },
    { name: "description", content: "제품 관리 페이지" },
  ];
};

export default function DashboardProductPage() {
  return (
    <div>
      <h1>제품 관리</h1>
    </div>
  );
}
