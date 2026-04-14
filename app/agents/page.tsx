"use client";
import { useState } from "react";
import Link from "next/link";

const agents = [
  { id: 1, emoji: "🤖", bg: "bg-blue-50", name: "계약서 리뷰 Agent", author: "김법률 변호사", desc: "위험 조항·불리한 조건을 즉시 분석하고 수정안을 제안합니다.", tags: ["법률", "계약서"], rating: "4.9", reviews: "342", price: "89,000", badge: "HOT", badgeColor: "bg-orange-500", cat: "법률·계약" },
  { id: 2, emoji: "📈", bg: "bg-green-50", name: "매출 데이터 분석", author: "데이터랩 · 이분석", desc: "매출 트렌드, 이상치, 예측 리포트를 자동 생성합니다.", tags: ["데이터", "예측"], rating: "4.8", reviews: "218", price: "120,000", badge: null, badgeColor: "", cat: "데이터 분석" },
  { id: 3, emoji: "💬", bg: "bg-orange-50", name: "고객 CS 자동화", author: "박서비스 · CS전문", desc: "24시간 고객 문의 응대. 담당자 자동 에스컬레이션.", tags: ["CS", "챗봇"], rating: "4.7", reviews: "89", price: "65,000", badge: "NEW", badgeColor: "bg-green-500", cat: "고객 응대" },
  { id: 4, emoji: "📧", bg: "bg-purple-50", name: "영업 이메일 작성", author: "최마케팅 · 그로스팀", desc: "업종별 맞춤 영업 이메일을 자동 초안 작성합니다.", tags: ["영업", "이메일"], rating: "4.6", reviews: "176", price: "45,000", badge: "PICK", badgeColor: "bg-blue-600", cat: "영업·마케팅" },
  { id: 5, emoji: "🏭", bg: "bg-red-50", name: "품질 불량 예측", author: "정제조 · 스마트팩토리", desc: "센서 데이터 실시간 분석, 불량 사전 감지.", tags: ["제조", "품질"], rating: "4.9", reviews: "134", price: "200,000", badge: "HOT", badgeColor: "bg-orange-500", cat: "제조·품질" },
  { id: 6, emoji: "💰", bg: "bg-emerald-50", name: "세금계산서 자동화", author: "한회계 · 택스솔루션", desc: "세금계산서 분류·검토 후 회계 소프트웨어 자동 입력.", tags: ["회계", "ERP"], rating: "4.7", reviews: "201", price: "75,000", badge: null, badgeColor: "", cat: "재무·회계" },
  { id: 7, emoji: "🔧", bg: "bg-sky-50", name: "코드 리뷰 자동화", author: "오개발 · 테크랩", desc: "PR 생성 시 코드 품질·보안 취약점 자동 분석.", tags: ["개발", "보안"], rating: "4.8", reviews: "267", price: "55,000", badge: "PICK", badgeColor: "bg-blue-600", cat: "IT·개발" },
  { id: 8, emoji: "📝", bg: "bg-yellow-50", name: "회의록 자동 정리", author: "류문서 · 워크플로우", desc: "회의 음성·텍스트를 요약, 결정사항, 액션아이템으로 정리.", tags: ["회의록", "요약"], rating: "4.5", reviews: "143", price: "35,000", badge: null, badgeColor: "", cat: "문서 자동화" },
];

const categories = ["전체", "데이터 분석", "고객 응대", "문서 자동화", "영업·마케팅", "법률·계약", "재무·회계", "제조·품질", "IT·개발"];

export default function AgentsPage() {
  const [selectedCat, setSelectedCat] = useState("전체");
  const [search, setSearch] = useState("");

  const filtered = agents.filter((a) => {
    const matchCat = selectedCat === "전체" || a.cat === selectedCat;
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-sm">🤖</div>
          <span className="text-xl font-extrabold text-gray-900">Agentora</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/agents" className="text-sm font-bold text-blue-600">전체 Agent</Link>
          <Link href="#" className="text-sm font-medium text-gray-500 hover:text-blue-600">카테고리</Link>
          <Link href="#" className="text-sm font-medium text-gray-500 hover:text-blue-600">전문가</Link>
        </div>
        <div className="flex gap-3">
          <Link href="/login"><button className="px-5 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all">로그인</button></Link>
          <Link href="/login"><button className="px-5 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md">무료 시작</button></Link>
        </div>
      </nav>

      {/* 헤더 */}
      <div className="pt-16 bg-gradient-to-br from-gray-900 to-blue-900 px-10 pb-0">
        <div className="max-w-5xl mx-auto pt-10 pb-0">
          <div className="text-xs text-gray-400 mb-3">
            <Link href="/" className="hover:text-white transition-colors">홈</Link> › 전체 Agent
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-2">AI Agent 탐색</h1>
          <p className="text-sm text-gray-400 mb-5">1,240개 이상의 검증된 AI Agent를 찾아보세요.</p>
          <div className="flex bg-white rounded-full overflow-hidden shadow-lg max-w-lg mb-0">
            <input
              type="text"
              placeholder="Agent 이름, 기능 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-5 py-3 text-sm outline-none"
            />
            <button className="px-6 bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-all">검색</button>
          </div>
          {/* 카테고리 탭 */}
          <div className="flex gap-0 overflow-x-auto mt-5 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${selectedCat === cat ? "text-white border-orange-400" : "text-gray-400 border-transparent hover:text-white"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 */}
      <div className="max-w-5xl mx-auto px-10 py-8">
        <div className="flex justify-between items-center mb-5">
          <p className="text-sm text-gray-500">총 <strong className="text-gray-900">{filtered.length}개</strong> Agent</p>
          <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none">
            <option>인기순</option>
            <option>평점 높은순</option>
            <option>최신순</option>
            <option>가격 낮은순</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {filtered.map((agent) => (
            <Link href={`/agents/${agent.id}`} key={agent.id}>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer relative">
                {agent.badge && (
                  <span className={`absolute top-3 right-3 ${agent.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full`}>
                    {agent.badge}
                  </span>
                )}
                <div className="p-4 flex gap-3 items-start">
                  <div className={`w-12 h-12 rounded-xl ${agent.bg} flex items-center justify-center text-2xl flex-shrink-0`}>
                    {agent.emoji}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{agent.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{agent.author}</div>
                  </div>
                </div>
                <div className="px-4 pb-3">
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{agent.desc}</p>
                  <div className="flex gap-1.5 mt-2.5 flex-wrap">
                    {agent.tags.map((tag) => (
                      <span key={tag} className="text-[10px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-semibold">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-yellow-500">⭐ {agent.rating} <span className="text-gray-400 font-normal">({agent.reviews})</span></div>
                    <div className="text-sm font-extrabold text-gray-900 mt-0.5">₩{agent.price} <span className="text-xs font-normal text-gray-400">/월</span></div>
                  </div>
                  <div className="flex gap-1.5" onClick={(e) => e.preventDefault()}>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-500 text-blue-600 hover:bg-blue-50 transition-all">맛보기</button>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all">구매</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}