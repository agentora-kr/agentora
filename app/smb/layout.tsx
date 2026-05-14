"use client";

import Link from "next/link";
import { useState } from "react";

export default function SMBLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-14 lg:px-10">
          <Link
            href="/smb"
            onClick={closeMenu}
            className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden whitespace-nowrap lg:flex-none"
          >
            <span className="block min-w-0 truncate text-[clamp(1.6rem,6vw,2rem)] font-extrabold leading-none text-gray-900 lg:text-lg">
              Agentora
            </span>
            <span className="shrink-0 whitespace-nowrap rounded-full border border-orange-200 bg-orange-50 px-2 py-1 text-[clamp(0.72rem,3vw,0.88rem)] font-extrabold leading-none text-orange-600 [word-break:keep-all] lg:px-1.5 lg:py-0.5 lg:text-[10px]">
              소상공인
            </span>
          </Link>

          <div className="hidden items-center gap-3 whitespace-nowrap lg:flex">
            <Link href="/smb/agents" className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-orange-500">
              Agent 목록
            </Link>
            <Link href="/smb/register" className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-orange-500">
              전문가 등록
            </Link>
            <Link href="/login" className="rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-orange-600">
              무료 시작
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={
              menuOpen
                ? "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500 lg:hidden"
                : "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-gray-600 hover:bg-orange-50 hover:text-orange-500 lg:hidden"
            }
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menuOpen}
            aria-controls="smb-mobile-menu"
          >
            {menuOpen ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </nav>

        {menuOpen && (
          <div id="smb-mobile-menu" className="border-t border-gray-100 bg-white lg:hidden">
            <div className="px-8 pb-8 pt-8">
              <div className="flex flex-col gap-8">
                <Link href="/smb/agents" onClick={closeMenu} className="text-xl font-extrabold text-gray-900">
                  Agent 목록
                </Link>
                <Link href="/smb/register" onClick={closeMenu} className="text-xl font-extrabold text-gray-900">
                  전문가 등록
                </Link>
              </div>

              <div className="mt-9 border-t border-gray-100 pt-6">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex h-14 w-full items-center justify-center rounded-[18px] bg-orange-500 text-lg font-extrabold text-white shadow-sm hover:bg-orange-600"
                >
                  무료로 시작하기
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="pt-[72px] lg:pt-14">{children}</main>
    </>
  );
}
