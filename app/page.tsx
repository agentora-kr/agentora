"use client";
import Link from "next/link";
import { useState } from "react";

function ComingSoonPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="text-5xl mb-4">🚀</div>
        <h3 className="text-xl font-extrabold text-gray-900 mb-2">준비 중이에요!</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          해당 기능은 현재 준비 중이에요.<br />
          곧 더 나은 모습으로 찾아올게요!
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all text-sm"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  const popup = () => setShowPopup(true);

  return (
    <main className="min-h-screen bg-white">
      {showPopup && <ComingSoonPopup onClose={() => setShowPopup(false)} />}

      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-white text-sm">🤖</div>
          <span className="text-xl font-extrabold text-gray-900">Agentora</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/agents" className="text-sm font-medium text-gray-500 hover:text-blue-600">전체 Agent</Link>
          <button onClick={popup} className="text-sm font-medium text-gray-500 hover:text-blue-600">카테고리</button>
          <Link href="/register" className="text-sm font-medium text-gray-500 hover:text-blue-600">전문가</Link>
          <button onClick={popup} className="text-sm font-medium text-gray-500 hover:text-blue-600">가격 안내</button>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <button className="px-5 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all">로그인</button>
          </Link>
          <Link href="/login">
            <button className="px-5 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md">무료 시작</button>
          </Link>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="pt-40 pb-24 px-10 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-100 rounded-full px-4 py-1.5 text-sm font-semibold text-blue-600 mb-8 shadow-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            지금 AI Agent 마켓플레이스 오픈 준비 중이에요
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
            필요한 AI Agent를<br />
            <span className="text-blue-600">직접 맛보고</span> 도입하세요
          </h1>
          <p className="text-lg text-gray-500 mb-10 leading-relaxed">
            검증된 전문가들이 만든 AI Agent를 체험해보고,<br />
            우리 회사에 꼭 맞는 솔루션만 골라 구독하세요.
          </p>

          {/* 검색바 */}
          <div className="flex items-center bg-white rounded-full shadow-xl border border-blue-100 px-5 py-2 max-w-2xl mx-auto mb-5">
            <span className="text-gray-400 mr-3">🔍</span>
            <input
              type="text"
              placeholder="어떤 업무를 자동화하고 싶으세요? (예: 계약서 검토, 매출 분석...)"
              className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
            />
            <Link href="/agents">
              <button className="ml-3 px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-700 transition-all whitespace-nowrap">
                검색하기
              </button>
            </Link>
          </div>

          {/* 태그 */}
          <div className="flex gap-2 justify-center flex-wrap">
            {["📊 데이터 분석", "📞 고객 응대", "📝 계약서 검토", "💼 영업 지원", "⚖️ 법률", "💰 회계·세무"].map((tag) => (
              <button key={tag} onClick={popup}>
                <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-600 cursor-pointer hover:border-blue-400 hover:text-blue-600 transition-all">
                  {tag}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 통계 바 */}
      <div className="bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto flex justify-center gap-20">
          {[
            { num: "오픈 예정", label: "등록된 AI Agent" },
            { num: "모집 중", label: "전문가 등록" },
            { num: "준비 중", label: "도입 기업" },
            { num: "곧 공개", label: "고객 만족도" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl font-extrabold text-white">{s.num}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 카테고리 */}
      <section className="py-16 px-10 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900">카테고리 탐색 🗂️</h2>
            <Link href="/agents" className="text-sm font-semibold text-blue-600 hover:underline">전체 보기 →</Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: "📊", name: "데이터 분석", count: "준비 중" },
              { icon: "📞", name: "고객 응대", count: "준비 중" },
              { icon: "📝", name: "문서 자동화", count: "준비 중" },
              { icon: "💼", name: "영업·마케팅", count: "준비 중" },
              { icon: "⚖️", name: "법률·계약", count: "준비 중" },
              { icon: "💰", name: "재무·회계", count: "준비 중" },
              { icon: "🏗️", name: "제조·품질", count: "준비 중" },
              { icon: "🔧", name: "IT·개발", count: "준비 중" },
            ].map((cat) => (
              <button key={cat.name} onClick={popup} className="text-left">
                <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all w-full">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{cat.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{cat.count}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 전문가 모집 CTA */}
      <section className="mx-10 my-16 rounded-3xl bg-gradient-to-br from-gray-900 to-blue-900 p-14 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-3">🧑‍💼 전문가이신가요?<br />첫 번째 Agent를 등록해보세요!</h2>
          <p className="text-gray-300 text-sm leading-relaxed">Agentora의 첫 번째 전문가가 되어<br />수많은 기업에 AI Agent를 공급하세요. 등록은 무료!</p>
          <div className="flex gap-3 mt-6">
            <Link href="/register">
              <button className="px-6 py-3 bg-orange-500 text-white font-bold rounded-full text-sm hover:opacity-90 transition-all shadow-lg">전문가 등록하기</button>
            </Link>
            <button onClick={popup} className="px-6 py-3 border border-white/30 text-white font-semibold rounded-full text-sm hover:bg-white/10 transition-all">판매 가이드 보기</button>
          </div>
        </div>
        <div className="flex gap-10 flex-shrink-0">
          <div className="text-center">
            <div className="text-2xl font-extrabold text-white">최대 70%</div>
            <div className="text-xs text-gray-400 mt-1">수익 배분율</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold text-white">무료 등록</div>
            <div className="text-xs text-gray-400 mt-1">지금 바로 시작</div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 px-10 pt-12 pb-8">
        <div className="max-w-5xl mx-auto flex justify-between gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-sm">🤖</div>
              <span className="text-lg font-extrabold text-white">Agentora</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">AI Agent를 맛보고 도입하는<br />B2B 전문 마켓플레이스</p>
          </div>
          <div className="flex gap-14">
            {[
              { title: "서비스", links: [{ label: "Agent 탐색", href: "/agents" }, { label: "카테고리", href: null }, { label: "전문가 찾기", href: null }, { label: "가격 안내", href: null }] },
              { title: "전문가", links: [{ label: "전문가 등록", href: "/register" }, { label: "판매 가이드", href: null }, { label: "수익 정산", href: null }, { label: "파트너 혜택", href: null }] },
              { title: "회사", links: [{ label: "소개", href: null }, { label: "블로그", href: null }, { label: "고객센터", href: null }, { label: "이용약관", href: null }] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">{col.title}</h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <Link href={link.href} className="text-xs text-gray-500 hover:text-white transition-colors">{link.label}</Link>
                      ) : (
                        <button onClick={popup} className="text-xs text-gray-500 hover:text-white transition-colors">{link.label}</button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-gray-800 flex justify-between text-xs text-gray-600">
          <span>© 2026 Agentora. All rights reserved.</span>
          <span>개인정보처리방침 · 이용약관</span>
        </div>
      </footer>

    </main>
  );
}