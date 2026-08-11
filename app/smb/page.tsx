"use client";
import Link from "next/link";

export default function SMBPage() {

  return (
    <main className="min-h-screen bg-white">

      {/* 히어로 */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-amber-50 px-5 md:px-10 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-4 py-2 rounded-full mb-6 border border-orange-200">
            🏪 소상공인 전용 AI 마케팅 자동화
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            사진 한 장이면<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              마케팅이 끝납니다
            </span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-4 max-w-xl mx-auto">
            인스타 캡션, 블로그 글, 릴스 자막, 리뷰 답변까지<br />
            AI가 30초 만에 전부 만들어드려요.
          </p>
          <p className="text-orange-500 font-bold text-sm mb-10">
            마케팅 대행사 월 50만원 → Agentora 월 1~5만원
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/smb/agents">
              <button className="px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 shadow-lg text-sm">
                🏪 마케팅 Agent 둘러보기
              </button>
            </Link>
            <Link href="/smb/register">
              <button className="px-8 py-4 bg-white text-gray-700 font-bold rounded-full hover:bg-gray-50 border border-gray-200 text-sm">
                🧑‍💼 전문가로 등록하기
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 빠른 체험 섹션 */}
      <section className="py-12 px-5 md:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">🍽️ 지금 바로 맛보기</h2>
            <p className="text-gray-400 text-sm">가입 없이 바로 체험해보세요</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/agents/18">
              <div className="bg-orange-50 rounded-2xl border border-orange-200 p-6 text-left hover:border-orange-400 hover:shadow-md transition-all cursor-pointer">
                <div className="text-3xl mb-3">📸</div>
                <h3 className="font-extrabold text-gray-900 mb-1">콘텐츠 자동 생성</h3>
                <p className="text-xs text-gray-500 leading-relaxed">사진 한 장으로 인스타·블로그·릴스·카톡 콘텐츠 자동 생성</p>
                <span className="inline-block mt-3 text-xs font-bold text-orange-500">무료 체험 →</span>
              </div>
            </Link>
            <Link href="/agents/17">
              <div className="bg-yellow-50 rounded-2xl border border-yellow-200 p-6 text-left hover:border-yellow-400 hover:shadow-md transition-all cursor-pointer">
                <div className="text-3xl mb-3">⭐</div>
                <h3 className="font-extrabold text-gray-900 mb-1">리뷰 관리 자동화</h3>
                <p className="text-xs text-gray-500 leading-relaxed">리뷰 캡처 한 장이면 분석 + 답변 초안 + SNS 홍보까지</p>
                <span className="inline-block mt-3 text-xs font-bold text-yellow-600">무료 체험 →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 문제 섹션 */}
      <section className="py-16 px-5 md:px-10 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            사장님, 이런 상황 익숙하지 않으신가요?
          </h2>
          <p className="text-gray-400 text-sm">대부분의 소상공인이 매일 겪는 현실</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { emoji: "😩", title: "마케팅에 하루 3~4시간", desc: "인스타 캡션, 블로그 글, 릴스 자막... 혼자 다 하려니 새벽까지 일하게 돼요." },
            { emoji: "😰", title: "리뷰 답변 못 달고 방치", desc: "부정 리뷰 하나가 매출을 흔들지만, 일일이 답변 달 시간이 없어요." },
            { emoji: "💸", title: "대행사는 너무 비싸", desc: "마케팅 대행사는 월 50~100만원. 매출 대비 감당하기 어려운 금액이에요." },
          ].map((item) => (
            <div key={item.title} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 솔루션 섹션 */}
      <section className="py-16 px-5 md:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">Agentora가 해결해드려요</h2>
            <p className="text-gray-500 text-sm">전문가가 만든 AI Agent로 마케팅을 자동화하세요</p>
          </div>

          {/* Agent 1 */}
          <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
            <div className="flex-1">
              <div className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-3">Agent 1</div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">📸 콘텐츠 운영 Agent</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                메뉴 사진 한 장을 올리면 AI가 30초 만에 4가지 콘텐츠를 동시에 만들어드려요.
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "인스타그램 캡션 + 해시태그 30개",
                  "릴스 자막 (15초/30초/60초 버전)",
                  "네이버 블로그 SEO 최적화 글",
                  "카카오톡 채널 홍보 메시지",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-orange-500 font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/agents/18">
                <button className="mt-5 px-6 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 text-sm">
                  지금 무료 체험 →
                </button>
              </Link>
            </div>
            <div className="flex-1 bg-orange-50 rounded-2xl p-6 border border-orange-100 text-center">
              <div className="text-5xl mb-3">📸</div>
              <div className="font-bold text-gray-700 mb-1 text-sm">사진 업로드</div>
              <div className="text-xs text-gray-400 mb-3">↓ 30초</div>
              <div className="grid grid-cols-2 gap-2">
                {["인스타 캡션", "릴스 자막", "블로그 글", "카톡 메시지"].map((t) => (
                  <div key={t} className="bg-white rounded-lg p-2 text-xs font-semibold text-orange-600 border border-orange-100">
                    {t} ✨
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Agent 2 */}
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
            <div className="flex-1">
              <div className="inline-block bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full mb-3">Agent 2</div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">⭐ 리뷰 관리 Agent</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                리뷰 화면을 캡처해서 올리면 AI가 분석하고 답변 초안을 만들어드려요.
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "긍정/부정/중립 자동 분류",
                  "부정 리뷰 정중한 답변 초안",
                  "긍정 리뷰 SNS 홍보 콘텐츠 변환",
                  "전체 리뷰 트렌드 분석",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-yellow-500 font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/agents/17">
                <button className="mt-5 px-6 py-3 bg-yellow-500 text-white font-bold rounded-full hover:bg-yellow-600 text-sm">
                  지금 무료 체험 →
                </button>
              </Link>
            </div>
            <div className="flex-1 bg-yellow-50 rounded-2xl p-6 border border-yellow-100 text-center">
              <div className="text-5xl mb-3">📸</div>
              <div className="font-bold text-gray-700 mb-1 text-sm">리뷰 캡처 업로드</div>
              <div className="text-xs text-gray-400 mb-3">↓ 30초</div>
              <div className="flex flex-col gap-2">
                <div className="bg-red-50 rounded-lg p-2 text-xs text-red-600 border border-red-100 text-left">🔴 부정 리뷰 → 정중한 답변 자동 생성</div>
                <div className="bg-green-50 rounded-lg p-2 text-xs text-green-600 border border-green-100 text-left">🟢 긍정 리뷰 → SNS 홍보 콘텐츠 변환</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 전체 Agent 보러가기 */}
      <section className="py-12 px-5 md:px-10 bg-orange-50 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-extrabold text-gray-900 mb-3">더 많은 마케팅 Agent를 찾아보세요</h2>
          <p className="text-gray-500 text-sm mb-6">소상공인을 위한 다양한 AI Agent가 준비되어 있어요.</p>
          <Link href="/smb/agents">
            <button className="px-8 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 shadow-md text-sm">
              🏪 전체 Agent 보러가기 →
            </button>
          </Link>
        </div>
      </section>

      {/* 가격 비교 */}
      <section className="py-16 px-5 md:px-10 bg-gradient-to-br from-orange-500 to-amber-500 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-8">대행사의 1/10 비용으로</h2>
          <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
            <div className="text-center">
              <div className="text-sm opacity-70 mb-1">마케팅 대행사</div>
              <div className="text-3xl font-extrabold line-through opacity-60">월 50~100만원</div>
            </div>
            <div className="text-4xl">→</div>
            <div className="text-center">
              <div className="text-sm opacity-70 mb-1">Agentora</div>
              <div className="text-4xl font-extrabold">월 1~5만원</div>
            </div>
          </div>
          <Link href="/login">
            <button className="px-10 py-4 bg-white text-orange-500 font-extrabold rounded-full hover:bg-orange-50 shadow-lg text-base">
              지금 무료로 시작하기 →
            </button>
          </Link>
          <p className="text-sm opacity-60 mt-4">신용카드 없이 가입 · 3회 무료 체험 제공</p>
        </div>
      </section>

      {/* 전문가 CTA */}
      <section className="py-16 px-5 md:px-10 bg-gray-50 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3">마케팅 전문가이신가요?</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            당신의 노하우를 AI Agent로 만들어 소상공인에게 판매하세요.<br />
            수수료 0%로 시작할 수 있어요.
          </p>
          <Link href="/smb/register">
            <button className="px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-700 text-sm">
              전문가로 등록하기 →
            </button>
          </Link>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 px-5 md:px-10 py-8 text-center">
        <span className="text-white font-extrabold">Agentora</span>
        <p className="text-gray-500 text-xs mt-2">© 2026 Agentora. All rights reserved.</p>
      </footer>

    </main>
  );
}