"use client";

import Link from "next/link";
import { useState } from "react";

export default function SMBLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 h-14 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-2 px-3 sm:px-4 lg:px-10">
          <Link
            href="/smb"
            onClick={closeMenu}
            className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden whitespace-nowrap lg:flex-none"
          >
            <span className="block min-w-0 truncate whitespace-nowrap text-lg font-extrabold leading-none text-gray-900">
              Agentora
            </span>
            <span className="block shrink-0 whitespace-nowrap rounded-full border border-orange-200 bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold leading-none text-orange-600 [word-break:keep-all]">
              소상공인
            </span>
          </Link>

          <div className="hidden items-center gap-3 whitespace-nowrap lg:flex">
            <Link
              href="/smb/agents"
              className="whitespace-nowrap px-4 py-2 text-sm font-semibold text-gray-600 hover:text-orange-500 [word-break:keep-all]"
            >
              Agent 목록
            </Link>
            <Link
              href="/smb/register"
              className="whitespace-nowrap px-4 py-2 text-sm font-semibold text-gray-600 hover:text-orange-500 [word-break:keep-all]"
            >
              전문가 등록
            </Link>
            <Link
              href="/login"
              className="whitespace-nowrap rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-orange-600 [word-break:keep-all]"
            >
              무료 시작
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-600 hover:bg-orange-50 hover:text-orange-500 lg:hidden"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menuOpen}
            aria-controls="smb-mobile-menu"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="smb-mobile-menu"
          className="fixed left-0 right-0 top-14 z-40 border-b border-gray-100 bg-white shadow-lg lg:hidden"
        >
          <div className="flex flex-col gap-1 p-4">
            <Link
              href="/smb/agents"
              onClick={closeMenu}
              className="flex items-center rounded-xl px-3 py-3 text-sm font-bold text-gray-900 hover:bg-orange-50"
            >
              Agent 목록
            </Link>

            <Link
              href="/smb/register"
              onClick={closeMenu}
              className="flex items-center rounded-xl px-3 py-3 text-sm font-bold text-gray-900 hover:bg-orange-50"
            >
              전문가 등록
            </Link>

            <div className="mt-2 border-t border-gray-100 pt-2">
              <Link
                href="/login"
                onClick={closeMenu}
                className="flex w-full items-center justify-center rounded-xl bg-orange-500 py-3 text-sm font-bold text-white hover:bg-orange-600"
              >
                무료로 시작하기
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="pt-14">{children}</main>
    </>
  );
}
