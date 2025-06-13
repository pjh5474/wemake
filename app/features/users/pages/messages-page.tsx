import type { Route } from "./+types/messages-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "메시지" },
    { name: "description", content: "메시지 목록 페이지" },
  ];
};

export default function MessagesPage() {
  return (
    <div>
      <h1>메시지</h1>
    </div>
  );
}
