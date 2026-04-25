"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../providers";import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const CATEGORY_EMOJI: Record<string, string> = {
  "데이터 분석": "📊", "고객 응대": "📞", "문서 자동화": "📝",
  "영업·마케팅": "💼", "법률·계약": "⚖️", "재무·회계": "💰",
  "제조·품질": "🏗️", "IT·개발": "🔧", "의료·헬스": "🏥", "교육·HR": "🎓",
};
function getEmoji(category: string) { return CATEGORY_EMOJI[category] || "🤖"; }

type Agent = {
  id: number;
  name: string;
  category: string;
  price: number;
  status: string;
  created_at: string;
  description: string;
};

type Subscription = {
  id: number;
  agent_id: number;
  plan: string;
  status: string;
  price: number;
  created_at: string;
};

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const [agents, setAgents] = useState<Agent[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [role, setRole] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "agents" | "subscribers">("overview");

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      // role 확인
      const { data: profile } = await supabase
        .from("profiles").select("role").eq("id", user.id).single();

      if (profile?.role !== "expert" && profile?.role !== "admin") {
        router.push("/mypage");
        return;
      }
      setRole(profile.role);

      // 내 Agent 목록
      const { data: agentData } = await supabase
        .from("agents")
        .select("*")
        .eq("expert_email", user.email)
        .order("created_at", { ascending: false });

      if (agentData) setAgents(agentData);

      // 구독 데이터 (내 Agent들)
      if (agentData && agentData.length > 0) {
        const agentIds = agentData.map((a) => a.id);
        const { data: subData } = await supabase
          .from("subscriptions")
          .select("*")
          .in("agent_id", agentIds)
          .order("created_at", { ascending: false });

        if (subData) setSubscriptions(subData);
      }

      setDataLoading(false);
    };
    fetchData();
  }, [user]);

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-4xl mb-3">⏳</div>
          <p className="text-gray-400 text-sm">불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const displayName = (user as any)?.user_metadata?.name || user?.email?.split("@")[0] || "전문가";

  // 통계 계산
  const totalRevenue = subscriptions.filter(s => s.status === "active").reduce((sum, s) => sum + (s.price || 0), 0);
  const activeSubscribers = subscriptions.filter(s => s.status === "active").length;
  const pendingAgents = agents.filter(a => a.status === "pending").length;
  const approvedAgents = agents.filter(a => a.status === "approved").length;

  const statusBadge = (status: string) => {
    if (status === "approved") return { text: "승인됨", cls: "bg-green-100 text-green-600" };
    if (status === "pending") return { text: "심사 중", cls: "bg-yellow-100 text-yellow-600" };
    if (status === "rejected") return { text: "반려됨", cls: "bg-red-100 text-red-600" };
    return { text: status, cls: "bg-gray-100 text-gray-500" };
  };

  const subStatusBadge = (status: string) => {
    if (status === "active") return { text: "이용 중", cls: "bg-green-100 text-green-600" };
    if (status === "pending") return { text: "결제 대기", cls: "bg-yellow-100 text-yellow-600" };
    if (status === "cancelled") return { text: "해지됨", cls: "bg-gray-100 text-gray-500" };
    return { text: status, cls: "bg-gray-100 text-gray-500" };
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* 헤더 */}
      <div className="bg-gradient-to-br from-gray-900 to-blue-900 px-5 md:px-10 py-8 md:py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-400 text-xs mb-1">전문가 대시보드</p>
              <h1 className="text-xl md:text-2xl font-extrabold text-white">
                안녕하세요, {displayName} 님 👋
              </h1>
            </div>
            <Link href="/register">
              <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-700 transition-all shadow-md">
                + 새 Agent 등록
              </button>
            </Link>
          </div>

          {/* 핵심 지표 4개 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "등록 Agent", value: agents.length.toString(), sub: `승인 ${approvedAgents}개`, icon: "🤖" },
              { label: "총 구독자", value: activeSubscribers.toString(), sub: "현재 이용 중", icon: "👥" },
              { label: "월 매출", value: `₩${totalRevenue.toLocaleString()}`, sub: "활성 구독 기준", icon: "💰" },
              { label: "심사 대기", value: pendingAgents.toString(), sub: "검토 중인 Agent", icon: "⏳" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
                <div className="text-xl mb-2">{stat.icon}</div>
                <div className="text-xl md:text-2xl font-extrabold text-white">{stat.value}</div>
                <div className="text-xs font-semibold text-gray-300 mt-0.5">{stat.label}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 탭 */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="flex gap-0">
            {[
              { key: "overview", label: "📋 개요" },
              { key: "agents", label: "🤖 내 Agent" },
              { key: "subscribers", label: "👥 구독자" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-5 py-4 text-sm font-semibold border-b-2 transition-all ${
                  activeTab === tab.key
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 md:px-10 py-8">

        {/* 개요 탭 */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">

            {/* 최근 Agent 현황 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-extrabold text-gray-900">🤖 최근 등록 Agent</h2>
                <button onClick={() => setActiveTab("agents")} className="text-xs text-blue-600 font-semibold hover:underline">
                  전체 보기 →
                </button>
              </div>
              {agents.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">📭</div>
                  <p className="text-gray-500 text-sm mb-4">아직 등록한 Agent가 없어요</p>
                  <Link href="/register">
                    <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-full text-sm hover:bg-blue-700 transition-all">
                      첫 Agent 등록하기
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {agents.slice(0, 3).map((agent) => {
                    const { text, cls } = statusBadge(agent.status);
                    const agentSubs = subscriptions.filter(s => s.agent_id === agent.id && s.status === "active");
                    return (
                      <div key={agent.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">
                          {getEmoji(agent.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-bold text-gray-900">{agent.name}</p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cls}`}>{text}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{agent.category} · 구독자 {agentSubs.length}명</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-extrabold text-gray-900">₩{((agent.price || 0) * agentSubs.length).toLocaleString()}</p>
                          <p className="text-xs text-gray-400">/ 월</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 매출 요약 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-4">💰 매출 요약</h2>
              {agents.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-6">등록된 Agent가 없어요</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {agents.map((agent) => {
                    const agentSubs = subscriptions.filter(s => s.agent_id === agent.id && s.status === "active");
                    const revenue = (agent.price || 0) * agentSubs.length;
                    const totalSubs = subscriptions.filter(s => s.agent_id === agent.id).length;
                    return (
                      <div key={agent.id} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                        <div className="text-xl">{getEmoji(agent.category)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{agent.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full transition-all"
                                style={{ width: totalSubs > 0 ? `${Math.min((agentSubs.length / Math.max(totalSubs, 1)) * 100, 100)}%` : "0%" }}
                              />
                            </div>
                            <span className="text-[10px] text-gray-400 flex-shrink-0">{agentSubs.length}명 이용 중</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-extrabold text-blue-600">₩{revenue.toLocaleString()}</p>
                          <p className="text-[10px] text-gray-400">/ 월</p>
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-sm font-bold text-gray-700">총 월 매출</span>
                    <span className="text-base font-extrabold text-gray-900">₩{totalRevenue.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 내 Agent 탭 */}
        {activeTab === "agents" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-gray-900">전체 Agent ({agents.length}개)</h2>
              <Link href="/register">
                <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-700 transition-all">
                  + 새 Agent 등록
                </button>
              </Link>
            </div>

            {agents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-base font-extrabold text-gray-900 mb-2">아직 등록한 Agent가 없어요</h3>
                <p className="text-gray-500 text-sm mb-6">전문 지식을 AI Agent로 패키징해보세요!</p>
                <Link href="/register">
                  <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm">
                    첫 Agent 등록하기
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agents.map((agent) => {
                  const { text, cls } = statusBadge(agent.status);
                  const agentSubs = subscriptions.filter(s => s.agent_id === agent.id);
                  const activeSubs = agentSubs.filter(s => s.status === "active");
                  const revenue = (agent.price || 0) * activeSubs.length;
                  return (
                    <div key={agent.id} className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0">
                          {getEmoji(agent.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <p className="text-sm font-extrabold text-gray-900">{agent.name}</p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cls}`}>{text}</span>
                          </div>
                          <p className="text-xs text-gray-400">{agent.category}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{agent.description}</p>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          { label: "구독자", value: agentSubs.length },
                          { label: "이용 중", value: activeSubs.length },
                          { label: "월 매출", value: `₩${revenue.toLocaleString()}` },
                        ].map((stat) => (
                          <div key={stat.label} className="bg-gray-50 rounded-xl p-2.5 text-center">
                            <p className="text-sm font-extrabold text-gray-900">{stat.value}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>₩{agent.price?.toLocaleString()} / 월</span>
                        <span>등록일: {new Date(agent.created_at).toLocaleDateString("ko-KR")}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 구독자 탭 */}
        {activeTab === "subscribers" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-extrabold text-gray-900">전체 구독 현황 ({subscriptions.length}건)</h2>

            {subscriptions.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
                <div className="text-5xl mb-4">👥</div>
                <h3 className="text-base font-extrabold text-gray-900 mb-2">아직 구독자가 없어요</h3>
                <p className="text-gray-500 text-sm">Agent를 등록하고 첫 구독자를 만나보세요!</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {/* 요약 바 */}
                <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
                  {[
                    { label: "전체", value: subscriptions.length, color: "text-gray-900" },
                    { label: "이용 중", value: subscriptions.filter(s => s.status === "active").length, color: "text-green-600" },
                    { label: "결제 대기", value: subscriptions.filter(s => s.status === "pending").length, color: "text-yellow-600" },
                  ].map((s) => (
                    <div key={s.label} className="p-4 text-center">
                      <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* 구독 목록 */}
                <div className="divide-y divide-gray-50">
                  {subscriptions.map((sub) => {
                    const { text, cls } = subStatusBadge(sub.status);
                    const agent = agents.find(a => a.id === sub.agent_id);
                    return (
                      <div key={sub.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-lg flex-shrink-0">
                          {getEmoji(agent?.category || "")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-bold text-gray-900">{agent?.name || "Agent"}</p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cls}`}>{text}</span>
                            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold">
                              {sub.plan === "basic" ? "베이직" : "프로"}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">
                            신청일: {new Date(sub.created_at).toLocaleDateString("ko-KR")}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-extrabold text-gray-900">₩{sub.price?.toLocaleString()}</p>
                          <p className="text-xs text-gray-400">/ 월</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}