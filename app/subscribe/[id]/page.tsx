"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { useAuth } from "../../providers";
import { useRouter } from "next/navigation";

type Agent = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  author_name: string;
  emoji: string;
  tags: string[];
};

export default function SubscribePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "pro">("basic");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    const fetchAgent = async () => {
      const { data, error } = await supabase.from("agents").select("*").eq("id", id).single();
      if (!error && data) setAgent(data);
      setLoading(false);
    };
    fetchAgent();
  }, [id, user]);

  const handleSubscribe = async () => {
    if (!user || !agent) return;
    setSubmitting(true);

    try {
      const { error } = await supabase.from("subscriptions").insert({
        user_id: user.id,
        agent_id: agent.id,
        plan: selectedPlan,
        status: "pending",
        price: selectedPlan === "basic" ? agent.price : agent.price * 2,
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
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

  if (success) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-5">
        <div className="bg-white rounded-2xl p-10 shadow-xl max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">구독 신청 완료!</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-2">
            <strong>{agent?.name}</strong> 구독 신청이 완료됐어요.
          </p>
          <p className="text-gray-400 text-xs leading-relaxed mb-8">
            결제 시스템 연동 후 바로 이용 가능해요.<br />
            빠른 시일 내에 안내 드릴게요! 😊
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/mypage">
              <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all text-sm">
                마이페이지에서 확인하기
              </button>
            </Link>
            <Link href="/agents">
              <button className="w-full py-3 border border-gray-200 text-gray-600 font-bold rounded-full hover:border-blue-400 hover:text-blue-600 transition-all text-sm">
                다른 Agent 탐색하기
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-sm">🤖</div>
          <span className="text-xl font-extrabold text-gray-900">Agentora</span>
        </Link>
        {user && (
          <Link href="/mypage">
            <button className="px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all">마이페이지</button>
          </Link>
        )}
      </nav>

      <div className="pt-24 pb-16 px-5 md:px-10 max-w-2xl mx-auto">
        {/* Agent 정보 */}
        {agent && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 flex gap-4 items-center">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0">
              {agent.emoji}
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-gray-900">{agent.name}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{agent.description}</p>
              <p className="text-xs text-gray-400 mt-1">by {agent.author_name}</p>
            </div>
          </div>
        )}

        {/* 플랜 선택 */}
        <h2 className="text-base font-extrabold text-gray-900 mb-4">💳 플랜 선택</h2>
        <div className="flex flex-col gap-3 mb-8">
          {/* 베이직 플랜 */}
          <div
            onClick={() => setSelectedPlan("basic")}
            className={`bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all ${selectedPlan === "basic" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === "basic" ? "border-blue-500" : "border-gray-300"}`}>
                  {selectedPlan === "basic" && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                </div>
                <span className="text-sm font-extrabold text-gray-900">베이직 플랜</span>
              </div>
              <span className="text-lg font-extrabold text-blue-600">₩{agent?.price?.toLocaleString()}<span className="text-xs font-normal text-gray-400">/월</span></span>
            </div>
            <div className="flex flex-col gap-1.5 ml-7">
              {agent?.tags?.map((tag) => (
                <div key={tag} className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="text-green-500">✓</span> {tag}
                </div>
              ))}
            </div>
          </div>

          {/* 프로 플랜 */}
          <div
            onClick={() => setSelectedPlan("pro")}
            className={`bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all ${selectedPlan === "pro" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === "pro" ? "border-orange-500" : "border-gray-300"}`}>
                  {selectedPlan === "pro" && <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>}
                </div>
                <span className="text-sm font-extrabold text-gray-900">프로 플랜</span>
                <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold">인기</span>
              </div>
              <span className="text-lg font-extrabold text-orange-500">₩{(agent?.price ? agent.price * 2 : 0).toLocaleString()}<span className="text-xs font-normal text-gray-400">/월</span></span>
            </div>
            <div className="flex flex-col gap-1.5 ml-7">
              {agent?.tags?.map((tag) => (
                <div key={tag} className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="text-green-500">✓</span> {tag}
                </div>
              ))}
              <div className="flex items-center gap-2 text-xs text-orange-600 font-semibold">
                <span className="text-orange-500">✓</span> 파일 첨부 무제한
              </div>
              <div className="flex items-center gap-2 text-xs text-orange-600 font-semibold">
                <span className="text-orange-500">✓</span> 우선 응답 지원
              </div>
            </div>
          </div>
        </div>

        {/* 안내 */}
        <div className="bg-blue-50 rounded-xl px-4 py-3 mb-6">
          <p className="text-xs text-blue-600 font-semibold">🔔 결제 시스템 준비 중이에요!</p>
          <p className="text-xs text-gray-500 mt-0.5">지금 신청하시면 결제 연동 후 가장 먼저 안내드릴게요.</p>
        </div>

        {/* 구독 버튼 */}
        <button
          onClick={handleSubscribe}
          disabled={submitting}
          className="w-full py-4 bg-blue-600 text-white font-extrabold rounded-full hover:bg-blue-700 transition-all shadow-lg text-base disabled:opacity-50"
        >
          {submitting ? "처리 중..." : `${selectedPlan === "basic" ? "베이직" : "프로"} 플랜 구독 신청하기 🎉`}
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          구독 신청은 무료이며, 결제 연동 후 과금됩니다.
        </p>
      </div>
    </main>
  );
}
