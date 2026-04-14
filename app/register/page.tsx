"use client";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-sm">🤖</div>
          <span className="text-xl font-extrabold text-gray-900">Agentora</span>
        </Link>
        <button className="px-4 py-2 text-sm font-semibold border border-gray-200 rounded-full text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all">
          임시저장
        </button>
      </nav>

      {/* 헤더 */}
      <div className="pt-16 bg-gradient-to-br from-gray-900 to-blue-900 px-10 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-extrabold text-white mb-2">🧑‍💼 전문가 Agent 등록</h1>
          <p className="text-sm text-gray-400 mb-6">전문 지식을 AI Agent로 패키징하고 수천 개 기업에 공급하세요.</p>
          {/* 진행바 */}
          <div className="w-full bg-white/10 rounded-full h-1.5 mb-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-orange-400 transition-all duration-500"
              style={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
            ></div>
          </div>
          <div className="flex justify-between text-xs font-semibold">
            <span className={step >= 1 ? "text-white" : "text-gray-500"}>① 기본 정보</span>
            <span className={step >= 2 ? "text-white" : "text-gray-500"}>② Agent 설정</span>
            <span className={step >= 3 ? "text-white" : "text-gray-500"}>③ 가격·공개</span>
          </div>
        </div>
      </div>

      {/* 폼 영역 */}
      <div className="max-w-3xl mx-auto px-10 py-8">

        {/* STEP 1 */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-1">👤 전문가 프로필</h2>
              <p className="text-xs text-gray-400 mb-5">구매자가 신뢰할 수 있는 전문가 정보를 입력해주세요.</p>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">이름 <span className="text-orange-500">*</span></label>
                    <input type="text" placeholder="홍길동" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">직함·자격 <span className="text-orange-500">*</span></label>
                    <input type="text" placeholder="예: 변호사, 데이터 사이언티스트" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">소속 기관</label>
                    <input type="text" placeholder="(주)테크컴퍼니" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">경력 연수 <span className="text-orange-500">*</span></label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50">
                      <option>선택해주세요</option>
                      <option>1~3년</option>
                      <option>4~7년</option>
                      <option>8~15년</option>
                      <option>15년 이상</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">이메일 <span className="text-orange-500">*</span></label>
                  <input type="email" placeholder="expert@example.com" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">한 줄 소개 <span className="text-orange-500">*</span></label>
                  <input type="text" placeholder="예: 10년 경력의 계약 전문 변호사입니다" maxLength={60} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">상세 소개 <span className="text-orange-500">*</span></label>
                  <textarea rows={4} placeholder="전문 분야, 주요 경력, Agent 개발 배경 등을 작성해주세요." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50 resize-none"></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-1">🏷️ 전문 분야</h2>
              <p className="text-xs text-gray-400 mb-4">최대 3개 선택해주세요.</p>
              <div className="flex flex-wrap gap-2">
                {["📊 데이터 분석", "📞 고객 응대", "📝 문서 자동화", "💼 영업·마케팅", "⚖️ 법률·계약", "💰 재무·회계", "🏗️ 제조·품질", "🔧 IT·개발", "🏥 의료·헬스", "🎓 교육·HR"].map((cat) => (
                  <button key={cat} className="px-4 py-2 rounded-full border border-gray-200 text-xs font-semibold text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={() => setStep(2)} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm">
                다음 단계 →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-1">🤖 Agent 기본 정보</h2>
              <p className="text-xs text-gray-400 mb-5">구매자가 첫눈에 이해할 수 있도록 명확하게 작성해주세요.</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Agent 이름 <span className="text-orange-500">*</span></label>
                  <input type="text" placeholder="예: 계약서 리뷰 Agent" maxLength={40} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">한 줄 설명 <span className="text-orange-500">*</span></label>
                  <input type="text" placeholder="예: 계약서를 업로드하면 위험 조항을 즉시 분석합니다" maxLength={80} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">상세 설명 <span className="text-orange-500">*</span></label>
                  <textarea rows={5} placeholder="Agent가 어떤 문제를 해결하는지, 어떻게 작동하는지 작성해주세요." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50 resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">시스템 프롬프트 <span className="text-orange-500">*</span></label>
                  <textarea rows={5} placeholder="당신은 10년 경력의 계약 전문 변호사입니다..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50 resize-none font-mono"></textarea>
                  <p className="text-xs text-gray-400 mt-1">구매자에게는 보이지 않습니다.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">맛보기 예시 질문 <span className="text-orange-500">*</span></label>
                  <input type="text" placeholder="예: 이 계약서의 불리한 조항을 찾아줘" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="px-8 py-3 border border-gray-200 text-gray-600 font-bold rounded-full hover:border-blue-400 hover:text-blue-600 transition-all text-sm">
                ← 이전
              </button>
              <button onClick={() => setStep(3)} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm">
                다음 단계 →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-1">💰 가격 설정</h2>
              <p className="text-xs text-gray-400 mb-5">구매자가 선택할 플랜을 구성해주세요.</p>
              <div className="flex gap-3 mb-5">
                {["📅 월 구독", "📊 사용량 과금", "🔀 혼합형"].map((p) => (
                  <label key={p} className="flex-1 flex flex-col items-center gap-1 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 transition-all text-xs font-bold text-gray-600">
                    <input type="radio" name="pricing" className="hidden" />
                    {p}
                  </label>
                ))}
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">베이직 플랜 (월) <span className="text-orange-500">*</span></label>
                  <input type="number" placeholder="예: 89000" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">프로 플랜 (월)</label>
                  <input type="number" placeholder="예: 180000" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">맛보기 체험 설정 <span className="text-orange-500">*</span></label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50">
                  <option>3회 무료 체험</option>
                  <option>5회 무료 체험</option>
                  <option>7일 무료 체험</option>
                  <option>14일 무료 체험</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-4">🌐 공개 설정</h2>
              <div className="flex flex-col gap-3">
                {[
                  { label: "🔍 검색 노출", desc: "Agentora 검색 결과에 노출됩니다" },
                  { label: "✅ 즉시 공개", desc: "검토 완료 즉시 마켓에 공개 (1~3일 소요)" },
                  { label: "💼 B2B 전용", desc: "기업 회원에게만 노출됩니다" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{item.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                    </div>
                    <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer flex-shrink-0">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 체크리스트 */}
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl border border-blue-100 p-5">
              <h3 className="text-sm font-extrabold text-gray-900 mb-3">📋 등록 전 체크리스트</h3>
              {["전문가 프로필을 완성했나요?", "시스템 프롬프트를 입력했나요?", "맛보기 예시를 준비했나요?", "가격을 설정했나요?"].map((item, i) => (
                <div key={item} className="flex items-center gap-2 text-sm mb-2">
                  <span>{i < 3 ? "✅" : "⬜"}</span> {item}
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="px-8 py-3 border border-gray-200 text-gray-600 font-bold rounded-full hover:border-blue-400 hover:text-blue-600 transition-all text-sm">
                ← 이전
              </button>
              <Link href="/">
                <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm">
                  등록 신청하기 🎉
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}