import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import translations from '@/locales/ko-v4.json';
import autaLogo from '@/assets/logos/auta-newlogo.svg';

/**
 * v4 Final CTA + Footer (통합 섹션)
 */
export const FinalCtaFooter = () => {
  const { final, footer } = translations;

  return (
    <>
      {/* Final CTA */}
      <section 
        id="final-cta" 
        className="relative py-16 md:py-20 overflow-visible z-20">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          {/* 녹색 배너 */}
          <div className="relative bg-gradient-to-br from-[#5CA585] to-[#4a9a73] rounded-3xl overflow-hidden -mb-28 md:-mb-32 shadow-2xl">
            {/* 배경 패턴 */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* 왼쪽: 텍스트 및 CTA 버튼 */}
                <div className="text-white text-left">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-left">
                    <span>AUTA로</span>
                    <br />
                    <span>내 프로젝트를</span>
                    <br />
                    <span>검증해보세요</span>
                  </h2>
                  <p className="text-sm md:text-base text-white/90 mb-10 leading-relaxed">
                    {final.subtitle}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to={ROUTES.LOGIN}>
                      <button className="bg-white hover:bg-neutral-100 text-[#5CA585] text-base px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-[#5CA585]/20">
                        {final.primary}
                      </button>
                    </Link>
                    <Link to={ROUTES.MANUAL}>
                      <button className="bg-[#5CA585] hover:bg-[#5CA585]/90 text-white border-2 border-white/30 hover:border-white text-base px-8 py-3 rounded-xl font-bold transition-all duration-300">
                        {final.secondary}
                      </button>
                    </Link>
                  </div>
                </div>

                {/* 오른쪽: 일러스트레이션 영역 */}
                <div className="hidden lg:block">
                  <div className="flex items-center justify-center h-full">
                    <div className="relative w-full max-w-md aspect-square">
                      {/* 배경 원형 그라데이션 */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm" />
                      
                      {/* 중앙 일러스트 요소들 */}
                      <div className="relative h-full flex items-center justify-center">
                        {/* 메인 원형 */}
                        <div className="absolute w-48 h-48 bg-white/30 rounded-full blur-xl" />
                        <div className="absolute w-40 h-40 bg-white/40 rounded-full blur-lg" />
                        
                        {/* 아이콘/그래픽 요소들 */}
                        <div className="relative z-10 flex flex-col items-center gap-4">
                          <div className="w-24 h-24 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center border border-white/30">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex gap-2">
                            <div className="w-3 h-3 bg-white/40 rounded-full" />
                            <div className="w-3 h-3 bg-white/60 rounded-full" />
                            <div className="w-3 h-3 bg-white/40 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-40 md:pt-16 pb-8 md:pb-10 relative z-10" role="contentinfo">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          <div className="mb-8 text-center">
            {/* 브랜딩 및 담당자 정보 */}
            <div className="flex flex-col items-center relative">
              <Link to={ROUTES.LANDING} aria-label="AUTA 홈" className="inline-block relative z-10 overflow-hidden" style={{ height: '200px' }}>
                <img src={autaLogo} alt="AUTA" className="w-auto" style={{ display: 'block', height: '280px', objectFit: 'cover', objectPosition: 'top' }} />
              </Link>
              
              {/* 담당자 정보 - 로고 하단에 겹치도록 */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-nowrap justify-center items-center gap-1.5 md:gap-2 z-20 whitespace-nowrap" style={{ bottom: '-8px' }}>
                <span className="text-sm text-neutral-700">
                  <span className="text-neutral-500">백엔드/인프라</span>
                  <span className="ml-1 font-medium text-neutral-900">오준혁</span>
                  <span className="mx-2 text-neutral-300">|</span>
                </span>
                <span className="text-sm text-neutral-700">
                  <span className="text-neutral-500">AI 모델링</span>
                  <span className="ml-1 font-medium text-neutral-900">송인섭</span>
                  <span className="mx-2 text-neutral-300">|</span>
                </span>
                <span className="text-sm text-neutral-700">
                  <span className="text-neutral-500">프론트엔드/디자인</span>
                  <span className="ml-1 font-medium text-neutral-900">최현준</span>
                  <span className="mx-2 text-neutral-300">|</span>
                </span>
                <span className="text-sm text-neutral-700">
                  <span className="text-neutral-500">프론트엔드/디자인</span>
                  <span className="ml-1 font-medium text-neutral-900">홍유진</span>
                </span>
              </div>
            </div>

            <div className="mt-4 md:mt-20 text-center flex flex-col items-center">
              <p className="text-sm text-neutral-600 mb-2">
                {footer.copyright}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
                <a href="#" className="hover:text-neutral-900 transition-colors">이용약관</a>
                <span className="text-neutral-300">|</span>
                <a href="#" className="hover:text-neutral-900 transition-colors">개인정보처리방침</a>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-6">
            <div className="text-sm text-neutral-600 text-center">
              <p>{footer.university}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FinalCtaFooter;

