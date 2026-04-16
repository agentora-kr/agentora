"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const supabase = createClient();

  // 로그인
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("이메일 또는 비밀번호가 올바르지 않아요.");
    } else {
      router.push("/mypage");
    }
    setLoading(false);
  };

  // 회원가입
  const handleSignup = async () => {
    setLoading(true);
    setError("");
    if (!email || !password || !name) {
      setError("이름, 이메일, 비밀번호를 모두 입력해주세요.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, company }
      }
    });
    if (error) {
      setError("회원가입 중 오류가 발생했어요. 다시 시도해주세요.");
    } else {
      setSuccess("가입 완료! 이메일을 확인해주세요 📧");
    }
    setLoading(false);
  };

  // 구글 로그인
  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/mypage` }
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex flex-col">
      <nav className="h-16 flex items-center justify-between px-10 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-white text-sm">🤖</div>
          <span className="text-xl font-extrabold text-gray-900">Agentora</span>
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex bg-white rounded-xl p-1 shadow-md mb-5">
            <button onClick={() => { setTab("login"); setError(""); setSuccess(""); }} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === "login" ? "bg-blue-600 text-white shadow" : "text-gray-500"}`}>로그인</button>
            <button onClick={() => { setTab("signup"); setError(""); setSuccess(""); }} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === "signup" ? "bg-blue-600 text-white shadow" : "text-gray-500"}`}>회원가입</button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">

            {/* 에러/성공 메시지 */}
            {error && <div className="bg-red-50 text-red-500 text-sm font-semibold px-4 py-3 rounded-xl mb-4">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 text-sm font-semibold px-4 py-3 rounded-xl mb-4">{success}</div>}

            {tab === "login" ? (
              <>
                <h2 className="text-xl font-extrabold text-gray-900 mb-1">다시 만나서 반가워요 👋</h2>
                <p className="text-sm text-gray-500 mb-6">Agentora에 로그인하고 AI Agent를 탐색하세요.</p>

                <div className="flex gap-2 mb-5">
                  <button onClick={handleGoogle} className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold hover:border-blue-400 hover:bg-blue-50 transition-all">🇬 Google</button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold hover:border-blue-400 hover:bg-blue-50 transition-all">💼 Microsoft</button>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-xs text-gray-400">또는 이메일로 로그인</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <div className="flex flex-col gap-3 mb-4">
                  <input type="email" placeholder="company@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50" />
                  <input type="password" placeholder="비밀번호 입력" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50" />
                </div>

                <div className="text-right mb-4">
                  <a href="#" className="text-xs text-blue-600 hover:underline">비밀번호를 잊으셨나요?</a>
                </div>

                <button onClick={handleLogin} disabled={loading} className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md disabled:opacity-50">
                  {loading ? "로그인 중..." : "로그인"}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  계정이 없으신가요? <button onClick={() => setTab("signup")} className="text-blue-600 font-bold">무료 회원가입</button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-extrabold text-gray-900 mb-1">Agentora 시작하기 🚀</h2>
                <p className="text-sm text-gray-500 mb-6">무료로 가입하고 1,240개+ AI Agent를 탐색해보세요.</p>

                <div className="flex gap-2 mb-5">
                  <button onClick={handleGoogle} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold hover:border-blue-400 hover:bg-blue-50 transition-all">🇬 Google</button>
                  <button className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold hover:border-blue-400 hover:bg-blue-50 transition-all">💼 Microsoft</button>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-xs text-gray-400">또는 이메일로 가입</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <div className="flex gap-2 mb-4">
                  <label className="flex-1 flex flex-col items-center gap-1.5 p-3 border-2 border-blue-500 bg-blue-50 rounded-xl cursor-pointer text-xs font-bold text-blue-600">
                    <span className="text-2xl">🏢</span>기업 (구매자)
                  </label>
                  <label className="flex-1 flex flex-col items-center gap-1.5 p-3 border border-gray-200 rounded-xl cursor-pointer text-xs font-bold text-gray-500 hover:border-blue-300 transition-all">
                    <span className="text-2xl">🧑‍💼</span>전문가 (판매자)
                  </label>
                </div>

                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex gap-2">
                    <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                    <input type="text" placeholder="회사명" value={company} onChange={(e) => setCompany(e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                  </div>
                  <input type="email" placeholder="company@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                  <input type="password" placeholder="비밀번호 (8자 이상)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <input type="checkbox" id="agree" className="accent-blue-600" />
                  <label htmlFor="agree" className="text-xs text-gray-500">
                    <a href="#" className="text-blue-600">이용약관</a> 및 <a href="#" className="text-blue-600">개인정보처리방침</a>에 동의합니다
                  </label>
                </div>

                <button onClick={handleSignup} disabled={loading} className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md disabled:opacity-50">
                  {loading ? "가입 중..." : "무료 회원가입"}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  이미 계정이 있으신가요? <button onClick={() => setTab("login")} className="text-blue-600 font-bold">로그인</button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}