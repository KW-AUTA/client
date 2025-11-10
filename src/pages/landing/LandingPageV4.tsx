import HeaderNav from '../../sections/HeaderNav';
import Hero from '../../sections/Hero';
import ProofValue from '../../sections/ProofValue';
import HowItWorks from '../../sections/HowItWorks';
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
  return (
    <div className="min-h-screen">
      {/* Skip to Content (접근성) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-blue focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:shadow-xl focus:font-bold">
        {translations.accessibility.skipToContent}
      </a>

      {/* Header + Navigation */}
      <HeaderNav />

      {/* Main Content */}
      <main id="main-content" role="main">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Proof & Value */}
        <ProofValue />

        {/* 3. How It Works */}
        <HowItWorks />

        {/* 4. Tutorial */}
        <Tutorial />
      </main>

      {/* 5 & 6. Final CTA + Footer */}
      <FinalCtaFooter />
    </div>
  );
};

export default LandingPageV4;

