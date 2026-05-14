"use client";
import Link from "next/link";
import { useState } from "react";

export default function SMBLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-14 flex items-center justify-between px-4 md:px-10">
        {/* 로고 */}
        <Link href="/smb" className="flex items-center gap-1.5 flex-shrink-0" onClick={() => setMenuOpen(false)}>
          <span className="text-lg font-extrabold text-gray-900">Agentora</span>
          <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full border border-orange-200 whitespace-nowrap">소상공인</span>
        </Link>

        {/* 데스크탑 메뉴 */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/smb/agents">
            <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-orange-500">Agent 목록</button>
          </Link>
          <Link href="/smb/register">
            <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-orange-500">전문가 등록</button>
          </Link>
          <Link href="/login">
            <button className="px-5 py-2 text-sm font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 shadow-sm">무료 시작</button>
          </Link>
        </div>

        {/* 모바일 오른쪽 */}
        <div className="flex md:hidden items-center gap-2 flex-shrink-0">
          <Link href="/login">
            <button className="px-3 py-1.5 text-xs font-bold text-white bg-orange-500 rounded-full whitespace-nowrap">무료 시작</button>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 text-gray-600 hover:text-orange-500"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* 모바일 드롭다운 */}
      {menuOpen && (
        <div className="fixed top-14 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-lg md:hidden">
          <div className="flex flex-col p-4 gap-1">
            <Link href="/smb/agents" onClick={() => setMenuOpen(false)}>
              <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orange-50 transition-all">
                <span className="text-xl">🏪</span>
                <div>
                  <div className="text-sm font-bold text-gray-900">Agent 목록</div>
                  <div className="text-xs text-gray-400">소상공인 마케팅 Agent 보기</div>
                </div>
              </div>
            </Link>
            <Link href="/smb/register" onClick={() => setMenuOpen(false)}>
              <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orange-50 transition-all">
                <span className="text-xl">🧑‍💼</span>
                <div>
                  <div className="text-sm font-bold text-gray-900">전문가 등록</div>
                  <div className="text-xs text-gray-400">마케팅 Agent 등록하기</div>
                </div>
              </div>
            </Link>
            <div className="mt-2 pt-2 border-t border-gray-100">
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <button className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl text-sm hover:bg-orange-600 transition-all">
                  무료로 시작하기 🚀
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {children}
    </>
  );
}