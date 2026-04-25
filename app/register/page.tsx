"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

const CATEGORIES = [
  "📊 데이터 분석", "📞 고객 응대", "📝 문서 자동화", "💼 영업·마케팅",
  "⚖️ 법률·계약", "💰 재무·회계", "🏗️ 제조·품질", "🔧 IT·개발",
  "🏥 의료·헬스", "🎓 교육·HR"
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [htmlUrl, setHtmlUrl] = useState("");
  const [htmlFile, setHtmlFile] = useState<File | null>(null);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const supabase = createClient();

  const [form, setForm] = useState({
    name: "", title: "", company: "", email: "", experience: "",
    intro: "", description: "", categories: [] as string[],
    agentName: "", agentDesc: "", agentLongDesc: "",
    sampleQuestion: "", basicPrice: "", proPrice: "", trialCount: "3",
  });

  const update = (key: string, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const toggleCategory = (cat: string) => {
    setForm(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : prev.categories.length < 3
          ? [...prev.categories, cat]
          : prev.categories
    }));
  };

  const extractSystemPrompt = (html: string): string => {
    const patterns = [
      /const\s+systemPrompt\s*=\s*`([\s\S]+?)`(?=\s*;|\s*\n)/,
      /const\s+systemPrompt\s*=\s*["']([\s\S]+?)["'](?=\s*;|\s*\n)/,
      /system\s*:\s*`([\s\S]+?)`(?=\s*,|\s*\n)/,
      /system\s*:\s*["']([\s\S]+?)["'](?=\s*,|\s*\n)/,
      /["']system["']\s*:\s*`([\s\S]+?)`/,
      /["']system["']\s*:\s*["']([\s\S]+?)["']/,
      /systemPrompt\s*=\s*`([\s\S]+?)`/,
      /`(당신은[\s\S]{50,}?)`/,
      /`(You are[\s\S]{50,}?)`/,
    ];
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match !== null && match[1] !== undefined && match[1].trim().length > 30) {
        return match[1].trim();
      }
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
      const extracted = extractSystemPrompt(content);
      setSystemPrompt(extracted);

      const titleMatch = content.match(/<title>(.*?)<\/title>/i);
      if (titleMatch?.[1] && !form.agentName) {
        update("agentName", titleMatch[1].replace(/agentora|agent|–|-/gi, "").trim());
      }

      try {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("agentId", Date.now().toString());

        const res = await fetch("/api/upload-agent", {
          method: "POST",
          body: uploadFormData,
        });

        const data = await res.json();
        if (data.url) {
          setHtmlUrl(data.url);
          setUploadStatus("done");
        } else {
          setUploadStatus("error");
          setError("파일 업로드에 실패했어요. 다시 시도해주세요.");
        }
      } catch {
        setUploadStatus("error");
        setError("파일 업로드 중 오류가 발생했어요.");
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    if (!form.name || !form.email || !form.title) {
      setError("이름, 이메일, 직함은 필수입니다.");
      setLoading(false);
      return;
    }

    if (form.agentName && !form.agentDesc) {
      setError("Agent 이름을 입력했다면 한 줄 설명도 필수입니다.");
      setLoading(false);
      return;
    }

    try {
      // ✅ 로그인 여부 확인
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("로그인이 필요합니다. 먼저 로그인 후 다시 시도해주세요.");
        setLoading(false);
        return;
      }

      // ✅ 중복 등록 방지
      const { data: existingExpert } = await supabase
        .from("experts")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (existingExpert) {
        setError("이미 전문가로 등록되어 있습니다. 마이페이지에서 확인해주세요.");
        setLoading(false);
        return;
      }

      // ✅ experts 테이블 insert
      const { error: expertError } = await supabase.from("experts").insert({
        user_id: user.id,
        name: form.name,
        title: form.title,
        company: form.company,
        email: form.email,
        experience: form.experience,
        intro: form.intro,
        description: form.description,
        categories: form.categories,
        status: "pending",
      });

      if (expertError) throw expertError;

      // ✅ profiles.role → 'expert' 업데이트
      const { error: roleError } = await supabase
        .from("profiles")
        .update({ role: "expert" })
        .eq("id", user.id);

      if (roleError) {
        console.error("role 업데이트 실패:", roleError);
      }

      // ✅ Agent 등록 (user_id 포함)
      if (form.agentName) {
        const { error: agentError } = await supabase.from("agents").insert({
          name: form.agentName,
          description: form.agentDesc,
          long_description: form.agentLongDesc,
          system_prompt: systemPrompt,
          sample_question: form.sampleQuestion,
          html_url: htmlUrl || null,
          category: form.categories[0] || "기타",
          price: parseInt(form.basicPrice) || 0,
          author_name: form.name,
          expert_email: form.email,
          user_id: user.id,   // ✅ user_id 추가!
          emoji: "🤖",
          tags: form.categories,
          status: "pending",
        });
        if (agentError) throw agentError;
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("등록 중 오류가 발생했어요. 다시 시도해주세요.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-5">
        <div className="bg-white rounded-2xl p-10 shadow-xl max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">등록 신청 완료!</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            전문가 등록 신청이 완료됐어요.<br />
            검토 후 1~3일 내로 이메일로 안내드릴게요!
          </p>
          <Link href="/">
            <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all text-sm">
              홈으로 돌아가기
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-gray-900">Agentora</span>
        </Link>
      </nav>

      <div className="pt-16 bg-gradient-to-br from-gray-900 to-blue-900 px-5 md:px-10 py-8 md:py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-xl md:text-2xl font-extrabold text-white mb-2">🧑‍💼 전문가 Agent 등록</h1>
          <p className="text-sm text-gray-400 mb-5">전문 지식을 AI Agent로 패키징하고 수천 개 기업에 공급하세요.</p>
          <div className="w-full bg-white/10 rounded-full h-1.5 mb-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-orange-400 transition-all duration-500"
              style={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
            />
          </div>
          <div className="flex justify-between text-xs font-semibold">
            <span className={step >= 1 ? "text-white" : "text-gray-500"}>① 기본 정보</span>
            <span className={step >= 2 ? "text-white" : "text-gray-500"}>② Agent 설정</span>
            <span className={step >= 3 ? "text-white" : "text-gray-500"}>③ 가격·공개</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 md:px-10 py-8">
        {error && (
          <div className="bg-red-50 text-red-500 text-sm font-semibold px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-1">👤 전문가 프로필</h2>
              <p className="text-xs text-gray-400 mb-5">구매자가 신뢰할 수 있는 전문가 정보를 입력해주세요.</p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">이름 <span className="text-orange-500">*</span></label>
                    <input type="text" placeholder="홍길동" value={form.name} onChange={e => update("name", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">직함·자격 <span className="text-orange-500">*</span></label>
                    <input type="text" placeholder="예: 변호사, 데이터 사이언티스트" value={form.title} onChange={e => update("title", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">소속 기관</label>
                    <input type="text" placeholder="(주)테크컴퍼니" value={form.company} onChange={e => update("company", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">경력 연수</label>
                    <select value={form.experience} onChange={e => update("experience", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50">
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
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">한 줄 소개</label>
                  <input type="text" placeholder="예: 10년 경력의 계약 전문 변호사입니다" maxLength={60} value={form.intro} onChange={e => update("intro", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">상세 소개</label>
                  <textarea rows={4} placeholder="전문 분야, 주요 경력, Agent 개발 배경 등을 작성해주세요." value={form.description} onChange={e => update("description", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50 resize-none" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-1">🏷️ 전문 분야</h2>
              <p className="text-xs text-gray-400 mb-4">최대 3개 선택해주세요. ({form.categories.length}/3)</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => toggleCategory(cat)}
                    className={`px-4 py-2 rounded-full border text-xs font-semibold transition-all ${form.categories.includes(cat) ? "border-blue-500 text-blue-600 bg-blue-50" : "border-gray-200 text-gray-600 hover:border-blue-400"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={() => setStep(2)}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm">
                다음 단계 →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-1">🤖 Agent 설정</h2>
              <p className="text-xs text-gray-400 mb-5">HTML 파일을 업로드하면 설정이 자동으로 추출돼요!</p>

              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">🚀 HTML Agent 파일 업로드 (자동 추출)</label>
                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                    uploadStatus === "done" ? "border-green-400 bg-green-50" :
                    uploadStatus === "uploading" ? "border-blue-400 bg-blue-50" :
                    uploadStatus === "error" ? "border-red-400 bg-red-50" :
                    "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                  onClick={() => document.getElementById("htmlFileInput")?.click()}
                >
                  {uploadStatus === "uploading" && (
                    <div>
                      <div className="text-2xl mb-2">⏳</div>
                      <p className="text-sm font-bold text-blue-600">{htmlFile?.name}</p>
                      <p className="text-xs text-gray-400 mt-1">업로드 중...</p>
                    </div>
                  )}
                  {uploadStatus === "done" && (
                    <div>
                      <div className="text-2xl mb-2">✅</div>
                      <p className="text-sm font-bold text-green-600">{htmlFile?.name}</p>
                      <p className="text-xs text-gray-400 mt-1">업로드 완료!</p>
                      {systemPrompt
                        ? <p className="text-xs text-green-500 mt-1">✅ 시스템 프롬프트 자동 추출됨</p>
                        : <p className="text-xs text-gray-400 mt-1">아래에서 시스템 프롬프트를 직접 입력해주세요</p>
                      }
                    </div>
                  )}
                  {uploadStatus === "error" && (
                    <div>
                      <div className="text-2xl mb-2">❌</div>
                      <p className="text-sm font-bold text-red-500">업로드 실패</p>
                      <p className="text-xs text-gray-400 mt-1">다시 시도해주세요</p>
                    </div>
                  )}
                  {uploadStatus === "idle" && (
                    <div>
                      <div className="text-3xl mb-2">📁</div>
                      <p className="text-sm font-semibold text-gray-600">HTML 파일을 클릭해서 업로드하세요</p>
                      <p className="text-xs text-gray-400 mt-1">API 키가 자동으로 안전하게 처리돼요</p>
                    </div>
                  )}
                </div>
                <input id="htmlFileInput" type="file" accept=".html" className="hidden" onChange={handleFileUpload} />
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Agent 이름 <span className="text-orange-500">*</span></label>
                  <input type="text" placeholder="예: 계약서 리뷰 Agent" maxLength={40} value={form.agentName} onChange={e => update("agentName", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">한 줄 설명 <span className="text-orange-500">*</span></label>
                  <input type="text" placeholder="예: 계약서를 업로드하면 위험 조항을 즉시 분석합니다" maxLength={80} value={form.agentDesc} onChange={e => update("agentDesc", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">상세 설명</label>
                  <textarea rows={3} placeholder="Agent가 어떤 문제를 해결하는지 작성해주세요." value={form.agentLongDesc} onChange={e => update("agentLongDesc", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    시스템 프롬프트
                    {systemPrompt && <span className="ml-2 text-green-500 text-xs">✅ 자동 추출됨</span>}
                  </label>
                  <textarea rows={5}
                    placeholder="HTML 파일 업로드 시 자동으로 채워져요. 직접 입력도 가능해요."
                    value={systemPrompt} onChange={e => setSystemPrompt(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50 resize-none font-mono" />
                  <p className="text-xs text-gray-400 mt-1">구매자에게는 보이지 않습니다.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">맛보기 예시 질문</label>
                  <input type="text" placeholder="예: 이 계약서의 불리한 조항을 찾아줘" value={form.sampleQuestion} onChange={e => update("sampleQuestion", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(1)}
                className="px-8 py-3 border border-gray-200 text-gray-600 font-bold rounded-full hover:border-blue-400 hover:text-blue-600 transition-all text-sm">
                ← 이전
              </button>
              <button onClick={() => setStep(3)}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm">
                다음 단계 →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-4">💰 가격 설정</h2>
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">베이직 플랜 (월, 원) <span className="text-orange-500">*</span></label>
                  <input type="number" placeholder="예: 89000" value={form.basicPrice} onChange={e => update("basicPrice", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">프로 플랜 (월, 원)</label>
                  <input type="number" placeholder="예: 180000" value={form.proPrice} onChange={e => update("proPrice", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">맛보기 체험 횟수</label>
                <select value={form.trialCount} onChange={e => update("trialCount", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50">
                  <option value="3">3회 무료 체험</option>
                  <option value="5">5회 무료 체험</option>
                  <option value="10">10회 무료 체험</option>
                </select>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl border border-blue-100 p-5">
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
              <button onClick={() => setStep(2)}
                className="px-8 py-3 border border-gray-200 text-gray-600 font-bold rounded-full hover:border-blue-400 hover:text-blue-600 transition-all text-sm">
                ← 이전
              </button>
              <button onClick={handleSubmit} disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm disabled:opacity-50">
                {loading ? "등록 중..." : "등록 신청하기 🎉"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}