"use client";

import Link from "next/link";
import { useState } from "react";

export default function SMBLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-3 sm:px-4 md:px-10">
          {/* 로고 */}
          <Link
            href="/smb"
            className="flex min-w-0 items-center gap-1.5"
            onClick={() => setMenuOpen(false)}
          >
            <span className="truncate text-lg font-extrabold text-gray-900">
              Agentora
            </span>
            <span className="shrink-0 whitespace-nowrap rounded-full border border-orange-200 bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold text-orange-600">
              소상공인
            </span>
          </Link>

          {/* 데스크탑 메뉴 */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/smb/agents"
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-orange-500"
            >
              Agent 목록
            </Link>
            <Link
              href="/smb/register"
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-orange-500"
            >
              전문가 등록
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-orange-600"
            >
              무료 시작
            </Link>
          </div>

          {/* 모바일 오른쪽 */}
          <div className="flex shrink-0 items-center gap-1.5 md:hidden">
            <Link
              href="/login"
              className="hidden whitespace-nowrap rounded-full bg-orange-500 px-3 py-1.5 text-xs font-bold text-white min-[360px]:inline-flex"
              onClick={() => setMenuOpen(false)}
            >
              무료 시작
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-orange-50 hover:text-orange-500"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* 모바일 드롭다운 */}
      {menuOpen && (
        <div className="fixed top-14 left-0 right-0 z-40 border-b border-gray-100 bg-white shadow-lg md:hidden">
          <div className="flex flex-col gap-1 p-4">
            <Link
              href="/smb/agents"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 transition-all hover:bg-orange-50"
            >
              <span className="text-xl">🏪</span>
              <div className="min-w-0">
                <div className="text-sm font-bold text-gray-900">
                  Agent 목록
                </div>
                <div className="truncate text-xs text-gray-400">
                  소상공인 마케팅 Agent 보기
                </div>
              </div>
            </Link>

            <Link
              href="/smb/register"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 transition-all hover:bg-orange-50"
            >
              <span className="text-xl">🧑‍💼</span>
              <div className="min-w-0">
                <div className="text-sm font-bold text-gray-900">
                  전문가 등록
                </div>
                <div className="truncate text-xs text-gray-400">
                  마케팅 Agent 등록하기
                </div>
              </div>
            </Link>

            <div className="mt-2 border-t border-gray-100 pt-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-xl bg-orange-500 py-3 text-sm font-bold text-white transition-all hover:bg-orange-600"
              >
                무료로 시작하기 🚀
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="pt-14">{children}</main>
    </>
  );
}
