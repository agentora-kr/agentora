"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"buyer" | "expert">("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signupDone, setSignupDone] = useState(false);
  const [signupRole, setSignupRole] = useState<"buyer" | "expert">("buyer");
  const supabase = createClient();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("이메일 또는 비밀번호가 올바르지 않아요.");
    } else if (!data.user?.email_confirmed_at) {
      setError("이메일 인증이 완료되지 않았어요. 받은 편지함을 확인해주세요! 📧");
      await supabase.auth.signOut();
    } else {
      window.location.href = "/mypage";
    }
    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    if (!email || !password || !name) {
      setError("이름, 이메일, 비밀번호를 모두 입력해주세요.");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 해요.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, company, role }
      }
    });
    if (error) {
      setError("회원가입 중 오류가 발생했어요. 다시 시도해주세요.");
    } else {
      setSignupRole(role);
      setSignupDone(true);
    }
    setLoading(false);
  };

  // 가입 완료 화면
  if (signupDone) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex flex-col">
        <nav className="h-16 flex items-center justify-between px-5 md:px-10 bg-white/90 backdrop-blur-md border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-white text-sm">🤖</div>
            <span className="text-xl font-extrabold text-gray-900">Agentora</span>
          </Link>
        </nav>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-10 shadow-xl max-w-md w-full text-center">
            <div className="text-6xl mb-4">📧</div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">이메일을 확인해주세요!</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">
              <strong>{email}</strong> 으로 인증 메일을 보냈어요.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              이메일의 인증 링크를 클릭하면<br />가입이 완료됩니다 🎉
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setSignupDone(false); setTab("login"); }}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm">
                로그인 하러 가기
              </button>
              {signupRole === "expert" && (
                <Link href="/register">
                  <button className="w-full py-3 border-2 border-orange-400 text-orange-500 font-bold rounded-full hover:bg-orange-50 transition-all text-sm">
                    🧑‍💼 Agent 등록하기
                  </button>
                </Link>
              )}
              <Link href="/">
                <button className="w-full py-3 border border-gray-200 text-gray-500 font-bold rounded-full hover:bg-gray-50 transition-all text-sm">
                  홈으로 돌아가기
                </button>
              </Link>
            </div>
            <p className="text-xs text-gray-400 mt-6">
              메일이 안 왔나요? 스팸함을 확인하거나<br />
              <button onClick={handleSignup} className="text-blue-500 underline">재발송하기</button>
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex flex-col">
      <nav className="h-16 flex items-center justify-between px-5 md:px-10 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-white text-sm">🤖</div>
          <span className="text-xl font-extrabold text-gray-900">Agentora</span>
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex bg-white rounded-xl p-1 shadow-md mb-5">
            <button onClick={() => { setTab("login"); setError(""); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === "login" ? "bg-blue-600 text-white shadow" : "text-gray-500"}`}>
              로그인
            </button>
            <button onClick={() => { setTab("signup"); setError(""); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === "signup" ? "bg-blue-600 text-white shadow" : "text-gray-500"}`}>
              회원가입
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            {error && <div className="bg-red-50 text-red-500 text-sm font-semibold px-4 py-3 rounded-xl mb-4">{error}</div>}

            {tab === "login" ? (
              <>
                <h2 className="text-xl font-extrabold text-gray-900 mb-1">다시 만나서 반가워요 👋</h2>
                <p className="text-sm text-gray-500 mb-6">Agentora에 로그인하고 AI Agent를 탐색하세요.</p>
                <div className="flex flex-col gap-3 mb-4">
                  <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                  <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
                <button onClick={handleLogin} disabled={loading}
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md disabled:opacity-50">
                  {loading ? "로그인 중..." : "로그인"}
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  계정이 없으신가요? <button onClick={() => setTab("signup")} className="text-blue-600 font-bold">무료 회원가입</button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-extrabold text-gray-900 mb-1">Agentora 시작하기 🚀</h2>
                <p className="text-sm text-gray-500 mb-5">무료로 가입하고 AI Agent를 탐색해보세요.</p>

                <div className="flex gap-2 mb-5">
                  <button onClick={() => setRole("buyer")}
                    className={`flex-1 flex flex-col items-center gap-1.5 p-3 border-2 rounded-xl cursor-pointer transition-all text-xs font-bold ${role === "buyer" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-500 hover:border-blue-300"}`}>
                    <span className="text-2xl">🏢</span>기업 (구매자)
                  </button>
                  <button onClick={() => setRole("expert")}
                    className={`flex-1 flex flex-col items-center gap-1.5 p-3 border-2 rounded-xl cursor-pointer transition-all text-xs font-bold ${role === "expert" ? "border-orange-500 bg-orange-50 text-orange-600" : "border-gray-200 text-gray-500 hover:border-orange-300"}`}>
                    <span className="text-2xl">🧑‍💼</span>전문가 (판매자)
                  </button>
                </div>

                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex gap-2">
                    <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                    <input type="text" placeholder="회사명 (선택)" value={company} onChange={(e) => setCompany(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                  </div>
                  <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                  <input type="password" placeholder="비밀번호 (8자 이상)" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>

                {role === "expert" && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-4">
                    <p className="text-xs text-orange-600 font-semibold">🧑‍💼 가입 후 Agent 등록 페이지로 이동해요!</p>
                  </div>
                )}

                <button onClick={handleSignup} disabled={loading}
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md disabled:opacity-50">
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