"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../providers";
import { createClient } from "@/lib/supabase";

const CATEGORY_EMOJI: Record<string, string> = {
  "콘텐츠 마케팅": "📸",
  "리뷰 관리": "⭐",
  "광고 운영": "📢",
  "SNS 관리": "📱",
  "소상공인 마케팅": "🏪",
};

function getEmoji(category: string): string {
  return CATEGORY_EMOJI[category] || "🏪";
}

type Agent = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  author_name: string;
  emoji: string;
  tags: string[];
  badge: string | null;
  rating: number;
  review_count: number;
};

export default function SMBAgentsPage() {
  const [search, setSearch] = useState("");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    const fetchAgents = async () => {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("status", "approved")
        .contains("tags", ["소상공인 마케팅"])
        .order("created_at", { ascending: false });

      if (!error && data) setAgents(data);

      if (!data || data.length === 0) {
        const { data: fallback } = await supabase
          .from("agents")
          .select("*")
          .eq("status", "approved")
          .or("category.ilike.%마케팅%,category.ilike.%소상공인%,tags.cs.{소상공인 마케팅}")
          .order("created_at", { ascending: false });
        if (fallback) setAgents(fallback);
      }

      setLoading(false);
    };
    fetchAgents();
  }, []);

  const filtered = agents.filter((a) => {
    return a.name.includes(search) || a.description.includes(search);
  });

  return (
    <main className="min-h-screen bg-gray-50">

      {/* 헤더 */}
      <div className="bg-gradient-to-br from-orange-600 to-amber-500 px-5 md:px-10 pb-0">
        <div className="max-w-5xl mx-auto pt-8 md:pt-10 pb-0">
          <div className="text-xs text-orange-100 mb-3">
            <Link href="/" className="hover:text-white transition-colors">홈</Link> ›{" "}
            <Link href="/smb" className="hover:text-white transition-colors">소상공인 전용관</Link> › Agent 목록
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white mb-2">🏪 소상공인 마케팅 Agent</h1>
          <p className="text-sm text-orange-100 mb-5">사장님을 위한 마케팅 자동화 AI Agent를 찾아보세요.</p>
          <div className="flex bg-white rounded-full overflow-hidden shadow-lg max-w-lg mb-6">
            <input
              type="text"
              placeholder="Agent 이름, 기능 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 md:px-5 py-3 text-sm outline-none"
            />
            <button className="px-5 md:px-6 bg-orange-600 text-white text-sm font-bold hover:bg-orange-700 transition-all">검색</button>
          </div>
        </div>
      </div>

      {/* Agent 목록 */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="text-center">
              <div className="text-4xl mb-3">⏳</div>
              <p className="text-gray-400 text-sm">불러오는 중...</p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="text-6xl mb-6">🏪</div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">아직 등록된 Agent가 없어요</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
              마케팅 전문가이신가요? 소상공인을 위한 첫 Agent를 등록해보세요!
            </p>
            <Link href="/smb/register">
              <button className="px-8 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-md text-sm">
                🏪 소상공인 Agent 등록하기
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filtered.map((agent) => (
              <Link href={`/agents/${agent.id}`} key={agent.id}>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-orange-300 hover:shadow-lg transition-all cursor-pointer relative">
                  {agent.badge && (
                    <span className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {agent.badge}
                    </span>
                  )}
                  <div className="p-4 flex gap-3 items-start">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl flex-shrink-0">
                      {getEmoji(agent.category)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{agent.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{agent.author_name}</div>
                    </div>
                  </div>
                  <div className="px-4 pb-3">
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{agent.description}</p>
                    <div className="flex gap-1.5 mt-2.5 flex-wrap">
                      {agent.tags?.map((tag) => (
                        <span key={tag} className="text-[10px] bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full font-semibold">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-yellow-500">
                        ⭐ {agent.rating || "-"} <span className="text-gray-400 font-normal">({agent.review_count || 0})</span>
                      </div>
                      <div className="text-sm font-extrabold text-gray-900 mt-0.5">
                        ₩{agent.price?.toLocaleString()} <span className="text-xs font-normal text-gray-400">/월</span>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <button className="px-3 py-1.5 rounded-lg text-xs font-bold border border-orange-500 text-orange-600 hover:bg-orange-50 transition-all">맛보기</button>
                      <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-500 text-white hover:bg-orange-600 transition-all">구매</button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}