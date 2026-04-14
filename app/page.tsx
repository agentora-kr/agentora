import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-white text-sm">🤖</div>
          <span className="text-xl font-extrabold text-gray-900">Agentora</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/agents" className="text-sm font-medium text-gray-500 hover:text-blue-600">전체 Agent</Link>
          <Link href="/agents" className="text-sm font-medium text-gray-500 hover:text-blue-600">카테고리</Link>
          <Link href="/register" className="text-sm font-medium text-gray-500 hover:text-blue-600">전문가</Link>
          <Link href="#" className="text-sm font-medium text-gray-500 hover:text-blue-600">가격 안내</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <button className="px-5 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all">로그인</button>
          </Link>
          <Link href="/login">
            <button className="px-5 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md">무료 시작</button>
          </Link>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="pt-40 pb-24 px-10 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-100 rounded-full px-4 py-1.5 text-sm font-semibold text-blue-600 mb-8 shadow-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            지금 1,240개+ AI Agent가 등록되어 있어요
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
            필요한 AI Agent를<br />
            <span className="text-blue-600">직접 맛보고</span> 도입하세요
          </h1>
          <p className="text-lg text-gray-500 mb-10 leading-relaxed">
            검증된 전문가들이 만든 AI Agent를 체험해보고,<br />
            우리 회사에 꼭 맞는 솔루션만 골라 구독하세요.
          </p>

          {/* 검색바 */}
          <div className="flex items-center bg-white rounded-full shadow-xl border border-blue-100 px-5 py-2 max-w-2xl mx-auto mb-5">
            <span className="text-gray-400 mr-3">🔍</span>
            <input
              type="text"
              placeholder="어떤 업무를 자동화하고 싶으세요? (예: 계약서 검토, 매출 분석...)"
              className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
            />
            <Link href="/agents">
              <button className="ml-3 px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-700 transition-all whitespace-nowrap">
                검색하기
              </button>
            </Link>
          </div>

          {/* 태그 */}
          <div className="flex gap-2 justify-center flex-wrap">
            {["📊 데이터 분석", "📞 고객 응대", "📝 계약서 검토", "💼 영업 지원", "⚖️ 법률", "💰 회계·세무"].map((tag) => (
              <Link href="/agents" key={tag}>
                <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-600 cursor-pointer hover:border-blue-400 hover:text-blue-600 transition-all">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 통계 바 */}
      <div className="bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto flex justify-center gap-20">
          {[
            { num: "1,240+", label: "등록된 AI Agent" },
            { num: "380+", label: "검증된 전문가" },
            { num: "4,800+", label: "도입 기업" },
            { num: "98%", label: "고객 만족도" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-extrabold text-white">{s.num}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 카테고리 */}
      <section className="py-16 px-10 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900">카테고리 탐색 🗂️</h2>
            <Link href="/agents" className="text-sm font-semibold text-blue-600 hover:underline">전체 보기 →</Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: "📊", name: "데이터 분석", count: "218개" },
              { icon: "📞", name: "고객 응대", count: "195개" },
              { icon: "📝", name: "문서 자동화", count: "172개" },
              { icon: "💼", name: "영업·마케팅", count: "154개" },
              { icon: "⚖️", name: "법률·계약", count: "98개" },
              { icon: "💰", name: "재무·회계", count: "121개" },
              { icon: "🏗️", name: "제조·품질", count: "87개" },
              { icon: "🔧", name: "IT·개발", count: "195개" },
            ].map((cat) => (
              <Link href="/agents" key={cat.name}>
                <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{cat.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{cat.count}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 인기 Agent */}
      <section className="py-16 px-10 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900">🔥 인기 Agent</h2>
            <Link href="/agents" className="text-sm font-semibold text-blue-600 hover:underline">전체 보기 →</Link>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {[
              { id: 1, emoji: "🤖", bg: "bg-blue-50", name: "계약서 리뷰 Agent", author: "김법률 변호사", desc: "위험 조항·불리한 조건을 즉시 분석하고 수정안을 제안합니다.", tags: ["법률", "계약서"], rating: "4.9", reviews: "342", price: "89,000", badge: "HOT", badgeColor: "bg-orange-500" },
              { id: 2, emoji: "📈", bg: "bg-green-50", name: "매출 데이터 분석", author: "데이터랩 · 이분석", desc: "매출 트렌드, 이상치, 예측 리포트를 자동 생성합니다.", tags: ["데이터", "예측"], rating: "4.8", reviews: "218", price: "120,000", badge: null, badgeColor: "" },
              { id: 3, emoji: "💬", bg: "bg-orange-50", name: "고객 CS 자동화", author: "박서비스 · CS전문", desc: "24시간 고객 문의 응대. 담당자 자동 에스컬레이션.", tags: ["CS", "챗봇"], rating: "4.7", reviews: "89", price: "65,000", badge: "NEW", badgeColor: "bg-green-500" },
              { id: 4, emoji: "📧", bg: "bg-purple-50", name: "영업 이메일 작성", author: "최마케팅 · 그로스팀", desc: "업종별 맞춤 영업 이메일을 자동 초안 작성합니다.", tags: ["영업", "이메일"], rating: "4.6", reviews: "176", price: "45,000", badge: "PICK", badgeColor: "bg-blue-600" },
              { id: 5, emoji: "🏭", bg: "bg-red-50", name: "품질 불량 예측", author: "정제조 · 스마트팩토리", desc: "센서 데이터 실시간 분석, 불량 사전 감지.", tags: ["제조", "품질"], rating: "4.9", reviews: "134", price: "200,000", badge: "HOT", badgeColor: "bg-orange-500" },
              { id: 6, emoji: "💰", bg: "bg-emerald-50", name: "세금계산서 자동화", author: "한회계 · 택스솔루션", desc: "세금계산서 분류·검토 후 회계 소프트웨어 자동 입력.", tags: ["회계", "ERP"], rating: "4.7", reviews: "201", price: "75,000", badge: null, badgeColor: "" },
            ].map((agent) => (
              <Link href={`/agents/${agent.id}`} key={agent.id}>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer relative">
                  {agent.badge && (
                    <span className={`absolute top-3 right-3 ${agent.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full`}>
                      {agent.badge}
                    </span>
                  )}
                  <div className="p-4 flex gap-3 items-start">
                    <div className={`w-12 h-12 rounded-xl ${agent.bg} flex items-center justify-center text-2xl flex-shrink-0`}>
                      {agent.emoji}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{agent.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{agent.author}</div>
                    </div>
                  </div>
                  <div className="px-4 pb-3">
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{agent.desc}</p>
                    <div className="flex gap-1.5 mt-2.5 flex-wrap">
                      {agent.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-semibold">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-yellow-500">⭐ {agent.rating} <span className="text-gray-400 font-normal">({agent.reviews})</span></div>
                      <div className="text-sm font-extrabold text-gray-900 mt-0.5">₩{agent.price} <span className="text-xs font-normal text-gray-400">/월</span></div>
                    </div>
                    <div className="flex gap-1.5">
                      <button className="px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-500 text-blue-600 hover:bg-blue-50 transition-all">맛보기</button>
                      <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all">구매</button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 전문가 CTA */}
      <section className="mx-10 my-16 rounded-3xl bg-gradient-to-br from-gray-900 to-blue-900 p-14 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-3">🧑‍💼 전문가이신가요?<br />당신의 AI Agent를 판매하세요</h2>
          <p className="text-gray-300 text-sm leading-relaxed">전문 지식을 AI Agent로 패키징하고 수천 개 기업에 공급하세요.<br />등록은 무료, 수익은 최대 70%!</p>
          <div className="flex gap-3 mt-6">
            <Link href="/register">
              <button className="px-6 py-3 bg-orange-500 text-white font-bold rounded-full text-sm hover:opacity-90 transition-all shadow-lg">전문가 등록하기</button>
            </Link>
            <button className="px-6 py-3 border border-white/30 text-white font-semibold rounded-full text-sm hover:bg-white/10 transition-all">판매 가이드 보기</button>
          </div>
        </div>
        <div className="flex gap-10 flex-shrink-0">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-white">월 380만원</div>
            <div className="text-xs text-gray-400 mt-1">평균 전문가 수익</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-white">최대 70%</div>
            <div className="text-xs text-gray-400 mt-1">수익 배분율</div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 px-10 pt-12 pb-8">
        <div className="max-w-5xl mx-auto flex justify-between gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-sm">🤖</div>
              <span className="text-lg font-extrabold text-white">Agentora</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">AI Agent를 맛보고 도입하는<br />B2B 전문 마켓플레이스</p>
          </div>
          <div className="flex gap-14">
            {[
              { title: "서비스", links: [{ label: "Agent 탐색", href: "/agents" }, { label: "카테고리", href: "/agents" }, { label: "전문가 찾기", href: "/register" }, { label: "가격 안내", href: "#" }] },
              { title: "전문가", links: [{ label: "전문가 등록", href: "/register" }, { label: "판매 가이드", href: "#" }, { label: "수익 정산", href: "#" }, { label: "파트너 혜택", href: "#" }] },
              { title: "회사", links: [{ label: "소개", href: "#" }, { label: "블로그", href: "#" }, { label: "고객센터", href: "#" }, { label: "이용약관", href: "#" }] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">{col.title}</h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-xs text-gray-500 hover:text-white transition-colors">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-gray-800 flex justify-between text-xs text-gray-600">
          <span>© 2026 Agentora. All rights reserved.</span>
          <span>개인정보처리방침 · 이용약관</span>
        </div>
      </footer>

    </main>
  );
}