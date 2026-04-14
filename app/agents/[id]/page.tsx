"use client";
import { useState } from "react";
import Link from "next/link";

const agents: Record<string, {
  emoji: string; bg: string; name: string; author: string; authorInitial: string;
  desc: string; longDesc: string; tags: string[]; rating: string; reviews: string;
  price: string; badge: string | null; badgeColor: string; cat: string;
}> = {
  "1": { emoji: "🤖", bg: "bg-blue-50", name: "계약서 리뷰 Agent", author: "김법률 변호사 · 법무법인 테크", authorInitial: "김", desc: "위험 조항·불리한 조건을 즉시 분석하고 수정안을 제안합니다. 평균 리뷰 시간 87% 단축.", longDesc: "계약서 리뷰 Agent는 10년 경력의 계약 전문 변호사가 설계한 AI Agent입니다. NDA, 서비스 계약, 공급 계약 등 다양한 계약서를 분석하여 위험 조항, 불리한 조건, 누락된 필수 항목을 자동으로 탐지합니다.", tags: ["법률", "계약서", "리스크"], rating: "4.9", reviews: "342", price: "89,000", badge: "HOT", badgeColor: "bg-orange-500", cat: "법률·계약" },
  "2": { emoji: "📈", bg: "bg-green-50", name: "매출 데이터 분석", author: "데이터랩 · 이분석", authorInitial: "이", desc: "ERP·엑셀 데이터를 연결하면 매출 트렌드, 이상치, 예측 리포트를 자동 생성합니다.", longDesc: "매출 데이터 분석 Agent는 ERP, 엑셀, CSV 등 다양한 형식의 데이터를 자동으로 분석합니다. 트렌드 분석, 이상치 감지, 미래 매출 예측까지 한번에 처리합니다.", tags: ["데이터", "매출", "예측"], rating: "4.8", reviews: "218", price: "120,000", badge: null, badgeColor: "", cat: "데이터 분석" },
  "3": { emoji: "💬", bg: "bg-orange-50", name: "고객 CS 자동화", author: "박서비스 · CS전문", authorInitial: "박", desc: "24시간 고객 문의 응대. 담당자 자동 에스컬레이션.", longDesc: "고객 CS 자동화 Agent는 FAQ 학습 후 24시간 고객 문의에 자동 응대합니다. 처리 불가 시 담당자에게 자동으로 에스컬레이션하여 고객 만족도를 높입니다.", tags: ["CS", "자동화", "챗봇"], rating: "4.7", reviews: "89", price: "65,000", badge: "NEW", badgeColor: "bg-green-500", cat: "고객 응대" },
  "4": { emoji: "📧", bg: "bg-purple-50", name: "영업 이메일 작성", author: "최마케팅 · 그로스팀", authorInitial: "최", desc: "업종별 맞춤 영업 이메일을 자동 초안 작성합니다.", longDesc: "고객 정보와 제품을 입력하면 업종별 맞춤 영업 이메일을 초안 작성·개인화합니다. A/B 테스트 버전도 자동 생성해드립니다.", tags: ["영업", "이메일", "개인화"], rating: "4.6", reviews: "176", price: "45,000", badge: "PICK", badgeColor: "bg-blue-600", cat: "영업·마케팅" },
  "5": { emoji: "🏭", bg: "bg-red-50", name: "품질 불량 예측", author: "정제조 · 스마트팩토리", authorInitial: "정", desc: "센서 데이터 실시간 분석, 불량 사전 감지.", longDesc: "센서 데이터를 실시간으로 분석해 불량 발생 가능성을 사전 감지하고 알림을 전송합니다. 제조 현장의 품질 관리 비용을 평균 40% 절감합니다.", tags: ["제조", "품질", "예측"], rating: "4.9", reviews: "134", price: "200,000", badge: "HOT", badgeColor: "bg-orange-500", cat: "제조·품질" },
  "6": { emoji: "💰", bg: "bg-emerald-50", name: "세금계산서 자동화", author: "한회계 · 택스솔루션", authorInitial: "한", desc: "세금계산서 분류·검토 후 회계 소프트웨어 자동 입력.", longDesc: "발행된 세금계산서를 자동으로 분류·검토하고 회계 소프트웨어에 자동 입력합니다. ERP 연동도 지원합니다.", tags: ["회계", "세무", "ERP"], rating: "4.7", reviews: "201", price: "75,000", badge: null, badgeColor: "", cat: "재무·회계" },
  "7": { emoji: "🔧", bg: "bg-sky-50", name: "코드 리뷰 자동화", author: "오개발 · 테크랩", authorInitial: "오", desc: "PR 생성 시 코드 품질·보안 취약점 자동 분석.", longDesc: "PR 생성 시 자동으로 코드 품질, 보안 취약점, 성능 이슈를 분석하고 리뷰 코멘트를 작성합니다. GitHub, GitLab 연동 지원.", tags: ["개발", "코드리뷰", "보안"], rating: "4.8", reviews: "267", price: "55,000", badge: "PICK", badgeColor: "bg-blue-600", cat: "IT·개발" },
  "8": { emoji: "📝", bg: "bg-yellow-50", name: "회의록 자동 정리", author: "류문서 · 워크플로우", authorInitial: "류", desc: "회의 음성·텍스트를 요약, 결정사항, 액션아이템으로 정리.", longDesc: "회의 음성 또는 텍스트를 입력하면 안건별 요약, 결정사항, 액션아이템을 자동 추출합니다. Slack, 이메일 자동 공유도 지원합니다.", tags: ["회의록", "요약", "자동화"], rating: "4.5", reviews: "143", price: "35,000", badge: null, badgeColor: "", cat: "문서 자동화" },
};

