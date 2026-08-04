import Link from "next/link";

export const metadata = {
  title: "Agentora — 준비 중",
  description: "더 나은 서비스로 준비 중입니다.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center">

        {/* 로고 */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-xl shadow-lg">
            🤖
          </div>
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">Agentora</span>
        </div>

        {/* 아이콘 */}
        <div className="text-6xl mb-7">🛠️</div>

        {/* 메인 문구 */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-snug">
          더 나은 서비스로<br className="md:hidden" /> 준비 중입니다
        </h1>

        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10">
          Agentora가 새로운 모습으로 단장하고 있어요.<br />
          곧 다시 찾아뵙겠습니다.
        </p>

        {/* 재오픈 예정일 — 정해지면 아래 주석 해제하고 날짜만 수정하세요
        <div className="inline-block bg-blue-50 border border-blue-100 rounded-full px-5 py-2 mb-10">
          <p className="text-sm font-bold text-blue-600">
            재오픈 예정 · 2026년 0월 0일
          </p>
        </div>
        */}

        {/* 문의 */}
        <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5 shadow-sm">
          <p className="text-xs text-gray-400 mb-2">문의하기</p>
          
            href="mailto:hyw60917@gmail.com"
            className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            hyw60917@gmail.com
          </a>
        </div>

        <p className="text-xs text-gray-300 mt-10">
          © 2026 Agentora. All rights reserved.
        </p>

      </div>
    </main>
  );
}