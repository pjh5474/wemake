import type { Route } from "./+types/notifications-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "알림" },
    { name: "description", content: "알림 목록 페이지" },
  ];
};

export default function NotificationsPage() {
  return (
    <div>
      <h1>알림</h1>
    </div>
  );
}
