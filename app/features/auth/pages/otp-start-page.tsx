export default function OtpStartPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">OTP 인증 시작</h1>
      <form method="post" className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          인증 코드 받기
        </button>
      </form>
    </div>
  );
}
