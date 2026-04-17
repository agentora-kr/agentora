"use client";
import { useState } from "react";
import Link from "next/link";

const categories = ["전체", "데이터 분석", "고객 응대", "문서 자동화", "영업·마케팅", "법률·계약", "재무·회계", "제조·품질", "IT·개발"];

export default function AgentsPage() {
  const [selectedCat, setSelectedCat] = useState("전체");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-sm">🤖</div>
          <span className="text-xl font-extrabold text-gray-900">Agentora</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/agents" className="text-sm font-bold text-blue-600">전체 Agent</Link>
          <Link href="/register" className="text-sm font-medium text-gray-500 hover:text-blue-600">전문가 등록</Link>
        </div>
        <div className="hidden md:flex gap-3">
          <Link href="/login"><button className="px-5 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all">로그인</button></Link>
          <Link href="/login"><button className="px-5 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md">무료 시작</button></Link>
        </div>
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-lg md:hidden">
          <div className="flex flex-col p-4 gap-4">
            <Link href="/agents" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-blue-600 py-2 border-b border-gray-100">전체 Agent</Link>
            <Link href="/register" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-gray-700 py-2 border-b border-gray-100">전문가 등록</Link>
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="flex-1"><button className="w-full py-2.5 rounded-full text-sm font-semibold border border-gray-200 text-gray-600">로그인</button></Link>
              <Link href="/login" className="flex-1"><button className="w-full py-2.5 rounded-full text-sm font-semibold bg-blue-600 text-white">무료 시작</button></Link>
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
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 md:px-5 py-3 text-xs md:text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${selectedCat === cat ? "text-white border-orange-400" : "text-gray-400 border-transparent hover:text-white"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 빈 상태 */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 py-16 flex flex-col items-center justify-center text-center">
        <div className="text-6xl md:text-7xl mb-6">🤖</div>
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3">아직 등록된 Agent가 없어요</h2>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 max-w-md">
          전문가들이 Agent를 준비 중이에요.<br />
          전문가이신가요? 첫 번째 Agent를 등록해보세요!
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/register">
            <button className="px-6 md:px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm">🧑‍💼 전문가 등록하기</button>
          </Link>
          <Link href="/">
            <button className="px-6 md:px-8 py-3 border border-gray-200 text-gray-600 font-bold rounded-full hover:border-blue-400 hover:text-blue-600 transition-all text-sm">← 홈으로</button>
          </Link>
        </div>

        <div className="mt-12 md:mt-14 w-full max-w-2xl">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">곧 등록 예정인 카테고리</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: "⚖️", name: "법률·계약" },
              { icon: "📊", name: "데이터 분석" },
              { icon: "💰", name: "재무·회계" },
              { icon: "📞", name: "고객 응대" },
              { icon: "📝", name: "문서 자동화" },
              { icon: "💼", name: "영업·마케팅" },
              { icon: "🏗️", name: "제조·품질" },
              { icon: "🔧", name: "IT·개발" },
            ].map((cat) => (
              <div key={cat.name} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-2 opacity-60">
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-semibold text-gray-600">{cat.name}</span>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">준비 중</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}