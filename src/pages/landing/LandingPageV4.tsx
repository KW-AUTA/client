import HeaderNav from '../../sections/HeaderNav';
import Hero from '../../sections/Hero';
import IntroSummary from '../../sections/IntroSummary';
import TechnicalFeatures from '../../sections/TechnicalFeatures';
import OperatingStructure from '../../sections/OperatingStructure';
import Tutorial from '../../sections/Tutorial';
import FinalCtaFooter from '../../sections/FinalCtaFooter';
import translations from '@/locales/ko-v4.json';

/**
 * AUTA v4 Landing Page (Lean Glass Startup · Evidence-Only)
 * 
 * 핵심 원칙:
 * - 거짓정보 금지 (AUTA 포스터 근거만)
 * - 6개 섹션만
 * - Glass morphism 디자인
 * - 유튜브 링크 고정: https://youtu.be/c4ozICaCZWA
 */
const LandingPageV4 = () => {
  const neutralBg = '#f8faf9';
  const neutralLight = '#e9f3ef';

  return (
    <div 
      className="min-h-screen relative"
      style={{
        background: `linear-gradient(135deg, ${neutralBg} 0%, ${neutralLight} 50%, ${neutralBg} 100%)`
      }}>
      {/* 전체 배경 블러 효과 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#5CA585]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#5CA585]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#5CA585]/10 rounded-full blur-3xl" />
      </div>
      {/* Skip to Content (접근성) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-blue focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:shadow-xl focus:font-bold">
        {translations.accessibility.skipToContent}
      </a>

      {/* Header + Navigation */}
      <div className="relative z-50">
        <HeaderNav />
      </div>

              {/* Main Content */}
              <main id="main-content" role="main" className="relative z-0">
                {/* 1. Hero */}
                <Hero />

                {/* 2. Intro Summary - 서론 요약 */}
                <IntroSummary />

                {/* 3. Technical Features - 기술적 특징 */}
                <TechnicalFeatures />

                {/* 4. Operating Structure - 작동 구조 */}
                <OperatingStructure />

                {/* 5. Tutorial */}
                <Tutorial />
      </main>

      {/* 5 & 6. Final CTA + Footer */}
      <div className="relative z-10">
        <FinalCtaFooter />
      </div>
    </div>
  );
};

export default LandingPageV4;

