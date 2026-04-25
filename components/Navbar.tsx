"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPricingPopup, setShowPricingPopup] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const navLinks = [
    { href: "/agents", label: "전체 Agent" },
    { href: "/register", label: "전문가 등록" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-5 md:px-10">
          {/* 로고 */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">
              Agentora
            </span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  pathname === link.href
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* 가격 안내 — 팝업 트리거 */}
            <button
              onClick={() => setShowPricingPopup(true)}
              className={`text-sm font-semibold transition-colors ${
                pathname === "/pricing"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              가격 안내
            </button>
          </div>

          {/* 오른쪽 버튼 */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link href="/mypage">
                  <button className="px-5 py-2 text-sm font-bold text-gray-700 border border-gray-200 rounded-full hover:bg-gray-50 transition-all">
                    마이페이지
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-sm font-bold text-red-500 border border-red-200 rounded-full hover:bg-red-50 transition-all"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="px-5 py-2 text-sm font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-sm">
                  로그인
                </button>
              </Link>
            )}
          </div>

          {/* 모바일 햄버거 */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="메뉴 열기"
          >
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* 모바일 메뉴 드롭다운 */}
        {menuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 shadow-lg">
            <div className="flex flex-col px-5 py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`py-3 text-sm font-semibold rounded-lg px-3 transition-colors ${
                    pathname === link.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { setMenuOpen(false); setShowPricingPopup(true); }}
                className="py-3 text-sm font-semibold rounded-lg px-3 text-left text-gray-600 hover:bg-gray-50 transition-colors"
              >
                가격 안내
              </button>
              <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <Link href="/mypage" onClick={() => setMenuOpen(false)}>
                      <button className="w-full py-3 text-sm font-bold text-gray-700 border border-gray-200 rounded-full hover:bg-gray-50 transition-all">
                        마이페이지
                      </button>
                    </Link>
                    <button
                      onClick={() => { setMenuOpen(false); handleLogout(); }}
                      className="w-full py-3 text-sm font-bold text-red-500 border border-red-200 rounded-full hover:bg-red-50 transition-all"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    <button className="w-full py-3 text-sm font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all">
                      로그인
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 가격 안내 준비 중 팝업 */}
      {showPricingPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowPricingPopup(false)}>
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4 text-center" onClick={e => e.stopPropagation()}>
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">가격 안내 준비 중!</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              현재 가격 체계를 정비하고 있어요.<br />곧 상세한 가격 안내를 제공할 예정이에요!
            </p>
            <button
              onClick={() => setShowPricingPopup(false)}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all text-sm"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}