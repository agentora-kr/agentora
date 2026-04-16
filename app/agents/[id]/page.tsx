import Link from "next/link";

export default function AgentDetailPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-sm">🤖</div>
          <span className="text-xl font-extrabold text-gray-900">Agentora</span>
        </Link>
        <div className="flex gap-3">
          <Link href="/login"><button className="px-5 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all">로그인</button></Link>
          <Link href="/login"><button className="px-5 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md">무료 시작</button></Link>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-screen text-center px-10">
        <div className="text-7xl mb-6">🔍</div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">아직 등록된 Agent가 없어요</h2>
        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
          전문가들이 Agent를 준비 중이에요.<br />
          전문가이신가요? 첫 번째 Agent를 등록해보세요!
        </p>
        <div className="flex gap-3">
          <Link href="/register">
            <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm">🧑‍💼 전문가 등록하기</button>
          </Link>
          <Link href="/agents">
            <button className="px-8 py-3 border border-gray-200 text-gray-600 font-bold rounded-full hover:border-blue-400 hover:text-blue-600 transition-all text-sm">← 목록으로</button>
          </Link>
        </div>
      </div>
    </main>
  );
}