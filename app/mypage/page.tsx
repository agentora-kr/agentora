"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-sm"></div>
          <span className="text-xl font-extrabold text-gray-900">Agentora</span>
        </Link>
        <div className="flex gap-3">
          <button
            onClick={async () => { await supabase.auth.signOut(); router.push("/"); }}
            className="px-5 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-500 transition-all"
          >
            로그아웃
          </button>
        </div>
      </nav>

      {/* 프로필 헤더 */}
      <div className="pt-16 bg-gradient-to-br from-gray-900 to-blue-900 px-10 py-10">
        <div className="max-w-5xl mx-auto flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl border-2 border-white/30 flex-shrink-0">👤</div>
          <div>
            <h1 className="text-xl font-extrabold text-white mb-1">안녕하세요! 👋</h1>
            <p className="text-sm text-gray-400">{user?.email}</p>
            <div className="flex gap-2 mt-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/15 text-white">기업 회원</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500 text-white">가입 완료</span>
            </div>
          </div>
        </div>
      </div>

      {/* 빈 상태 */}
      <div className="max-w-5xl mx-auto px-10 py-16 flex flex-col items-center justify-center text-center">
        <div className="text-7xl mb-6">📭</div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">아직 구독 중인 Agent가 없어요</h2>
        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
          마음에 드는 AI Agent를 찾아 맛보기 체험 후 구독해보세요!<br />
          전문가들이 곧 다양한 Agent를 등록할 예정이에요.
        </p>
        <div className="flex gap-3">
          <Link href="/agents">
            <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm">
               Agent 탐색하기
            </button>
          </Link>
          <Link href="/register">
            <button className="px-8 py-3 border border-gray-200 text-gray-600 font-bold rounded-full hover:border-blue-400 hover:text-blue-600 transition-all text-sm">
              🧑‍💼 전문가 등록하기
            </button>
          </Link>
        </div>

        {/* 준비 중 기능 목록 */}
        <div className="mt-14 w-full max-w-2xl">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">준비 중인 기능</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "", name: "내 Agent 목록", desc: "구독 중인 Agent 관리" },
              { icon: "💳", name: "결제 내역", desc: "구독 및 결제 관리" },
              { icon: "📊", name: "사용량 통계", desc: "Agent 사용 현황" },
              { icon: "🔔", name: "알림 센터", desc: "맞춤 알림 서비스" },
              { icon: "🧑‍💼", name: "전문가 대시보드", desc: "Agent 판매 관리" },
              { icon: "⚙️", name: "프로필 설정", desc: "계정 정보 관리" },
            ].map((item) => (
              <div key={item.name} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-2 opacity-60">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-bold text-gray-700">{item.name}</span>
                <span className="text-[10px] text-gray-400">{item.desc}</span>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">준비 중</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}