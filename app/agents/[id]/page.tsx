"use client";
import { useState } from "react";
import Link from "next/link";

export default function AgentDetailPage() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "안녕하세요! 저는 계약서 리뷰 Agent입니다. 👋\n\n계약서 내용을 붙여넣거나 질문해주세요. 위험 조항 분석, 수정 제안 등을 도와드립니다!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [trial, setTrial] = useState(3);

  const handleSend = async () => {
    if (!input.trim() || loading || trial <= 0) return;
    const userMsg = input.trim();
    setInput("");
    setTrial((t) => t - 1);

    const newMessages = [...messages, { role: "user" as const, content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: "당신은 10년 경력의 계약 전문 변호사입니다. 사용자가 계약서 내용이나 법률 관련 질문을 하면 전문적으로 분석하고 위험 조항, 불리한 조건, 수정 제안을 명확하게 제공하세요. 답변은 한국어로 하고, 구체적이고 실용적인 조언을 제공하세요. 위험한 조항은 ⚠️로, 양호한 조항은 ✅로 표시하세요.",
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.content || "죄송합니다. 잠시 후 다시 시도해주세요."
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "오류가 발생했습니다. 다시 시도해주세요."
      }]);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-sm">🤖</div>
          <span className="text-xl font-extrabold text-gray-900">Agentora</span>
        </Link>
        <div className="flex gap-3">
          <Link href="/login"><button className="px-4 md:px-5 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all">로그인</button></Link>
          <Link href="/login"><button className="px-4 md:px-5 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md">무료 시작</button></Link>
        </div>
      </nav>

      <div className="pt-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 md:px-10 py-6 md:py-8">
          <div className="text-xs text-gray-400 mb-4">
            <Link href="/" className="hover:text-blue-600">홈</Link> ›{" "}
            <Link href="/agents" className="hover:text-blue-600">전체 Agent</Link> › 계약서 리뷰 Agent
          </div>
          <div className="flex gap-4 md:gap-5 items-start">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl md:text-4xl flex-shrink-0 border border-gray-100">🤖</div>
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 mb-2 flex-wrap">
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">⚖️ 법률·계약</span>
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">🔥 데모</span>
                <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">✅ 전문가 인증</span>
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2">계약서 리뷰 Agent</h1>
              <p className="text-sm text-gray-500 leading-relaxed">계약서를 붙여넣으면 위험 조항, 불리한 조건을 즉시 분석하고 수정 제안까지 제공합니다.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 md:px-10 py-6 md:py-8 flex flex-col md:flex-row gap-6">

        {/* 채팅 */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border-2 border-blue-500 p-5 md:p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-orange-500"></div>

            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-extrabold text-gray-900">🍽️ 지금 바로 맛보기</h2>
              <span className="bg-orange-50 text-orange-500 text-xs font-bold px-3 py-1 rounded-full">무료 체험</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              남은 체험 횟수: <strong className="text-orange-500">{trial}회</strong> · 구매 시 무제한 사용 가능
            </p>

            {/* 예시 질문 */}
            <div className="flex gap-2 flex-wrap mb-3">
              {["이 계약서의 불리한 조항을 찾아줘", "손해배상 조항이 적절한가요?", "계약 해지 조건을 요약해줘"].map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full font-semibold hover:bg-blue-100 transition-all border border-transparent hover:border-blue-300"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* 채팅창 */}
            <div className="bg-gray-50 rounded-xl border border-gray-100 h-72 md:h-80 overflow-y-auto p-4 flex flex-col gap-3 mb-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${msg.role === "agent" ? "bg-blue-50" : msg.role === "assistant" ? "bg-blue-50" : "bg-blue-600 text-white text-xs font-bold"}`}>
                    {msg.role === "user" ? "나" : "🤖"}
                  </div>
                  <div className={`max-w-[75%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-line ${msg.role === "user" ? "bg-blue-600 text-white rounded-tr-sm" : "bg-white border border-gray-100 text-gray-700 rounded-tl-sm"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-sm">🤖</div>
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
                placeholder={trial > 0 ? "질문을 입력하세요..." : "체험 횟수를 모두 사용했습니다."}
                disabled={trial <= 0}
                className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
              />
              <button
                onClick={handleSend}
                disabled={loading || trial <= 0}
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-200 transition-all flex-shrink-0"
              >
                ➤
              </button>
            </div>
          </div>
        </div>

        {/* 사이드 정보 */}
        <div className="w-full md:w-72 flex-shrink-0 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-md">
            <div className="text-center mb-4">
              <div className="text-xs text-gray-400 mb-1">데모 체험 중</div>
              <div className="text-3xl font-extrabold text-gray-900">무료</div>
              <div className="text-xs text-gray-400 mt-1">실제 서비스 오픈 시 유료 전환</div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              {["계약서 위험 조항 분석", "수정 제안 제공", "법률 용어 설명", "한·영 계약서 지원"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs text-gray-700">
                  <span className="text-green-500 font-bold">✓</span> {f}
                </div>
              ))}
            </div>
            <Link href="/login">
              <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm mb-2">
                무료로 시작하기
              </button>
            </Link>
            <Link href="/register">
              <button className="w-full py-2.5 border border-blue-500 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all text-sm">
                전문가로 등록하기
              </button>
            </Link>
            <div className="text-center text-xs text-gray-400 mt-3">🔒 데모 데이터는 저장되지 않습니다</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">📋 Agent 정보</h3>
            {[
              ["카테고리", "법률·계약"],
              ["언어", "한국어, 영어"],
              ["평균 응답", "약 5초"],
              ["데모 체험", "3회 무료"],
            ].map(([label, value]) => (
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