const sampleReplies: Record<string, string> = {
  "이 계약서의 불리한 조항을 찾아줘": "분석 결과 3개의 불리한 조항을 발견했습니다:\n\n⚠️ 제7조 손해배상 — 무제한 손해배상 의무\n⚠️ 제12조 해지 조건 — 귀사 60일, 상대방 30일 (불균형)\n⚠️ 제15조 지식재산권 — 협업 IP 전부 상대방 귀속\n\n수정 제안을 받으시겠어요?",
  "손해배상 조항이 적절한가요?": "⚠️ 문제 있음\n\n현재 조항은 무제한 손해배상을 규정하고 있어 귀사에 매우 불리합니다.\n\n수정 제안:\n'각 당사자의 손해배상 책임은 최근 12개월간 지급된 총 계약금액을 한도로 한다.'",
  "계약 해지 조건을 요약해줘": "계약 해지 조건 요약:\n\n✅ 계약 기간: 1년 (자동 갱신)\n✅ 상대방 해지 통보: 30일 전\n⚠️ 귀사 해지 통보: 60일 전 (불균형)\n⚠️ 위약금: 잔여 계약금의 20% (귀사만 적용)\n\n해지 조건이 불균형합니다. 수정을 권장드립니다.",
};

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  const agent = agents[params.id] || agents["1"];
  const [messages, setMessages] = useState([
    { role: "agent", text: `안녕하세요! ${agent.name}입니다. 👋\n\n궁금한 내용을 질문해주세요. 맛보기 체험으로 직접 경험해보세요!` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [trial, setTrial] = useState(3);
  const [plan, setPlan] = useState<"basic" | "pro" | "enterprise">("basic");

  const planInfo = {
    basic: { price: `₩${agent.price}`, period: "/ 월", features: ["월 50건 분석", "핵심 기능 제공", "PDF/DOCX 업로드", "이메일 지원"] },
    pro: { price: "₩180,000", period: "/ 월", features: ["월 200건 분석", "모든 기능 제공", "PDF/DOCX 업로드", "Slack 연동", "우선 지원"] },
    enterprise: { price: "별도 문의", period: "", features: ["무제한 분석", "모든 기능 제공", "커스텀 연동", "API 접근", "전담 매니저"] },
  };

  const handleSend = () => {
    if (!input.trim() || loading || trial <= 0) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
    setTrial((t) => t - 1);

    setTimeout(() => {
      const reply = sampleReplies[userMsg] || `"${userMsg.slice(0, 20)}..."에 대해 분석했습니다.\n\n더 정확한 분석을 위해 구체적인 내용을 입력해주세요.`;
      setMessages((prev) => [...prev, { role: "agent", text: reply }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-sm">🤖</div>
          <span className="text-xl font-extrabold text-gray-900">Agentora</span>
        </Link>
        <div className="flex gap-3">
          <Link href="/login"><button className="px-5 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all">로그인</button></Link>
          <Link href="/login"><button className="px-5 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md">무료 시작</button></Link>
        </div>
      </nav>

      {/* 히어로 */}
      <div className="pt-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-10 py-8">
          <div className="text-xs text-gray-400 mb-4">
            <Link href="/" className="hover:text-blue-600">홈</Link> ›{" "}
            <Link href="/agents" className="hover:text-blue-600">전체 Agent</Link> › {agent.name}
          </div>
          <div className="flex gap-5 items-start">
            <div className={`w-20 h-20 rounded-2xl ${agent.bg} flex items-center justify-center text-4xl flex-shrink-0 border border-gray-100`}>
              {agent.emoji}
            </div>
            <div className="flex-1">
              <div className="flex gap-2 mb-2 flex-wrap">
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">{agent.cat}</span>
                {agent.badge && <span className={`${agent.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>{agent.badge}</span>}
                <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">✅ 전문가 인증</span>
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-2">{agent.name}</h1>
              <p className="text-sm text-gray-500 mb-3 leading-relaxed">{agent.desc}</p>
              <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">{agent.authorInitial}</div>
                  <span>by <strong>{agent.author}</strong></span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-yellow-500 font-bold">⭐ {agent.rating}</span>
                <span className="text-gray-400">({agent.reviews}개 리뷰)</span>
                <span className="text-gray-300">|</span>
                <span className="text-green-500 font-bold">● 4,800+ 기업 사용 중</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-extrabold text-gray-900">₩{agent.price}</div>
              <div className="text-xs text-gray-400">/ 월</div>
              <div className="text-xs text-gray-400 mt-1">3회 무료 체험 가능</div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 */}
      <div className="max-w-5xl mx-auto px-10 py-8 flex gap-6">
        {/* 왼쪽 */}
        <div className="flex-1 min-w-0">

          {/* 맛보기 */}
          <div className="bg-white rounded-2xl border-2 border-blue-500 p-6 mb-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-orange-500"></div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">🍽️ 지금 바로 맛보기</h2>
              <span className="bg-orange-50 text-orange-500 text-xs font-bold px-3 py-1 rounded-full">무료 체험</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              남은 체험 횟수: <strong className="text-orange-500">{trial}회</strong> · 구매 시 무제한 사용 가능
            </p>

            {/* 예시 칩 */}
            <div className="flex gap-2 flex-wrap mb-3">
              {Object.keys(sampleReplies).map((q) => (
                <button key={q} onClick={() => setInput(q)} className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full font-semibold hover:bg-blue-100 transition-all border border-transparent hover:border-blue-300">
                  {q}
                </button>
              ))}
            </div>

            {/* 채팅창 */}
            <div className="bg-gray-50 rounded-xl border border-gray-100 h-64 overflow-y-auto p-4 flex flex-col gap-3 mb-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${msg.role === "agent" ? "bg-blue-50" : "bg-blue-600 text-white text-xs font-bold"}`}>
                    {msg.role === "agent" ? agent.emoji : "나"}
                  </div>
                  <div className={`max-w-[75%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-line ${msg.role === "agent" ? "bg-white border border-gray-100 text-gray-700 rounded-tl-sm" : "bg-blue-600 text-white rounded-tr-sm"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-sm">{agent.emoji}</div>
                  <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex gap-1.5 items-center rounded-tl-sm">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.3s]"></div>
                  </div>
                </div>
              )}
            </div>

            {/* 입력 */}
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={trial > 0 ? "질문을 입력하세요..." : "체험 횟수를 모두 사용했습니다. 구매 후 이용하세요!"}
                disabled={trial <= 0}
                className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
              />
              <button
                onClick={handleSend}
                disabled={loading || trial <= 0}
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-200 transition-all"
              >
                ➤
              </button>
            </div>
          </div>

          {/* 소개 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-5">
            <h2 className="text-base font-extrabold text-gray-900 mb-4">📌 Agent 소개</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{agent.longDesc}</p>
            <div className="flex flex-col gap-2.5">
              {[
                { icon: "⚠️", title: "위험 요소 자동 탐지", desc: "87가지 위험 패턴을 실시간으로 분석합니다." },
                { icon: "✏️", title: "즉시 수정 제안", desc: "발견된 문제에 대해 법적으로 균형 잡힌 대체 문구를 제안합니다." },
                { icon: "📋", title: "핵심 조항 요약", desc: "계약 기간, 대금, 해지 조건 등 핵심 정보를 구조화하여 제공합니다." },
                { icon: "🌐", title: "한·영 지원", desc: "국문·영문 계약서 모두 분석 가능합니다." },
              ].map((f) => (
                <div key={f.title} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-lg flex-shrink-0">{f.icon}</span>
                  <div>
                    <div className="text-sm font-bold text-gray-900 mb-0.5">{f.title}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 리뷰 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-base font-extrabold text-gray-900 mb-4">⭐ 사용자 리뷰</h2>
            <div className="flex gap-5 items-center bg-blue-50 rounded-xl p-4 mb-5">
              <div className="text-center flex-shrink-0">
                <div className="text-4xl font-extrabold text-gray-900">{agent.rating}</div>
                <div className="text-yellow-400 text-lg mt-1">★★★★★</div>
                <div className="text-xs text-gray-400 mt-1">{agent.reviews}개</div>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                {[["5★", "82%"], ["4★", "12%"], ["3★", "4%"], ["2★", "1%"], ["1★", "1%"]].map(([star, pct]) => (
                  <div key={star} className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="w-5 text-right">{star}</span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: pct }}></div>
                    </div>
                    <span className="w-6">{pct}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { initial: "이", name: "이**팀장 · (주)커머스원", date: "2026.03.12", text: "공급사 계약서 검토에 쓰고 있는데 시간이 정말 많이 절약됩니다. 이전엔 법무팀에 보내고 2~3일 기다렸는데 이제 30분 안에 결과가 나와요.", tags: ["시간 절약", "정확도 높음"] },
                { initial: "박", name: "박**대표 · 스타트업", date: "2026.02.28", text: "법무 인력이 없었는데 이 Agent 덕분에 투자계약서, 파트너십 계약 다 혼자 검토하고 있습니다. 영문 계약서도 잘 됩니다.", tags: ["스타트업 추천", "영문 지원"] },
              ].map((r) => (
                <div key={r.name} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">{r.initial}</div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">{r.name}</div>
                      <div className="text-[10px] text-gray-400">{r.date}</div>
                    </div>
                    <div className="ml-auto text-yellow-400 text-xs">★★★★★</div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">{r.text}</p>
                  <div className="flex gap-1.5">
                    {r.tags.map((t) => <span key={t} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="w-72 flex-shrink-0">

          {/* 구매 카드 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4 shadow-md sticky top-20">
            <div className="flex gap-1.5 mb-4">
              {(["basic", "pro", "enterprise"] as const).map((p) => (
                <button key={p} onClick={() => setPlan(p)} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${plan === p ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-500 hover:border-blue-300"}`}>
                  {p === "basic" ? "베이직" : p === "pro" ? "프로" : "기업"}
                </button>
              ))}
            </div>
            <div className="text-center mb-4">
              <div className="text-3xl font-extrabold text-gray-900">{planInfo[plan].price}</div>
              <div className="text-xs text-gray-400 mt-1">{planInfo[plan].period} · 부가세 별도</div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              {planInfo[plan].features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs text-gray-700">
                  <span className="text-green-500 font-bold">✓</span> {f}
                </div>
              ))}
            </div>
            <Link href="/login">
              <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md mb-2 text-sm">
                지금 구매하기
              </button>
            </Link>
            <button
              onClick={() => document.querySelector("input")?.focus()}
              className="w-full py-2.5 border border-blue-500 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all text-sm"
            >
              무료로 맛보기 ({trial}회)
            </button>
            <div className="text-center text-xs text-gray-400 mt-3">🔒 14일 환불 보장 · 언제든 취소 가능</div>
          </div>

          {/* 전문가 카드 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">👤 전문가 소개</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">{agent.authorInitial}</div>
              <div>
                <div className="text-sm font-bold text-gray-900">{agent.author.split(" · ")[0]}</div>
                <div className="text-xs text-gray-400">{agent.author.split(" · ")[1] || ""}</div>
              </div>
            </div>
            <div className="flex gap-3 text-center">
              {[["10년", "경력"], ["8개", "등록 Agent"], [`${agent.rating}★`, "평균 평점"]].map(([n, l]) => (
                <div key={l} className="flex-1">
                  <div className="text-sm font-extrabold text-gray-900">{n}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 정보 카드 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            {[["최근 업데이트", "2026.04.01"], ["지원 형식", "PDF, DOCX, TXT"], ["언어", "한국어, 영어"], ["평균 응답", "약 30초"], ["도입 기업", "4,800+"]].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-gray-50 last:border-0 text-xs">
                <span className="text-gray-400">{label}</span>
                <span className="font-semibold text-gray-700">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}