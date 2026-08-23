"use client";
import Link from "next/link";
import { Check, Image as ImageIcon, MessageSquare, ArrowRight } from "lucide-react";

export default function SMBPage() {

  return (
    <main className="min-h-screen bg-white">

      {/* 히어로 */}
      <section className="bg-white px-5 md:px-10 py-[56px] text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-[34px] font-medium tracking-[-0.035em] text-gray-900 leading-[1.32] mb-[16px]">
            사진 한 장 올리면<br />
            <span className="text-accent">
              홍보글이 나옵니다
            </span>
          </h1>
          <p className="text-[18px] text-ink leading-[1.6] tracking-[-0.02em] mb-[8px] max-w-xl mx-auto">
            인스타 글, 블로그 글, 리뷰 답변까지<br />
            30초면 다 됩니다
          </p>
          <p className="text-[17px] text-muted font-bold tracking-[-0.02em] mb-[28px]">
            대행사 월 50만원 → <span className="text-accent font-medium">월 1만원</span>
          </p>
          <Link href="/smb/agents">
            <button className="px-[34px] py-[16px] bg-accent text-white text-[17px] font-medium rounded-lg hover:opacity-90 transition-all shadow-lg min-h-[48px] inline-flex items-center justify-center">
              무료로 해보기
            </button>
          </Link>
        </div>
      </section>

      {/* 문제 섹션 */}
      <section className="py-[96px] px-[30px] bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[28px] font-medium text-ink tracking-[-0.035em] mb-4">
            사장님, 이런 상황 익숙하지 않으신가요?
          </h2>
          <p className="text-base text-muted mb-[36px]">대부분의 소상공인이 매일 겪는 현실</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <p className="text-[20px] font-normal text-ink leading-[1.65] tracking-[-0.02em] mb-[28px]">
            인스타 캡션, 블로그 글, 릴스 자막... 혼자 다 하려니 <span className="text-accent">새벽까지</span> 일하게 돼요.
          </p>
          <div className="h-[0.5px] bg-line mb-[28px]" />
          <p className="text-[20px] font-normal text-ink leading-[1.65] tracking-[-0.02em] mb-[28px]">
            부정 리뷰 하나가 매출을 흔들지만, <span className="text-accent">일일이 답변 달 시간이</span> 없어요.
          </p>
          <div className="h-[0.5px] bg-line mb-[28px]" />
          <p className="text-[20px] font-normal text-ink leading-[1.65] tracking-[-0.02em] mb-[28px]">
            마케팅 대행사는 <span className="text-accent">월 50~100만원</span>. 매출 대비 감당하기 어려운 금액이에요.
          </p>
        </div>
      </section>

      {/* 솔루션 섹션 */}
      <section className="py-16 px-5 md:px-10 bg-sand">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.03em] text-gray-900 mb-4">Agentora가 해결해드려요</h2>
            <p className="text-muted text-base tracking-[-0.02em]">전문가가 만든 AI Agent로 마케팅을 자동화하세요</p>
          </div>

          {/* Agent 1 */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="text-[13px] font-bold text-accent mb-3">Agent 1</div>
              <h3 className="text-xl font-medium tracking-[-0.03em] text-gray-900 mb-3">콘텐츠 운영 Agent</h3>
              <p className="text-muted text-base leading-relaxed tracking-[-0.02em] mb-4">
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
                    <Check size={16} color="#0F1B2E" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/agents/26">
                <button className="mt-5 px-6 py-3 bg-accent text-white font-bold rounded-lg hover:opacity-90 text-sm min-h-[48px] inline-flex items-center justify-center">
                  지금 무료 체험
                </button>
              </Link>
            </div>
            <div className="flex-1 bg-white rounded-2xl p-6 border-[0.5px] border-line text-center">
              <div className="flex justify-center mb-3">
                <ImageIcon size={24} color="#5F5E5A" />
              </div>
              <div className="font-bold text-gray-700 mb-1 text-sm">사진 업로드</div>
              <div className="text-sm text-muted mb-3">↓ 30초</div>
              <div className="grid grid-cols-2 gap-2">
                {["인스타 캡션", "릴스 자막", "블로그 글", "카톡 메시지"].map((t) => (
                  <div key={t} className="bg-sand rounded-lg p-2 text-sm font-semibold text-accent border-[0.5px] border-line">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="h-[0.5px] bg-line my-16" />

          {/* Agent 2 */}
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
            <div className="flex-1">
              <div className="text-[13px] font-bold text-accent mb-3">Agent 2</div>
              <h3 className="text-xl font-medium tracking-[-0.03em] text-gray-900 mb-3">리뷰 관리 Agent</h3>
              <p className="text-muted text-base leading-relaxed tracking-[-0.02em] mb-4">
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
                    <Check size={16} color="#0F1B2E" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/agents/17">
                <button className="mt-5 px-6 py-3 bg-accent text-white font-bold rounded-lg hover:opacity-90 text-sm min-h-[48px] inline-flex items-center justify-center">
                  지금 무료 체험
                </button>
              </Link>
            </div>
            <div className="flex-1 bg-white rounded-2xl p-6 border-[0.5px] border-line text-center">
              <div className="flex justify-center mb-3">
                <MessageSquare size={24} color="#5F5E5A" />
              </div>
              <div className="font-bold text-gray-700 mb-1 text-sm">리뷰 캡처 업로드</div>
              <div className="text-sm text-muted mb-3">↓ 30초</div>
              <div className="flex flex-col gap-2">
                <div className="bg-white rounded-lg p-2 border-[0.5px] border-line border-l-2 border-l-[#B4453A] text-sm text-[#B4453A] text-left">부정 리뷰 → 정중한 답변 자동 생성</div>
                <div className="bg-white rounded-lg p-2 border-[0.5px] border-line border-l-2 border-l-[#0F6E56] text-sm text-[#0F6E56] text-left">긍정 리뷰 → SNS 홍보 콘텐츠 변환</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 빠른 체험 섹션 */}
      <section className="py-12 px-5 md:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium tracking-[-0.03em] text-gray-900 mb-2">지금 바로 맛보기</h2>
            <p className="text-muted text-base tracking-[-0.02em]">가입 없이 바로 체험해보세요</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/agents/26">
              <div className="bg-white rounded-[10px] border-[0.5px] border-line hover:border-accent p-6 text-left transition-all cursor-pointer">
                <ImageIcon size={24} color="#5F5E5A" className="mb-3" />
                <h3 className="font-medium tracking-[-0.03em] text-gray-900 mb-1">홍보글 자동생성</h3>
                <p className="text-base text-muted leading-relaxed tracking-[-0.02em]">사진 한 장이면 홍보 완성. 올리고 · 누르고 · 복사하면 끝</p>
                <span className="inline-block mt-3 text-sm font-bold text-accent">무료 체험</span>
              </div>
            </Link>
            <Link href="/agents/17">
              <div className="bg-white rounded-[10px] border-[0.5px] border-line hover:border-accent p-6 text-left transition-all cursor-pointer">
                <MessageSquare size={24} color="#5F5E5A" className="mb-3" />
                <h3 className="font-medium tracking-[-0.03em] text-gray-900 mb-1">리뷰 관리 자동화</h3>
                <p className="text-base text-muted leading-relaxed tracking-[-0.02em]">리뷰 캡처 한 장이면 분석 + 답변 초안 + SNS 홍보까지</p>
                <span className="inline-block mt-3 text-sm font-bold text-accent">무료 체험</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 가격 비교 */}
      <section className="py-[88px] px-5 md:px-10 bg-sand text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[30px] font-bold text-ink tracking-[-0.04em] mb-[32px]">대행사의 1/10 비용으로</h2>
          <div className="flex items-center justify-center gap-[22px] mb-[32px] flex-wrap">
            <div className="text-center">
              <div className="text-[14px] text-[#888780] mb-[6px]">마케팅 대행사</div>
              <div className="text-[26px] font-normal text-[#A8A59D] line-through tracking-[-0.03em]">월 50~100만원</div>
            </div>
            <ArrowRight size={24} color="#A8A59D" />
            <div className="text-center">
              <div className="text-[14px] text-muted mb-[6px]">Agentora</div>
              <div className="text-[42px] font-bold text-accent tracking-[-0.045em] leading-[1.1]">월 1~5만원</div>
            </div>
          </div>
          <Link href="/login">
            <button className="px-[34px] py-[16px] bg-accent text-white text-[17px] font-bold rounded-lg hover:opacity-90 transition-all min-h-[48px] inline-flex items-center justify-center">
              지금 무료로 시작하기
            </button>
          </Link>
          <p className="text-[14px] text-[#888780] tracking-[-0.02em] mt-[14px]">신용카드 없이 가입 · 3회 무료 체험 제공</p>
        </div>
      </section>

      {/* 전체 Agent 보러가기 */}
      <section className="py-12 px-5 md:px-10 bg-orange-50 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-medium tracking-[-0.03em] text-gray-900 mb-3">더 많은 마케팅 Agent를 찾아보세요</h2>
          <p className="text-muted text-base tracking-[-0.02em] mb-6">소상공인을 위한 다양한 AI Agent가 준비되어 있어요.</p>
          <Link href="/smb/agents">
            <button className="px-8 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 shadow-md text-sm min-h-[48px] inline-flex items-center justify-center">
              전체 Agent 보러가기 →
            </button>
          </Link>
        </div>
      </section>

      {/* 전문가 CTA */}
      <section className="py-16 px-5 md:px-10 bg-sand text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-medium tracking-[-0.03em] text-gray-900 mb-3">마케팅 전문가이신가요?</h2>
          <p className="text-muted text-base leading-relaxed tracking-[-0.02em] mb-6">
            당신의 노하우를 AI Agent로 만들어 소상공인에게 판매하세요.<br />
            수수료 0%로 시작할 수 있어요.
          </p>
          <Link href="/smb/register">
            <button className="px-8 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-700 text-sm min-h-[48px] inline-flex items-center justify-center">
              전문가로 등록하기 →
            </button>
          </Link>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 px-5 md:px-10 py-8 text-center">
        <span className="text-white font-extrabold">Agentora</span>
        <div className="mt-2">
          <Link href="/smb/register" className="text-white/70 text-sm hover:text-white transition-colors">
            전문가로 등록하기
          </Link>
        </div>
        <p className="text-white/70 text-base tracking-[-0.02em] mt-2">© 2026 Agentora. All rights reserved.</p>
      </footer>

    </main>
  );
}
