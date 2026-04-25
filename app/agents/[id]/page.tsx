"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { useAuth } from "../../providers";

const CATEGORY_EMOJI: Record<string, string> = {
  "데이터 분석": "📊", "고객 응대": "📞", "문서 자동화": "📝",
  "영업·마케팅": "💼", "법률·계약": "⚖️", "재무·회계": "💰",
  "제조·품질": "🏗️", "IT·개발": "🔧", "의료·헬스": "🏥", "교육·HR": "🎓",
};
function getEmoji(category: string) { return CATEGORY_EMOJI[category] || "🤖"; }

type Agent = {
  id: number;
  name: string;
  description: string;
  long_description: string;
  category: string;
  price: number;
  author_name: string;
  emoji: string;
  tags: string[];
  badge: string | null;
  rating: number;
  review_count: number;
  html_url: string | null;
};

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [trial, setTrial] = useState(3);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const { user } = useAuth();
  const supabase = createClient();

  // ✅ localStorage에서 체험 횟수 불러오기 (Agent별로 관리)
  const getTrialKey = (agentId: string) => `agentora_trial_${agentId}`;

  useEffect(() => {
    const fetchAgent = async () => {
      const { data, error } = await supabase.from("agents").select("*").eq("id", id).single();
      if (!error && data) {
        setAgent(data);

        // 저장된 체험 횟수 불러오기
        const savedTrial = localStorage.getItem(getTrialKey(id));
        const currentTrial = savedTrial !== null ? parseInt(savedTrial) : 3;
        setTrial(currentTrial);

        if (data.html_url) {
          // ✅ 체험 횟수가 남아있을 때만 HTML 로드
          if (currentTrial > 0) {
            try {
              const res = await fetch(data.html_url);
              const html = await res.text();
              setHtmlContent(html);
            } catch (e) {
              console.error("HTML 로드 실패:", e);
            }
          }
        } else {
          setMessages([{
            role: "assistant",
            content: `안녕하세요! 저는 ${data.name}입니다. 👋\n\n${data.description}\n\n궁금한 내용을 질문해주세요!`
          }]);
        }
      }
      setLoading(false);
    };
    fetchAgent();
  }, [id]);

  // ✅ iframe 로드 완료 시 체험 횟수 1회 차감
  const handleIframeLoad = () => {
    if (!iframeLoaded) {
      setIframeLoaded(true);
      const newTrial = Math.max(trial - 1, 0);
      setTrial(newTrial);
      localStorage.setItem(getTrialKey(id), newTrial.toString());
    }
  };

  const handleSend = async () => {
    if (!input.trim() || chatLoading || trial <= 0 || !agent) return;
    const userMsg = input.trim();
    setInput("");

    // 채팅형 Agent도 체험 횟수 차감 + localStorage 저장
    const newTrial = Math.max(trial - 1, 0);
    setTrial(newTrial);
    localStorage.setItem(getTrialKey(id), newTrial.toString());

    const newMessages = [...messages, { role: "user" as const, content: userMsg }];
    setMessages(newMessages);
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: `당신은 ${agent.name}입니다. ${agent.description} 한국어로 답변하세요.`,
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.content || "죄송합니다. 잠시 후 다시 시도해주세요."
      }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "오류가 발생했습니다. 다시 시도해주세요." }]);
    }
    setChatLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">⏳</div>
          <p className="text-gray-400 text-sm">불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">😢</div>
          <p className="text-gray-700 font-bold mb-2">Agent를 찾을 수 없어요</p>
          <Link href="/agents"><button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-full text-sm">목록으로</button></Link>
        </div>
      </div>
    );
  }

  const emoji = getEmoji(agent.category);

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 md:px-10 py-6 md:py-8">
          <div className="text-xs text-gray-400 mb-4">
            <Link href="/" className="hover:text-blue-600">홈</Link> ›{" "}
            <Link href="/agents" className="hover:text-blue-600">전체 Agent</Link> › {agent.name}
          </div>
          <div className="flex gap-4 md:gap-5 items-start">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl md:text-4xl flex-shrink-0 border border-gray-100">
              {emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 mb-2 flex-wrap">
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">{agent.category}</span>
                {agent.badge && <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">{agent.badge}</span>}
                <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">✅ 검증됨</span>
                {agent.html_url && <span className="bg-purple-50 text-purple-600 text-xs font-bold px-3 py-1 rounded-full">🚀 풀 기능</span>}
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2">{agent.name}</h1>
              <p className="text-sm text-gray-500 leading-relaxed">{agent.description}</p>
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                <span>by <strong>{agent.author_name}</strong></span>
                {agent.rating > 0 && <span className="text-yellow-500 font-bold">⭐ {agent.rating}</span>}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-extrabold text-gray-900">₩{agent.price?.toLocaleString()}</div>
              <div className="text-xs text-gray-400">/ 월</div>
              <div className="text-xs text-gray-400 mt-1">3회 무료 체험</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 md:px-10 py-6 md:py-8 flex flex-col md:flex-row gap-6">
        <div className="flex-1 min-w-0">
          {agent.html_url ? (
            <div className="bg-white rounded-2xl border-2 border-blue-500 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-orange-500 z-10"></div>
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <div>
                  <h2 className="text-base font-extrabold text-gray-900">🍽️ 지금 바로 맛보기</h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    남은 체험 횟수: <strong className={trial > 0 ? "text-orange-500" : "text-red-500"}>{trial}회</strong>
                  </p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${trial > 0 ? "bg-orange-50 text-orange-500" : "bg-red-50 text-red-500"}`}>
                  {trial > 0 ? "무료 체험" : "체험 종료"}
                </span>
              </div>

              {/* ✅ 체험 횟수가 남아있으면 iframe, 없으면 구독 유도 */}
              {trial > 0 || iframeLoaded ? (
                htmlContent ? (
                  <iframe
                    srcDoc={htmlContent}
                    className="w-full"
                    style={{ height: "700px", border: "none" }}
                    title={agent.name}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    onLoad={handleIframeLoad}
                  />
                ) : (
                  <div className="flex items-center justify-center h-40">
                    <p className="text-gray-400 text-sm">⏳ 로딩 중...</p>
                  </div>
                )
              ) : (
                // ✅ 체험 횟수 소진 시 구독 유도 화면
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <div className="text-5xl mb-4">🔒</div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2">무료 체험이 종료되었어요</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-sm">
                    {agent.name}의 모든 기능을 계속 사용하시려면<br />구독을 시작해보세요!
                  </p>
                  <Link href={user ? `/subscribe/${agent.id}` : "/login"}>
                    <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm">
                      구독하고 계속 사용하기
                    </button>
                  </Link>
                  <p className="text-xs text-gray-400 mt-4">🔒 입력 데이터는 저장되지 않습니다</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-blue-500 p-5 md:p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-orange-500"></div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-extrabold text-gray-900">🍽️ 지금 바로 맛보기</h2>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${trial > 0 ? "bg-orange-50 text-orange-500" : "bg-red-50 text-red-500"}`}>
                  {trial > 0 ? "무료 체험" : "체험 종료"}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                남은 체험 횟수: <strong className={trial > 0 ? "text-orange-500" : "text-red-500"}>{trial}회</strong>
              </p>

              <div className="bg-gray-50 rounded-xl border border-gray-100 h-72 md:h-80 overflow-y-auto p-4 flex flex-col gap-3 mb-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${msg.role === "user" ? "bg-blue-600 text-white text-xs font-bold" : "bg-blue-50"}`}>
                      {msg.role === "user" ? "나" : emoji}
                    </div>
                    <div className={`max-w-[75%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-line ${msg.role === "user" ? "bg-blue-600 text-white rounded-tr-sm" : "bg-white border border-gray-100 text-gray-700 rounded-tl-sm"}`}>
                      {msg.content.replace(/#{1,6}\s/g, '').replace(/\*\*/g, '').replace(/\*/g, '').replace(/---/g, '').replace(/^-\s/gm, '• ')}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-sm">{emoji}</div>
                    <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex gap-1.5 items-center rounded-tl-sm">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.3s]"></div>
                    </div>
                  </div>
                )}

                {/* ✅ 채팅형도 체험 종료 시 메시지 표시 */}
                {trial <= 0 && !chatLoading && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500 font-semibold mb-3">🔒 무료 체험이 종료되었어요</p>
                    <Link href={user ? `/subscribe/${agent.id}` : "/login"}>
                      <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-full text-xs hover:bg-blue-700 transition-all">
                        구독하고 계속 사용하기
                      </button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 rounded-xl px-4 py-2.5 mb-3">
                <p className="text-xs text-blue-600 font-semibold">📝 맛보기 체험은 텍스트 입력만 가능합니다.</p>
                <p className="text-xs text-gray-400 mt-0.5">파일 첨부를 원하시나요?{" "}
                  <Link href="/login" className="text-blue-500 font-semibold underline">구독을 시작해보세요!</Link>
                </p>
              </div>

              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={trial > 0 ? "질문을 입력하세요..." : "체험 횟수를 모두 사용했습니다."}
                  disabled={trial <= 0}
                  className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm outline-none focus:border-blue-500 disabled:bg-gray-100"
                />
                <button onClick={handleSend} disabled={chatLoading || trial <= 0}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-200 transition-all flex-shrink-0">
                  ➤
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-full md:w-72 flex-shrink-0 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-md">
            <div className="text-center mb-4">
              <div className="text-3xl font-extrabold text-gray-900">₩{agent.price?.toLocaleString()}</div>
              <div className="text-xs text-gray-400 mt-1">/ 월</div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              {agent.tags?.map((tag) => (
                <div key={tag} className="flex items-center gap-2 text-xs text-gray-700">
                  <span className="text-green-500 font-bold">✓</span> {tag}
                </div>
              ))}
            </div>
            <Link href={user ? `/subscribe/${agent.id}` : "/login"}>
              <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm mb-2">
                구독하기
              </button>
            </Link>
            <div className="text-center text-xs text-gray-400 mt-2">🔒 입력 데이터는 저장되지 않습니다</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">📋 Agent 정보</h3>
            {[
              ["카테고리", agent.category],
              ["제작자", agent.author_name],
              ["맛보기", `${trial}회 남음`],
              ["평점", agent.rating > 0 ? `⭐ ${agent.rating}` : "리뷰 없음"],
              ["타입", agent.html_url ? "🚀 풀 기능" : "💬 채팅형"],
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