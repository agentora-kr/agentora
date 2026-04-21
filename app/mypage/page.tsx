"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../providers";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Subscription = {
  id: number;
  agent_id: number;
  plan: string;
  status: string;
  price: number;
  created_at: string;
  agents: {
    name: string;
    emoji: string;
    category: string;
  };
};

export default function MyPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [subLoading, setSubLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!user) {
        setSubLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("subscriptions")
        .select(`
          id,
          agent_id,
          plan,
          status,
          price,
          created_at,
          agents (
            name,
            emoji,
            category
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("구독 조회 에러:", error);
      } else {
        setSubscriptions((data as unknown as Subscription[]) || []);
      }
      setSubLoading(false);
    };

    fetchSubscriptions();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading || subLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const displayName = (user as any)?.user_metadata?.name || user?.email?.split("@")[0] || "사용자";
  const displayCompany = (user as any)?.user_metadata?.company || "";

  const statusLabel = (status: string) => {
    if (status === "active") return { text: "이용 중", color: "bg-green-100 text-green-600" };
    if (status === "pending") return { text: "결제 대기", color: "bg-yellow-100 text-yellow-600" };
    if (status === "cancelled") return { text: "해지됨", color: "bg-gray-100 text-gray-500" };
    return { text: status, color: "bg-gray-100 text-gray-500" };
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-sm">🤖</div>
          <span className="text-xl font-extrabold text-gray-900">Agentora</span>
        </Link>
        <button onClick={handleLogout} className="px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-500 transition-all">
          로그아웃
        </button>
      </nav>

      {/* 프로필 헤더 */}
      <div className="pt-16 bg-gradient-to-br from-gray-900 to-blue-900 px-5 md:px-10 py-8 md:py-10">
        <div className="max-w-5xl mx-auto flex items-center gap-4 md:gap-5">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl md:text-3xl border-2 border-white/30 flex-shrink-0">👤</div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg md:text-xl font-extrabold text-white mb-1">{displayName} 님, 안녕하세요! 👋</h1>
            <p className="text-sm text-gray-400">{displayCompany && `${displayCompany} · `}{user?.email}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/15 text-white">기업 회원</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500 text-white">가입 완료</span>
            </div>
          </div>
          <div className="hidden md:flex gap-8 flex-shrink-0">
            {[
              [subscriptions.length.toString(), "구독 Agent"],
              [subscriptions.filter(s => s.status === "active").length.toString(), "이용 중"],
              [subscriptions.filter(s => s.status === "pending").length.toString(), "결제 대기"],
            ].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-xl font-extrabold text-white">{num}</div>
                <div className="text-xs text-gray-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 py-8 flex flex-col gap-6">

        {/* 구독 목록 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
          <h2 className="text-base font-extrabold text-gray-900 mb-5">🤖 내 구독 Agent</h2>

          {subscriptions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-base font-extrabold text-gray-900 mb-2">아직 구독 중인 Agent가 없어요</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">마음에 드는 AI Agent를 찾아 맛보기 체험 후 구독해보세요!</p>
              <Link href="/agents">
                <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm">🤖 Agent 탐색하기</button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {subscriptions.map((sub) => {
                const { text, color } = statusLabel(sub.status);
                return (
                  <div key={sub.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0">
                      {sub.agents?.emoji || "🤖"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-extrabold text-gray-900">{sub.agents?.name || "Agent"}</p>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${color}`}>{text}</span>
                        <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full font-semibold">{sub.plan === "basic" ? "베이직" : "프로"}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{sub.agents?.category}</p>
                      <p className="text-xs text-gray-400 mt-0.5">신청일: {new Date(sub.created_at).toLocaleDateString("ko-KR")}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-extrabold text-gray-900">₩{sub.price?.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">/ 월</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 준비 중 기능 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
          <h2 className="text-base font-extrabold text-gray-900 mb-4">🔜 준비 중인 기능</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon: "💳", name: "결제 내역", desc: "구독 및 결제 관리" },
              { icon: "📊", name: "사용량 통계", desc: "Agent 사용 현황" },
              { icon: "🔔", name: "알림 센터", desc: "맞춤 알림 서비스" },
              { icon: "🧑‍💼", name: "전문가 대시보드", desc: "Agent 판매 관리" },
              { icon: "⚙️", name: "프로필 설정", desc: "계정 정보 관리" },
              { icon: "🏆", name: "리뷰 관리", desc: "Agent 평가 및 리뷰" },
            ].map((item) => (
              <div key={item.name} className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex flex-col items-center gap-2 opacity-60">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-bold text-gray-700">{item.name}</span>
                <span className="text-[10px] text-gray-400">{item.desc}</span>
                <span className="text-[10px] text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">준비 중</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}