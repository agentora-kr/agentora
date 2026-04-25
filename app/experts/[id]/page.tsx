"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

const CATEGORY_EMOJI: Record<string, string> = {
  "데이터 분석": "📊", "고객 응대": "📞", "문서 자동화": "📝",
  "영업·마케팅": "💼", "법률·계약": "⚖️", "재무·회계": "💰",
  "제조·품질": "🏗️", "IT·개발": "🔧", "의료·헬스": "🏥", "교육·HR": "🎓",
};
function getEmoji(category: string) { return CATEGORY_EMOJI[category] || "🤖"; }

type Expert = {
  id: number;
  user_id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  experience: string;
  intro: string;
  description: string;
  categories: string[];
  status: string;
};

type Agent = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
};

type Review = {
  id: number;
  agent_id: number;
  user_id: string;
  rating: number;
  content: string;
  created_at: string;
  agent_name?: string;
  agent_category?: string;
};

export default function ExpertProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const [expertId, setExpertId] = useState<string>("");
  const [expert, setExpert] = useState<Expert | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    params.then(({ id }) => setExpertId(id));
  }, [params]);

  useEffect(() => {
    if (!expertId) return;

    const fetchData = async () => {
      // 전문가 정보
      const { data: expertData } = await supabase
        .from("experts")
        .select("*")
        .eq("id", expertId)
        .single();

      if (!expertData) { setLoading(false); return; }
      setExpert(expertData);

      // 전문가의 Agent 목록
      const { data: agentData } = await supabase
        .from("agents")
        .select("*")
        .eq("expert_email", expertData.email)
        .eq("status", "approved");

      const agentList = agentData || [];
      setAgents(agentList);

      // Agent들의 리뷰 조회
      if (agentList.length > 0) {
        const agentIds = agentList.map((a) => a.id);
        const { data: reviewData } = await supabase
          .from("reviews")
          .select("*")
          .in("agent_id", agentIds)
          .order("created_at", { ascending: false });

        // 리뷰에 agent 이름 붙이기
        const reviewsWithAgent = (reviewData || []).map((r) => {
          const agent = agentList.find((a) => a.id === r.agent_id);
          return {
            ...r,
            agent_name: agent?.name || "Agent",
            agent_category: agent?.category || "",
          };
        });
        setReviews(reviewsWithAgent);
      }

      setLoading(false);
    };

    fetchData();
  }, [expertId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">⏳</div>
          <p className="text-gray-400 text-sm">불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">😢</div>
          <p className="text-gray-700 font-bold mb-2">전문가를 찾을 수 없어요</p>
          <Link href="/agents">
            <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-full text-sm">목록으로</button>
          </Link>
        </div>
      </div>
    );
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <main className="min-h-screen bg-gray-50">

      {/* 헤더 */}
      <div className="bg-gradient-to-br from-gray-900 to-blue-900 px-5 md:px-10 py-10 md:py-14">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs text-gray-400 mb-5">
            <Link href="/" className="hover:text-white transition-colors">홈</Link> ›{" "}
            <Link href="/agents" className="hover:text-white transition-colors">전체 Agent</Link> › 전문가 프로필
          </div>
          <div className="flex gap-5 items-start">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 flex items-center justify-center text-3xl border-2 border-white/30 flex-shrink-0">
              👤
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                {expert.categories?.map((cat) => (
                  <span key={cat} className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-semibold border border-blue-400/20">
                    {getEmoji(cat)} {cat}
                  </span>
                ))}
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1">{expert.name}</h1>
              <p className="text-sm text-gray-400 mb-1">{expert.title}{expert.company && ` · ${expert.company}`}</p>
              {expert.experience && (
                <p className="text-xs text-gray-500">경력 {expert.experience}</p>
              )}
              <div className="flex items-center gap-4 mt-3">
                {avgRating && (
                  <span className="text-sm font-bold text-yellow-400">⭐ {avgRating} <span className="text-gray-400 font-normal">({reviews.length}개 리뷰)</span></span>
                )}
                <span className="text-sm text-gray-400">Agent {agents.length}개</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 md:px-10 py-8 flex flex-col gap-6">

        {/* 전문가 소개 */}
        {(expert.intro || expert.description) && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
            <h2 className="text-base font-extrabold text-gray-900 mb-3">👤 전문가 소개</h2>
            {expert.intro && (
              <p className="text-sm font-semibold text-gray-700 mb-2">"{expert.intro}"</p>
            )}
            {expert.description && (
              <p className="text-sm text-gray-500 leading-relaxed">{expert.description}</p>
            )}
          </div>
        )}

        {/* 등록 Agent 목록 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
          <h2 className="text-base font-extrabold text-gray-900 mb-4">🤖 등록한 Agent ({agents.length}개)</h2>
          {agents.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">아직 등록된 Agent가 없어요</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {agents.map((agent) => (
                <Link href={`/agents/${agent.id}`} key={agent.id}>
                  <div className="flex gap-3 items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">
                      {getEmoji(agent.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{agent.name}</p>
                      <p className="text-xs text-gray-400 truncate">{agent.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-extrabold text-blue-600">₩{agent.price?.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-400">/ 월</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* 리뷰 목록 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-extrabold text-gray-900">
              ⭐ 리뷰 ({reviews.length}개)
            </h2>
            {avgRating && (
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold text-gray-900">{avgRating}</span>
                <span className="text-yellow-400 text-lg">★</span>
              </div>
            )}
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">💬</div>
              <p className="text-gray-400 text-sm">아직 리뷰가 없어요</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
                        익명
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          {[1,2,3,4,5].map((star) => (
                            <span key={star} className={`text-sm ${star <= review.rating ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                          ))}
                        </div>
                        {/* ✅ 어떤 Agent에 대한 리뷰인지 표시 */}
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {getEmoji(review.agent_category || "")} {review.agent_name}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">
                      {new Date(review.created_at).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  {review.content && (
                    <p className="text-sm text-gray-600 leading-relaxed">{review.content}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}