# AUTA 랜딩페이지

현대적이고 반응형인 AUTA 랜딩페이지입니다. 4개 섹션으로 구성되어 있으며, 각 섹션은 재사용 가능한 컴포넌트로 분리되어 있습니다.

## 구조

```
src/pages/landing/
├── LandingPage.tsx          # 메인 랜딩페이지
├── _components/             # 재사용 가능한 컴포넌트들
│   ├── index.ts            # 컴포넌트 export
│   ├── Navigation.tsx      # 네비게이션 바
│   ├── HeroSection.tsx     # 히어로 섹션
│   ├── HowItWorksSection.tsx # 작동 방식 섹션
│   ├── AboutSection.tsx    # 팀 소개 및 FAQ 섹션
│   ├── FinalCTASection.tsx # 최종 CTA 섹션
│   ├── Footer.tsx          # 푸터
│   ├── AnimatedCard.tsx    # 애니메이션 카드 컴포넌트
│   └── FeatureBadge.tsx    # 기능 태그 컴포넌트
└── README.md               # 이 파일
```

## 컴포넌트 설명

### Navigation
- 스크롤 시 배경이 투명에서 반투명으로 변경
- AUTA 로고와 CTA 버튼 포함
- 반응형 디자인

### HeroSection
- 메인 메시지와 시각적 애니메이션
- 스크롤 애니메이션과 호버 효과
- 문제 제기와 해결책 제시

### HowItWorksSection
- 3단계 프로세스 설명
- 자동으로 활성화되는 단계 표시
- YouTube 영상 포함
- FeatureBadge 컴포넌트 사용

### AboutSection
- 팀 소개와 FAQ
- 그리드 레이아웃으로 구성
- 재사용 가능한 데이터 구조

### FinalCTASection
- 최종 행동 유도 섹션
- 그라데이션 배경
- 큰 CTA 버튼

### Footer
- 로고, 저작권, 링크 포함
- 반응형 레이아웃

## 사용법

### 기본 사용
```tsx
import LandingPage from '@/pages/landing/LandingPage';

// 라우터에서 사용
<Route path="/" element={<LandingPage />} />
```

### 개별 컴포넌트 사용
```tsx
import { HeroSection, HowItWorksSection } from '@/pages/landing/_components';

// 커스텀 데이터로 사용
<HowItWorksSection 
  steps={customSteps}
  videoUrl="https://example.com/video"
/>
```

### FeatureBadge 사용
```tsx
import { FeatureBadge } from '@/pages/landing/_components';

<FeatureBadge 
  text="No-Code" 
  variant="primary" 
  size="md" 
/>
```

## 애니메이션

- CSS 애니메이션과 Tailwind 클래스 사용
- 스크롤 기반 애니메이션
- 호버 효과와 전환 애니메이션
- 자동 재생 애니메이션 (HowItWorksSection)

## 반응형 디자인

- 모바일 우선 접근법
- Tailwind CSS 브레이크포인트 사용
- 유연한 그리드 시스템
- 터치 친화적 인터랙션

## 커스터마이징

각 컴포넌트는 props를 통해 커스터마이징할 수 있습니다:

```tsx
// AboutSection 커스터마이징
<AboutSection 
  title="커스텀 제목"
  description="커스텀 설명"
  faqs={customFaqs}
  teamMembers={customTeamMembers}
/>

// FinalCTASection 커스터마이징
<FinalCTASection 
  title="커스텀 CTA 제목"
  buttonText="커스텀 버튼 텍스트"
  buttonLink="/custom-link"
/>
```

## 성능 최적화

- Lazy loading 사용
- Suspense로 배경 컴포넌트 처리
- 이미지 최적화
- CSS 애니메이션 사용으로 GPU 가속

## 접근성

- 시맨틱 HTML 구조
- 키보드 네비게이션 지원
- 스크린 리더 친화적
- 색상 대비 고려 