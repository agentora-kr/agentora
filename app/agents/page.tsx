"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../providers";
import { createClient } from "@/lib/supabase";

const categories = ["전체", "데이터 분석", "고객 응대", "문서 자동화", "영업·마케팅", "법률·계약", "재무·회계", "제조·품질", "IT·개발"];

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

export default function AgentsPage() {
  const [selectedCat, setSelectedCat] = useState("전체");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    const fetchAgents = async () => {
      const { data, error } = await supabase.from("agents").select("*").order("created_at", { ascending: false });
      if (!error && data) setAgents(data);
      setLoading(false);
    };
    fetchAgents();
  }, []);

  const filtered = agents.filter((a) => {
    const matchCat = selectedCat === "전체" || a.category === selectedCat;
    const matchSearch = a.name.includes(search) || a.description.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50">
     
      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-lg md:hidden">
          <div className="flex flex-col p-4 gap-4">
            <Link href="/agents" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-blue-600 py-2 border-b border-gray-100">전체 Agent</Link>
            <Link href="/register" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-gray-700 py-2 border-b border-gray-100">전문가 등록</Link>
            <div className="flex gap-3 pt-2">
              {user ? (
                <Link href="/mypage" className="flex-1" onClick={() => setMenuOpen(false)}>
                  <button className="w-full py-2.5 rounded-full text-sm font-semibold bg-blue-600 text-white">마이페이지</button>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="flex-1" onClick={() => setMenuOpen(false)}>
                    <button className="w-full py-2.5 rounded-full text-sm font-semibold border border-gray-200 text-gray-600">로그인</button>
                  </Link>
                  <Link href="/login" className="flex-1" onClick={() => setMenuOpen(false)}>
                    <button className="w-full py-2.5 rounded-full text-sm font-semibold bg-blue-600 text-white">무료 시작</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 헤더 */}
      <div className="pt-16 bg-gradient-to-br from-gray-900 to-blue-900 px-5 md:px-10 pb-0">
        <div className="max-w-5xl mx-auto pt-8 md:pt-10 pb-0">
          <div className="text-xs text-gray-400 mb-3">
            <Link href="/" className="hover:text-white transition-colors">홈</Link> › 전체 Agent
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white mb-2">AI Agent 탐색</h1>
          <p className="text-sm text-gray-400 mb-5">검증된 전문가들의 AI Agent를 찾아보세요.</p>
          <div className="flex bg-white rounded-full overflow-hidden shadow-lg max-w-lg mb-0">
            <input
              type="text"
              placeholder="Agent 이름, 기능 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 md:px-5 py-3 text-sm outline-none"
            />
            <button className="px-5 md:px-6 bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-all">검색</button>
          </div>
          <div className="flex gap-0 overflow-x-auto mt-5 scrollbar-hide">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCat(cat)}
                className={`px-4 md:px-5 py-3 text-xs md:text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${selectedCat === cat ? "text-white border-orange-400" : "text-gray-400 border-transparent hover:text-white"}`}>
                {cat}
              </button>
            ))}
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
            <div className="text-6xl mb-6">🤖</div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">아직 등록된 Agent가 없어요</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
              전문가이신가요? 첫 번째 Agent를 등록해보세요!
            </p>
            <Link href="/register">
              <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm">🧑‍💼 전문가 등록하기</button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filtered.map((agent) => (
              <Link href={`/agents/${agent.id}`} key={agent.id}>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer relative">
                  {agent.badge && (
                    <span className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {agent.badge}
                    </span>
                  )}
                  <div className="p-4 flex gap-3 items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0">
                      {agent.emoji}
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
                        <span key={tag} className="text-[10px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-semibold">{tag}</span>
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
                      <button className="px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-500 text-blue-600 hover:bg-blue-50 transition-all">맛보기</button>
                      <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all">구매</button>
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