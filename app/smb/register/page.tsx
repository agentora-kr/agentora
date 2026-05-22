"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function SMBRegisterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [htmlUrl, setHtmlUrl] = useState("");
  const [htmlFile, setHtmlFile] = useState<File | null>(null);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [isAlreadyExpert, setIsAlreadyExpert] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const supabase = createClient();

  const [form, setForm] = useState({
    name: "", title: "", company: "", email: "", experience: "",
    intro: "", description: "",
    agentName: "", agentDesc: "", agentLongDesc: "",
    sampleQuestion: "", basicPrice: "", proPrice: "", trialCount: "3",
  });

  useEffect(() => {
    const checkExpert = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setPageLoading(false); return; }

        setCurrentUserId(user.id);

        const { data: expert } = await supabase
          .from("experts")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (expert) {
          setIsAlreadyExpert(true);
          setForm(prev => ({
            ...prev,
            name: expert.name || "", title: expert.title || "",
            company: expert.company || "", email: expert.email || "",
            experience: expert.experience || "", intro: expert.intro || "",
            description: expert.description || "",
          }));
          setStep(2);
        }
      } catch (err) { console.error(err); }
      setPageLoading(false);
    };
    checkExpert();
  }, []);

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const extractSystemPrompt = (html: string): string => {
    const patterns = [
      /const\s+systemPrompt\s*=\s*`([\s\S]+?)`(?=\s*;|\s*\n)/,
      /const\s+systemPrompt\s*=\s*["']([\s\S]+?)["'](?=\s*;|\s*\n)/,
      /system\s*:\s*`([\s\S]+?)`(?=\s*,|\s*\n)/,
      /system\s*:\s*["']([\s\S]+?)["'](?=\s*,|\s*\n)/,
      /systemPrompt\s*=\s*`([\s\S]+?)`/,
    ];
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match?.[1]?.trim().length && match[1].trim().length > 30) return match[1].trim();
    }
    return "";
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setHtmlFile(file);
    setError("");
    setUploadStatus("uploading");

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const content = ev.target?.result as string;
      setSystemPrompt(extractSystemPrompt(content));
      const titleMatch = content.match(/<title>(.*?)<\/title>/i);
      if (titleMatch?.[1] && !form.agentName) {
        update("agentName", titleMatch[1].replace(/agentora|agent|–|-/gi, "").trim());
      }
      try {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("agentId", Date.now().toString());
        const res = await fetch("/api/upload-agent", { method: "POST", body: uploadFormData });
        const data = await res.json();
        if (data.url) { setHtmlUrl(data.url); setUploadStatus("done"); }
        else { setUploadStatus("error"); setError("파일 업로드에 실패했어요. 다시 시도해주세요."); }
      } catch { setUploadStatus("error"); setError("파일 업로드 중 오류가 발생했어요."); }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    if (!form.name || !form.email || !form.title) {
      setError("이름, 이메일, 직함은 필수입니다."); setLoading(false); return;
    }
    if (!form.agentName || !form.agentDesc) {
      setError("Agent 이름과 한 줄 설명은 필수입니다."); setLoading(false); return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("로그인이 필요합니다. 먼저 로그인 후 다시 시도해주세요.");
        setLoading(false);
        return;
      }

      const { data: existingExpert } = await supabase
        .from("experts").select("id").eq("user_id", user.id).maybeSingle();

      if (!existingExpert) {
        const { error: expertError } = await supabase.from("experts").insert({
          user_id: user.id,
          name: form.name,
          title: form.title,
          company: form.company,
          email: form.email,
          experience: form.experience,
          intro: form.intro,
          description: form.description,
          categories: ["소상공인 마케팅"],
          status: "pending",
        });

        if (expertError) {
          console.error("전문가 등록 에러:", expertError);
          if (!expertError.message.includes("duplicate") && !expertError.message.includes("violates")) {
            setError("전문가 등록에 실패했어요. 잠시 후 다시 시도해주세요.");
            setLoading(false);
            return;
          }
        } else {
          await supabase.from("profiles").update({ role: "expert" }).eq("id", user.id);
        }
      }

      const { error: agentError } = await supabase.from("agents").insert({
        name: form.agentName,
        description: form.agentDesc,
        long_description: form.agentLongDesc,
        system_prompt: systemPrompt,
        sample_question: form.sampleQuestion,
        html_url: htmlUrl || null,
        category: "소상공인 마케팅",
        price: parseInt(form.basicPrice) || 0,
        author_name: form.name,
        expert_email: form.email,
        user_id: user.id,
        emoji: "🏪",
        tags: ["소상공인 마케팅"],
        status: "pending",
      });

      if (agentError) {
        console.error("Agent 등록 에러:", agentError);
        setError("Agent 등록에 실패했어요. 입력 내용을 확인하고 다시 시도해주세요.");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err) {
      console.error("등록 에러:", err);
      setError("일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
    }
    setLoading(false);
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center"><div className="text-4xl mb-3">⏳</div><p className="text-gray-400 text-sm">불러오는 중...</p></div>
      </div>
    );
  }

  if (!currentUserId && !pageLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-5">
        <div className="bg-white rounded-2xl p-10 shadow-xl max-w-md w-full text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-3">로그인이 필요해요</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">Agent를 등록하려면 먼저 로그인해주세요.</p>
          <Link href="/login">
            <button className="w-full py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all text-sm">
              로그인하러 가기
            </button>
          </Link>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-5">
        <div className="bg-white rounded-2xl p-10 shadow-xl max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
            {isAlreadyExpert ? "Agent 등록 완료!" : "등록 신청 완료!"}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            {isAlreadyExpert
              ? "소상공인 마케팅 Agent 등록이 완료됐어요.\n관리자 승인 후 전용관에 공개됩니다!"
              : "전문가 등록 신청이 완료됐어요.\n검토 후 1~3일 내로 이메일로 안내드릴게요!"}
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/smb">
              <button className="w-full py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all text-sm">
                소상공인 전용관으로 가기
              </button>
            </Link>
            <Link href="/">
              <button className="w-full py-3 border border-gray-200 text-gray-600 font-bold rounded-full hover:bg-gray-50 transition-all text-sm">
                홈으로 돌아가기
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="pt-16 bg-gradient-to-br from-orange-600 to-amber-500 px-5 md:px-10 py-8 md:py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-xl md:text-2xl font-extrabold text-white mb-2">
            {isAlreadyExpert ? "🏪 소상공인 Agent 추가 등록" : "🏪 소상공인 마케팅 Agent 등록"}
          </h1>
          <p className="text-sm text-orange-100 mb-5">
            {isAlreadyExpert
              ? "소상공인을 위한 새 마케팅 Agent를 등록하세요."
              : "마케팅 노하우를 AI Agent로 만들어 소상공인에게 판매하세요."}
          </p>
          <div className="w-full bg-white/20 rounded-full h-1.5 mb-3">
            <div className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }} />
          </div>
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-white">{isAlreadyExpert ? "✅ 기본 정보" : "① 기본 정보"}</span>
            <span className={step >= 2 ? "text-white" : "text-orange-200"}>② Agent 설정</span>
            <span className={step >= 3 ? "text-white" : "text-orange-200"}>③ 가격·공개</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 md:px-10 py-8">
        {error && <div className="bg-red-50 text-red-500 text-sm font-semibold px-4 py-3 rounded-xl mb-4">{error}</div>}

        {isAlreadyExpert && step === 2 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-4">
            <p className="text-xs text-orange-600 font-semibold">✅ 이미 전문가로 등록되어 있어요! 새 Agent 정보만 입력하면 돼요.</p>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-1">👤 마케팅 전문가 프로필</h2>
              <p className="text-xs text-gray-400 mb-5">소상공인이 신뢰할 수 있는 전문가 정보를 입력해주세요.</p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">이름 <span className="text-orange-500">*</span></label>
                    <input type="text" placeholder="홍길동" value={form.name} onChange={e => update("name", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-500 bg-gray-50" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">직함·자격 <span className="text-orange-500">*</span></label>
                    <input type="text" placeholder="예: 마케팅 컨설턴트, SNS 전문가" value={form.title} onChange={e => update("title", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-500 bg-gray-50" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">소속 기관</label>
                    <input type="text" placeholder="마케팅 대행사, 프리랜서 등" value={form.company} onChange={e => update("company", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-500 bg-gray-50" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">경력 연수</label>
                    <select value={form.experience} onChange={e => update("experience", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-500 bg-gray-50">
                      <option value="">선택해주세요</option>
                      <option value="1~3년">1~3년</option>
                      <option value="4~7년">4~7년</option>
                      <option value="8~15년">8~15년</option>
                      <option value="15년 이상">15년 이상</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">이메일 <span className="text-orange-500">*</span></label>
                  <input type="email" placeholder="expert@example.com" value={form.email} onChange={e => update("email", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-500 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">한 줄 소개</label>
                  <input type="text" placeholder="예: 소상공인 SNS 마케팅 5년차 전문가" maxLength={60} value={form.intro} onChange={e => update("intro", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-500 bg-gray-50" />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setStep(2)} className="px-8 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-md text-sm">
                다음 단계 →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-1">🏪 소상공인 마케팅 Agent 설정</h2>
              <p className="text-xs text-gray-400 mb-5">HTML 파일을 업로드하면 설정이 자동으로 추출돼요!</p>
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">🚀 HTML Agent 파일 업로드</label>
                <div className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                  uploadStatus === "done" ? "border-green-400 bg-green-50" : uploadStatus === "uploading" ? "border-orange-400 bg-orange-50" :
                  uploadStatus === "error" ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-orange-400 hover:bg-orange-50"
                }`} onClick={() => document.getElementById("htmlFileInput")?.click()}>
                  {uploadStatus === "uploading" && <div><div className="text-2xl mb-2">⏳</div><p className="text-sm font-bold text-orange-600">{htmlFile?.name}</p><p className="text-xs text-gray-400 mt-1">업로드 중...</p></div>}
                  {uploadStatus === "done" && <div><div className="text-2xl mb-2">✅</div><p className="text-sm font-bold text-green-600">{htmlFile?.name}</p><p className="text-xs text-gray-400 mt-1">업로드 완료!</p></div>}
                  {uploadStatus === "error" && <div><div className="text-2xl mb-2">❌</div><p className="text-sm font-bold text-red-500">업로드 실패</p></div>}
                  {uploadStatus === "idle" && <div><div className="text-3xl mb-2">📁</div><p className="text-sm font-semibold text-gray-600">HTML 파일을 클릭해서 업로드하세요</p></div>}
                </div>
                <input id="htmlFileInput" type="file" accept=".html" className="hidden" onChange={handleFileUpload} />
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Agent 이름 <span className="text-orange-500">*</span></label>
                  <input type="text" placeholder="예: 인스타 콘텐츠 자동 생성 Agent" maxLength={40} value={form.agentName} onChange={e => update("agentName", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-500 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">한 줄 설명 <span className="text-orange-500">*</span></label>
                  <input type="text" placeholder="예: 사진 한 장이면 인스타·블로그·카톡 콘텐츠가 자동 생성" maxLength={80} value={form.agentDesc} onChange={e => update("agentDesc", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-500 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">상세 설명</label>
                  <textarea rows={3} placeholder="소상공인이 어떤 문제를 해결할 수 있는지 작성해주세요." value={form.agentLongDesc} onChange={e => update("agentLongDesc", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-500 bg-gray-50 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">시스템 프롬프트 {systemPrompt && <span className="ml-2 text-green-500 text-xs">✅ 자동 추출됨</span>}</label>
                  <textarea rows={4} placeholder="HTML 파일 업로드 시 자동으로 채워져요." value={systemPrompt} onChange={e => setSystemPrompt(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-500 bg-gray-50 resize-none font-mono" />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              {!isAlreadyExpert && <button onClick={() => setStep(1)} className="px-8 py-3 border border-gray-200 text-gray-600 font-bold rounded-full text-sm">← 이전</button>}
              <button onClick={() => setStep(3)} className={`px-8 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 shadow-md text-sm ${isAlreadyExpert ? "ml-auto" : ""}`}>다음 단계 →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-4">💰 가격 설정</h2>
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">베이직 플랜 (월, 원) <span className="text-orange-500">*</span></label>
                  <input type="number" placeholder="예: 19000" value={form.basicPrice} onChange={e => update("basicPrice", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-500 bg-gray-50" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">프로 플랜 (월, 원)</label>
                  <input type="number" placeholder="예: 49000" value={form.proPrice} onChange={e => update("proPrice", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-500 bg-gray-50" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">맛보기 체험 횟수</label>
                <select value={form.trialCount} onChange={e => update("trialCount", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-500 bg-gray-50">
                  <option value="3">3회 무료 체험</option>
                  <option value="5">5회 무료 체험</option>
                </select>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-5">
              <h3 className="text-sm font-extrabold text-gray-900 mb-3">📋 등록 전 체크리스트</h3>
              {[
                { label: "전문가 프로필을 완성했나요?", done: !!(form.name && form.title && form.email) },
                { label: "Agent 이름과 설명을 입력했나요?", done: !!(form.agentName && form.agentDesc) },
                { label: "HTML 파일을 업로드했나요?", done: !!htmlUrl },
                { label: "가격을 설정했나요?", done: !!form.basicPrice },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 text-sm mb-2">
                  <span>{item.done ? "✅" : "⬜"}</span> {item.label}
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="px-8 py-3 border border-gray-200 text-gray-600 font-bold rounded-full text-sm">← 이전</button>
              <button onClick={handleSubmit} disabled={loading}
                className="px-8 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 shadow-md text-sm disabled:opacity-50">
                {loading ? "등록 중..." : isAlreadyExpert ? "Agent 등록하기 🏪" : "등록 신청하기 🎉"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}