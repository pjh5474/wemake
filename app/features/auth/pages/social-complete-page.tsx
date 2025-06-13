import { useParams } from "react-router";

export default function SocialCompletePage() {
  const { provider } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{provider} 로그인 완료</h1>
      <div className="text-center">
        <p className="mb-4">소셜 로그인을 완료하는 중입니다...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
}
