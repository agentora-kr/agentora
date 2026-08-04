export const metadata = {
  title: "Agentora — 준비 중",
  description: "더 나은 서비스로 준비 중입니다.",
};

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center">

        <div className="flex items-center justify-center mb-10">
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Agentora
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-snug">
          더 나은 서비스로 준비 중입니다
        </h1>

        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10">
          Agentora가 새로운 모습으로 단장하고 있어요. 곧 다시 찾아뵙겠습니다.
        </p>

        <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5 shadow-sm">
          <p className="text-xs text-gray-400 mb-2">문의하기</p>
          <p className="text-sm font-bold text-blue-600">hyw60917@gmail.com</p>
        </div>

        <p className="text-xs text-gray-300 mt-10">
          © 2026 Agentora. All rights reserved.
        </p>

      </div>
    </main>
  );
}