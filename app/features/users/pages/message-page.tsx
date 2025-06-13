import type { Route } from "./+types/message-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "메시지 상세" },
    { name: "description", content: "메시지 상세 페이지" },
  ];
};

export default function MessagePage() {
  return (
    <div>
      <h1>메시지 상세</h1>
    </div>
  );
}
