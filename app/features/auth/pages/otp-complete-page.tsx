export default function OtpCompletePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">OTP 인증 완료</h1>
      <form method="post" className="space-y-4">
        <div>
          <label htmlFor="code" className="block text-sm font-medium">
            인증 코드
          </label>
          <input
            type="text"
            id="code"
            name="code"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          인증하기
        </button>
      </form>
    </div>
  );
}
