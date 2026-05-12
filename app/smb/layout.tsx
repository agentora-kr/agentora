import Link from "next/link";

export default function SMBLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-5 md:px-10">
        <Link href="/smb" className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-gray-900">Agentora</span>
          <span className="text-xs font-bold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full border border-orange-200">소상공인</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/smb/agents">
            <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-orange-500">Agent 목록</button>
          </Link>
          <Link href="/smb/register">
            <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-orange-500 hidden md:block">전문가 등록</button>
          </Link>
          <Link href="/login">
            <button className="px-5 py-2 text-sm font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 shadow-sm">무료 시작</button>
          </Link>
        </div>
      </nav>
      {children}
    </>
  );
}