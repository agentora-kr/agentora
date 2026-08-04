import { NextRequest, NextResponse } from 'next/server'

/* ─── Rate Limit 설정 ─── */
const rateLimit = new Map<string, { count: number; resetTime: number }>()
const LIMIT = 60
const WINDOW = 60000

/* ─── 보수중 설정 ─── */
const MAINTENANCE_MODE = true   // 대공사 끝나면 false로만 바꾸면 됩니다

// 보수 기간에도 열어둘 경로
const ALLOWED_PATHS = [
  '/agents/24',       // 히비카 등 고객사 전용 링크
  '/api',          // chat-proxy 등 (막으면 에이전트 작동 불가)
  '/maintenance',  // 보수중 페이지 자체
]

function getRateLimitInfo(ip: string) {
  const now = Date.now()
  const record = rateLimit.get(ip)

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + WINDOW })
    return { count: 1, limited: false }
  }

  record.count++
  rateLimit.set(ip, record)

  return {
    count: record.count,
    limited: record.count > LIMIT
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  /* ── 1. API 요청: Rate Limit 적용 ── */
  if (pathname.startsWith('/api')) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'

    const { limited, count } = getRateLimitInfo(ip)

    if (limited) {
      return NextResponse.json(
        { error: '요청이 너무 많아요. 잠시 후 다시 시도해주세요.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': LIMIT.toString(),
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60',
          }
        }
      )
    }

    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit', LIMIT.toString())
    response.headers.set('X-RateLimit-Remaining', (LIMIT - count).toString())
    return response
  }

  /* ── 2. 페이지 요청: 보수중이면 차단 ── */
  if (MAINTENANCE_MODE) {
    const allowed = ALLOWED_PATHS.some((p) => pathname.startsWith(p))
    if (!allowed) {
      return NextResponse.rewrite(new URL('/maintenance', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.).*)'],
}