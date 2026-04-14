"use client";
import { useState } from "react";
import Link from "next/link";

export default function MyPage() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", icon: "📊", label: "대시보드" },
    { id: "agents", icon: "🤖", label: "내 Agent", badge: 3 },
    { id: "payment", icon: "💳", label: "결제 내역" },
    { id: "notifications", icon: "🔔", label: "알림", badge: 3 },
    { id: "profile", icon: "👤", label: "프로필 설정" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-sm">🤖</div>
          <span className="text-xl font-extrabold text-gray-900">Agentora</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="relative cursor-pointer w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-base">
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full border border-white"></span>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold cursor-pointer">김</div>
        </div>
      </nav>

      {/* 프로필 헤더 */}
      <div className="pt-16 bg-gradient-to-br from-gray-900 to-blue-900 px-10 py-8">
        <div className="max-w-5xl mx-auto flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl border-2 border-white/30 flex-shrink-0">🏢</div>
          <div className="flex-1">
            <h1 className="text-xl font-extrabold text-white mb-1">김혁신 님, 안녕하세요 👋</h1>
            <p className="text-sm text-gray-400 mb-2">혁신테크(주) · enterprise@innovtech.co.kr</p>
            <div className="flex gap-2 flex-wrap">
              {["기업 회원", "구독 활성", "3개 Agent 사용 중"].map((badge, i) => (
                <span key={badge} className={`text-xs font-bold px-3 py-1 rounded-full ${i === 0 ? "bg-white/15 text-white" : i === 1 ? "bg-green-500 text-white" : "bg-orange-500 text-white"}`}>
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-8 flex-shrink-0">
            {[["3", "구독 Agent"], ["1,240", "이번 달 사용량"], ["₩254만", "누적 절감 비용"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-xl font-extrabold text-white">{num}</div>
                <div className="text-xs text-gray-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 */}
      <div className="max-w-5xl mx-auto px-10 py-7 flex gap-6">

        {/* 사이드바 */}
        <aside className="w-48 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden sticky top-20">
            {menuItems.map((item, i) => (
              <div key={item.id}>
                {i === 3 && <div className="h-px bg-gray-100"></div>}
                <button
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-all border-l-2 ${activeMenu === item.id ? "bg-blue-50 text-blue-600 font-bold border-blue-500" : "text-gray-600 border-transparent hover:bg-gray-50 hover:text-blue-600"}`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>
                  )}
                </button>
              </div>
            ))}
            <div className="h-px bg-gray-100"></div>
            <Link href="/">
              <button className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-gray-600 border-l-2 border-transparent hover:bg-gray-50 hover:text-blue-600 transition-all">
                <span className="text-base">🚪</span> 로그아웃
              </button>
            </Link>
          </div>
        </aside>

        {/* 콘텐츠 */}
        <div className="flex-1 min-w-0">

          {/* 대시보드 */}
          {activeMenu === "dashboard" && (
            <div className="flex flex-col gap-5">
              {/* 요약 카드 */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: "🤖", num: "3", label: "구독 중인 Agent", change: "↑ 이번 달 1개 추가", up: true },
                  { icon: "⚡", num: "1,240", label: "이번 달 사용량", change: "↑ 전월 대비 +18%", up: true },
                  { icon: "💰", num: "₩234K", label: "결제 예정", change: "다음 결제 D-12", up: false },
                  { icon: "⭐", num: "4.8", label: "평균 만족도", change: "↑ 최고 사용자 등급", up: true },
                ].map((card) => (
                  <div key={card.label} className="bg-white rounded-2xl border border-gray-200 p-4 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer">
                    <div className="text-2xl mb-2">{card.icon}</div>
                    <div className="text-xl font-extrabold text-gray-900">{card.num}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{card.label}</div>
                    <div className={`text-xs mt-1.5 font-semibold ${card.up ? "text-green-500" : "text-gray-400"}`}>{card.change}</div>
                  </div>
                ))}
              </div>

              {/* 사용 중인 Agent */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-extrabold text-gray-900">🤖 사용 중인 Agent</h2>
                  <Link href="/agents" className="text-sm font-semibold text-blue-600 hover:underline">더 추가하기 +</Link>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { emoji: "🤖", bg: "bg-blue-50", name: "계약서 리뷰 Agent", by: "김법률 변호사 · 법무법인 테크", status: "구독 중", statusColor: "bg-green-100 text-green-600", price: "89,000", trial: false },
                    { emoji: "📈", bg: "bg-green-50", name: "매출 데이터 분석 Agent", by: "데이터랩 · 이분석", status: "구독 중", statusColor: "bg-green-100 text-green-600", price: "120,000", trial: false },
                    { emoji: "💬", bg: "bg-orange-50", name: "고객 CS 자동화 Agent", by: "박서비스 · CS전문그룹", status: "맛보기 체험 중 (2회 남음)", statusColor: "bg-yellow-100 text-yellow-600", price: "65,000", trial: true },
                  ].map((agent) => (
                    <div key={agent.name} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 transition-all">
                      <div className={`w-11 h-11 rounded-xl ${agent.bg} flex items-center justify-center text-xl flex-shrink-0`}>{agent.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-gray-900">{agent.name}</div>
                        <div className="text-xs text-gray-400">{agent.by}</div>
                        <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${agent.statusColor}`}>{agent.status}</span>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <div className="text-sm font-extrabold text-gray-900">₩{agent.price} <span className="text-xs font-normal text-gray-400">/월</span></div>
                        <div className="flex gap-1.5">
                          <Link href="/agents/1">
                            <button className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all">▶ 실행</button>
                          </Link>
                          {agent.trial ? (
                            <button className="px-3 py-1 rounded-lg text-xs font-bold bg-orange-500 text-white hover:bg-orange-600 transition-all">구매</button>
                          ) : (
                            <button className="px-3 py-1 rounded-lg text-xs font-bold border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 transition-all">취소</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 사용량 차트 */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-extrabold text-gray-900">📈 월별 사용량</h2>
                  <div className="flex gap-1.5">
                    {["3개월", "6개월", "1년"].map((p, i) => (
                      <button key={p} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${i === 1 ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-500 hover:border-blue-300"}`}>{p}</button>
                    ))}
                  </div>
                </div>
                <div className="flex items-end gap-2 h-28">
                  {[
                    { month: "11월", height: "45%", val: "620회", hl: false },
                    { month: "12월", height: "55%", val: "758회", hl: false },
                    { month: "1월", height: "48%", val: "662회", hl: false },
                    { month: "2월", height: "70%", val: "962회", hl: false },
                    { month: "3월", height: "78%", val: "1,074회", hl: false },
                    { month: "4월", height: "90%", val: "1,240회", hl: true },
                  ].map((bar) => (
                    <div key={bar.month} className="flex-1 flex flex-col items-center gap-1.5">
                      <div className="w-full relative group" style={{ height: "100px" }}>
                        <div
                          className={`absolute bottom-0 w-full rounded-t-lg transition-all group-hover:opacity-80 ${bar.hl ? "bg-blue-600" : "bg-blue-100"}`}
                          style={{ height: bar.height }}
                        >
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-600 whitespace-nowrap transition-all">
                            {bar.val}
                          </div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-semibold ${bar.hl ? "text-blue-600" : "text-gray-400"}`}>{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 알림 */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-extrabold text-gray-900">🔔 최근 알림</h2>
                  <button onClick={() => setActiveMenu("notifications")} className="text-sm font-semibold text-blue-600 hover:underline">전체 보기</button>
                </div>
                <div className="flex flex-col gap-1">
                  {[
                    { icon: "📋", title: "계약서 리뷰 완료", desc: "'서비스 계약서_v3.pdf' 분석 완료. 3개의 위험 조항 발견.", time: "방금 전", unread: true },
                    { icon: "💳", title: "결제 예정 안내", desc: "12일 후 ₩234,000이 자동 결제됩니다.", time: "2시간 전", unread: true },
                    { icon: "🎉", title: "신규 Agent 추천", desc: "관심 분야의 새 Agent '특허 출원 자동화'가 등록됐습니다.", time: "어제", unread: false },
                  ].map((n) => (
                    <div key={n.title} className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all ${n.unread ? "bg-blue-50" : "hover:bg-gray-50"}`}>
                      <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-base flex-shrink-0">{n.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-gray-900">{n.title}</div>
                        <div className="text-xs text-gray-500 leading-relaxed">{n.desc}</div>
                        <div className="text-[10px] text-gray-400 mt-1">{n.time}</div>
                      </div>
                      {n.unread && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 내 Agent */}
          {activeMenu === "agents" && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-extrabold text-gray-900">🤖 내 Agent 목록</h2>
                <Link href="/agents" className="text-sm font-semibold text-blue-600 hover:underline">새 Agent 추가 +</Link>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { id: 1, emoji: "🤖", bg: "bg-blue-50", name: "계약서 리뷰 Agent", by: "김법률 변호사 · 법무법인 테크", status: "● 구독 중 · 베이직 플랜", statusColor: "text-green-500", price: "89,000" },
                  { id: 2, emoji: "📈", bg: "bg-green-50", name: "매출 데이터 분석 Agent", by: "데이터랩 · 이분석", status: "● 구독 중 · 프로 플랜", statusColor: "text-green-500", price: "120,000" },
                  { id: 3, emoji: "💬", bg: "bg-orange-50", name: "고객 CS 자동화 Agent", by: "박서비스 · CS전문그룹", status: "◑ 맛보기 체험 중 (2회 남음)", statusColor: "text-yellow-500", price: "65,000" },
                ].map((agent) => (
                  <div key={agent.name} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-blue-200 transition-all">
                    <div className={`w-12 h-12 rounded-xl ${agent.bg} flex items-center justify-center text-2xl flex-shrink-0`}>{agent.emoji}</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-gray-900">{agent.name}</div>
                      <div className="text-xs text-gray-400">{agent.by}</div>
                      <div className={`text-xs font-semibold mt-1 ${agent.statusColor}`}>{agent.status}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-sm font-extrabold text-gray-900">₩{agent.price} <span className="text-xs font-normal text-gray-400">/월</span></div>
                      <div className="flex gap-1.5">
                        <Link href={`/agents/${agent.id}`}>
                          <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all">▶ 실행</button>
                        </Link>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 transition-all">취소</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 결제 내역 */}
          {activeMenu === "payment" && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="text-base font-extrabold text-gray-900 mb-4">💳 결제 내역</h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["날짜", "Agent", "플랜", "금액", "상태", "영수증"].map((h) => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase pb-3 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: "2026.04.01", name: "계약서 리뷰 Agent", plan: "베이직", price: "₩89,000", status: "완료", statusColor: "bg-green-100 text-green-600" },
                    { date: "2026.04.01", name: "매출 데이터 분석", plan: "프로", price: "₩120,000", status: "완료", statusColor: "bg-green-100 text-green-600" },
                    { date: "2026.05.01", name: "계약서 리뷰 Agent", plan: "베이직", price: "₩89,000", status: "예정", statusColor: "bg-yellow-100 text-yellow-600" },
                    { date: "2026.03.01", name: "SNS 콘텐츠 생성", plan: "베이직", price: "₩49,000", status: "취소", statusColor: "bg-red-100 text-red-500" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-all">
                      <td className="py-3 pr-4 text-xs text-gray-500">{row.date}</td>
                      <td className="py-3 pr-4 text-xs font-semibold text-gray-800">{row.name}</td>
                      <td className="py-3 pr-4 text-xs text-gray-500">{row.plan}</td>
                      <td className="py-3 pr-4 text-xs font-bold text-gray-900">{row.price}</td>
                      <td className="py-3 pr-4">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${row.statusColor}`}>{row.status}</span>
                      </td>
                      <td className="py-3 text-xs text-blue-600 cursor-pointer hover:underline">{row.status !== "예정" ? "다운로드" : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 알림 */}
          {activeMenu === "notifications" && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="text-base font-extrabold text-gray-900 mb-4">🔔 알림 센터</h2>
              <div className="flex flex-col gap-1">
                {[
                  { icon: "📋", title: "계약서 리뷰 완료", desc: "'서비스 계약서_v3.pdf' 분석 완료. 3개의 위험 조항 발견.", time: "방금 전", unread: true },
                  { icon: "💳", title: "결제 예정 안내", desc: "12일 후 ₩234,000이 자동 결제됩니다. 카드: 신한카드 ****1234", time: "2시간 전", unread: true },
                  { icon: "🎉", title: "신규 Agent 추천", desc: "관심 분야의 새 Agent '특허 출원 자동화'가 등록됐습니다.", time: "어제", unread: true },
                  { icon: "📊", title: "월간 리포트 준비됨", desc: "3월 사용량 리포트가 준비되었습니다.", time: "3일 전", unread: false },
                  { icon: "✅", title: "Agent 구독 갱신 완료", desc: "계약서 리뷰 Agent 구독이 자동 갱신되었습니다.", time: "1주일 전", unread: false },
                ].map((n) => (
                  <div key={n.title} className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all ${n.unread ? "bg-blue-50" : "hover:bg-gray-50"}`}>
                    <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-base flex-shrink-0">{n.icon}</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-gray-900">{n.title}</div>
                      <div className="text-xs text-gray-500 leading-relaxed">{n.desc}</div>
                      <div className="text-[10px] text-gray-400 mt-1">{n.time}</div>
                    </div>
                    {n.unread && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 프로필 설정 */}
          {activeMenu === "profile" && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="text-base font-extrabold text-gray-900 mb-5">👤 프로필 설정</h2>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">이름</label>
                    <input type="text" defaultValue="김혁신" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">회사명</label>
                    <input type="text" defaultValue="혁신테크(주)" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">이메일</label>
                  <input type="email" defaultValue="enterprise@innovtech.co.kr" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">연락처</label>
                  <input type="tel" defaultValue="010-1234-5678" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 bg-gray-50" />
                </div>
                <div className="flex justify-end mt-2">
                  <button className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md text-sm">
                    저장하기
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}