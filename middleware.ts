import { NextRequest, NextResponse } from 'next/server'

// IP별 요청 횟수 저장
const rateLimit = new Map<string, { count: number; resetTime: number }>()

// 설정
const LIMIT = 60        // 최대 요청 횟수
const WINDOW = 60000    // 시간 단위 (1분 = 60000ms)

function getRateLimitInfo(ip: string) {
  const now = Date.now()
  const record = rateLimit.get(ip)

  // 처음 요청이거나 시간 초과된 경우 초기화
  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + WINDOW })
    return { count: 1, limited: false }
  }

  // 요청 횟수 증가
  record.count++
  rateLimit.set(ip, record)

  return {
    count: record.count,
    limited: record.count > LIMIT
  }
}

export function middleware(request: NextRequest) {
  // API 요청만 Rate Limit 적용
  if (!request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // IP 가져오기
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'

  const { limited, count } = getRateLimitInfo(ip)

  // 한도 초과시 차단
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

  // 정상 요청
  const response = NextResponse.next()
  response.headers.set('X-RateLimit-Limit', LIMIT.toString())
  response.headers.set('X-RateLimit-Remaining', (LIMIT - count).toString())
  return response
}

export const config = {
  matcher: '/api/:path*'
}