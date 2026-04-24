"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./providers";

function ComingSoonPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4 text-center" onClick={e => e.stopPropagation()}>
        <div className="text-4xl mb-4">🚀</div>
        <h3 className="text-xl font-extrabold text-gray-900 mb-2">곧 출시 예정!</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">현재 베타 서비스 준비 중이에요.<br />조금만 기다려주세요!</p>
        <button onClick={onClose} className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all text-sm">확인</button>
      </div>
    </div>
  );
}

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-gray-50">
      {showPopup && <ComingSoonPopup onClose={() => setShowPopup(false)} />}

      {/* 네비게이션 */}
      
      {/* 히어로 섹션 */}
      <div className="pt-16 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 px-5 md:px-10 py-20 md:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-orange-500/10 text-orange-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-orange-500/20">
            🇰🇷 한국 최초 AI Agent B2B 마켓플레이스
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            전문가의 지식을<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">AI Agent</span>로 만나세요
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            검증된 전문가들이 만든 AI Agent를 구독하고<br />
            업무 자동화를 시작하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/agents">
              <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg text-sm">
                🔍 Agent 탐색하기
              </button>
            </Link>
            <Link href="/register">
              <button className="px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all border border-white/20 text-sm">
                🧑‍💼 전문가로 등록하기
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 카테고리 섹션 */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">분야별 AI Agent</h2>
          <p className="text-gray-500 text-sm">다양한 전문 분야의 Agent를 찾아보세요</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: "📊", label: "데이터 분석", cat: "데이터 분석" },
            { emoji: "⚖️", label: "법률·계약", cat: "법률·계약" },
            { emoji: "💰", label: "재무·회계", cat: "재무·회계" },
            { emoji: "🏗️", label: "제조·품질", cat: "제조·품질" },
            { emoji: "📝", label: "문서 자동화", cat: "문서 자동화" },
            { emoji: "💼", label: "영업·마케팅", cat: "영업·마케팅" },
            { emoji: "🔧", label: "IT·개발", cat: "IT·개발" },
            { emoji: "🏥", label: "의료·헬스", cat: "의료·헬스" },
          ].map(item => (
            <Link href={`/agents?category=${item.cat}`} key={item.label}>
              <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="text-sm font-bold text-gray-700">{item.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA 섹션 */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-5 md:px-10 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">전문가이신가요?</h2>
          <p className="text-blue-200 text-sm leading-relaxed mb-8">
            당신의 전문 지식을 AI Agent로 패키징하고<br />수천 개 기업에 공급하세요.
          </p>
          <Link href="/register">
            <button className="px-10 py-4 bg-white text-blue-600 font-extrabold rounded-full hover:bg-blue-50 transition-all shadow-lg text-sm">
              🚀 지금 등록하기
            </button>
          </Link>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-gray-900 px-5 md:px-10 py-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          {/* 푸터 */}
<footer className="bg-gray-900 px-5 md:px-10 py-10 text-center">
  <div className="flex items-center justify-center gap-2 mb-4">
    <span className="text-white font-extrabold">Agentora</span>
  </div>
  <p className="text-gray-500 text-xs">© 2025 Agentora. All rights reserved.</p>
</footer>
          <span className="text-white font-extrabold">Agentora</span>
        </div>
        <p className="text-gray-500 text-xs">© 2025 Agentora. All rights reserved.</p>
      </footer>
    </main>
  );
}