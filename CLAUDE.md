@AGENTS.md

## 디자인 규칙 (2026 리뉴얼)

### 색상 팔레트 (이 외 색상 신규 추가 금지)
- #0F1B2E 잉크 네이비 — 텍스트, 히어로 배경, 보조 버튼
- #FF5C1A 액션 오렌지 — 주요 CTA, 강조 단어. 한 화면당 최대 2개
- #F6F3EE 웜 샌드 — 섹션 배경 (순백 대신)
- #E8E6E1 — 모든 테두리와 구분선
- #5F5E5A — 본문 보조 텍스트

### 금지 사항
- 그라데이션 일체 (텍스트, 배경 모두)
- 이모지를 아이콘으로 사용 (lucide-react 아웃라인만 허용)
- box-shadow (0.5px solid 테두리로 대체)
- Tailwind 기본 팔레트 직접 사용 (blue-600, slate-50, gray-100 등)
- rounded-full / border-radius 9999px

### 필수 규칙
- 버튼 border-radius 8px
- 버튼 최소 높이: 일반 44px, /smb 경로는 48px
- 한글 제목에 letter-spacing -0.03em 필수
- 제목 font-weight 500 (700 사용 금지)
- 본문 최소 16px (/smb 경로는 필수)
- 카피(문구) 텍스트는 어떤 경우에도 임의 수정 금지
