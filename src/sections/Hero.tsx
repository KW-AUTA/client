import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { PlayCircle } from 'lucide-react';
import { ROUTES } from '@/constants';
import Badge from '../components/atoms/Badge';
import translations from '@/locales/ko-v4.json';
import ProjectIcon from '@/assets/icons/dash-project.svg?react';
import TestIcon from '@/assets/icons/dash-projecting.svg?react';
import IncompleteIcon from '@/assets/icons/dash-test.svg?react';

/**
 * v4 Hero 섹션 (Above the fold, Floating Glass 위젯 포함)
 * 스크롤 뉘앙스 + 글래스모피즘 대시보드 위젯
 */
export const Hero = () => {
  const { hero } = translations;
  const [isVisible, setIsVisible] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 초기 로드 시 즉시 표시
    setIsVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.01 }
    );

    if (dashboardRef.current) {
      observer.observe(dashboardRef.current);
    }

    return () => {
      if (dashboardRef.current) {
        observer.unobserve(dashboardRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-24 pb-32"
      style={{
        background: 'linear-gradient(135deg, #F7FBF8 0%, #E8F5E9 50%, #F0F8F1 100%)'
      }}>
      
      {/* 배경 블러 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-sage/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1120px] mx-auto px-5 md:px-8 py-20 w-full">
        <div className="text-center max-w-4xl mx-auto relative w-full">
          {/* Badges (2개) */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Badge variant="brand" className="inline-flex">
              {hero.badge1}
            </Badge>
            <Badge variant="brand" className="inline-flex">
              {hero.badge2}
            </Badge>
          </div>

          {/* 메인 헤드라인 */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
            {hero.title}
          </h1>

          {/* 서브헤드라인 (3줄) */}
          <div className="text-lg md:text-xl text-neutral-700 mb-10 leading-relaxed max-w-3xl mx-auto space-y-3">
            <p>{hero.subtitle}</p>
            <p>{hero.subtitle2}</p>
            <p className="font-semibold text-neutral-900">{hero.subtitle3}</p>
          </div>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link to={ROUTES.LOGIN}>
              <button className="bg-brand-blue hover:bg-brand-blue/90 text-white text-lg px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
                {hero.primary}
              </button>
            </Link>
            <a href="#video-tutorial">
              <button className="flex items-center space-x-2 text-brand-blue hover:text-brand-blue/80 text-lg font-medium transition-colors">
                <PlayCircle className="w-6 h-6" />
                <span>{hero.secondary}</span>
              </button>
            </a>
          </div>

          {/* 실제 대시보드 위젯 (스크롤 뉘앙스 - 실제 대시보드 스타일) */}
          <div 
            ref={dashboardRef}
            className={`relative w-full max-w-5xl mx-auto mt-20 mb-12 hidden md:block transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Overview 카드 3개 (실제 대시보드 스타일) */}
            <div className={`flex justify-center gap-8 mb-12 transition-all duration-700 delay-100 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {/* 진행 중인 프로젝트 */}
              <div className="flex flex-col items-center md:items-start justify-between w-full max-w-[322px] min-w-[180px] h-[219px] px-8 py-6 rounded-[20px] bg-[#F5F5F5] shadow-[0_0_4px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] z-30 transform translate-y-[-8px]">
                <div className="mb-0 flex items-center justify-center w-16 h-16 rounded-[16px] bg-[#D5B8D5]">
                  <ProjectIcon width={40} height={40} />
                </div>
                <div className="text-[16px] font-bold text-[#191919]">진행 중인 프로젝트 수</div>
                <div className="flex items-end">
                  <span className="text-[48px] font-extrabold text-[#191919] leading-none">4</span>
                  <span className="text-[18px] font-bold ml-1 text-[#191919]">개</span>
                </div>
              </div>

              {/* 완료된 테스트 */}
              <div className="flex flex-col items-center md:items-start justify-between w-full max-w-[322px] min-w-[180px] h-[219px] px-8 py-6 rounded-[20px] bg-[#F5F5F5] shadow-[0_0_4px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] z-20">
                <div className="mb-0 flex items-center justify-center w-16 h-16 rounded-[16px] bg-[#D5B8D5]">
                  <TestIcon width={40} height={40} />
                </div>
                <div className="text-[16px] font-bold text-[#191919]">완료된 테스트 수</div>
                <div className="flex items-end">
                  <span className="text-[48px] font-extrabold text-[#191919] leading-none">160</span>
                  <span className="text-[18px] font-bold ml-1 text-[#191919]">개</span>
                </div>
              </div>

              {/* 미완료된 테스트 */}
              <div className="flex flex-col items-center md:items-start justify-between w-full max-w-[322px] min-w-[180px] h-[219px] px-8 py-6 rounded-[20px] bg-[#F5F5F5] shadow-[0_0_4px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] z-10 transform translate-y-[8px]">
                <div className="mb-0 flex items-center justify-center w-16 h-16 rounded-[16px] bg-[#D5B8D5]">
                  <IncompleteIcon width={40} height={40} />
                </div>
                <div className="text-[16px] font-bold text-[#191919]">미완료된 테스트 수</div>
                <div className="flex items-end">
                  <span className="text-[48px] font-extrabold text-[#191919] leading-none">0</span>
                  <span className="text-[18px] font-bold ml-1 text-[#191919]">개</span>
                </div>
              </div>
            </div>

            {/* 프로젝트 관리 테이블 (실제 대시보드 스타일) */}
            <div className={`mb-8 transition-all duration-700 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="text-[22px] font-extrabold text-[#222] mb-6">프로젝트 관리</div>
              <div className="bg-white rounded-[10px] shadow-[0_0_4px_rgba(0,0,0,0.25)] overflow-hidden">
                {/* 테이블 헤더 */}
                <div className="grid grid-cols-4 bg-background shadow-custom rounded-t-[10px] p-4 gap-4">
                  <div className="font-bold text-typography-dark text-14 text-center">프로젝트 명</div>
                  <div className="font-bold text-typography-dark text-14 text-center">프로젝트 관리자</div>
                  <div className="font-bold text-typography-dark text-14 text-center">마감일</div>
                  <div className="font-bold text-typography-dark text-14 text-center">진행 상태</div>
                </div>
                {/* 테이블 바디 */}
                <div className="space-y-0">
                  <div className="bg-white grid grid-cols-4 p-4 hover:bg-button-hover transition-colors border-t border-gray-100">
                    <div className="text-center font-medium text-typography-dark text-11">AUTA 테스트 프로젝트</div>
                    <div className="text-center font-medium text-typography-dark text-11">테스트유저</div>
                    <div className="text-center font-medium text-typography-dark text-11">2025-11-29</div>
                    <div className="text-center font-medium text-typography-dark text-11">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                      완료
                    </div>
                  </div>
                  <div className="bg-white grid grid-cols-4 p-4 hover:bg-button-hover transition-colors border-t border-gray-100">
                    <div className="text-center font-medium text-typography-dark text-11">Jane의 프로젝트</div>
                    <div className="text-center font-medium text-typography-dark text-11">테스트유저</div>
                    <div className="text-center font-medium text-typography-dark text-11">2025-11-14</div>
                    <div className="text-center font-medium text-typography-dark text-11">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                      완료
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 테스트 관리 테이블 (실제 대시보드 스타일) */}
            <div className={`transition-all duration-700 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="text-[22px] font-extrabold text-[#222] mb-6">테스트 관리</div>
              <div className="bg-white rounded-[10px] shadow-[0_0_4px_rgba(0,0,0,0.25)] overflow-hidden">
                {/* 테이블 헤더 */}
                <div className="grid grid-cols-4 bg-background shadow-custom rounded-t-[10px] p-4 gap-4">
                  <div className="font-bold text-typography-dark text-14 text-center">프로젝트 명</div>
                  <div className="font-bold text-typography-dark text-14 text-center">테스트 유형</div>
                  <div className="font-bold text-typography-dark text-14 text-center">성공 여부</div>
                  <div className="font-bold text-typography-dark text-14 text-center">페이지 명</div>
                </div>
                {/* 테이블 바디 */}
                <div className="space-y-0">
                  <div className="bg-white grid grid-cols-4 p-4 hover:bg-button-hover transition-colors border-t border-gray-100">
                    <div className="text-center font-medium text-typography-dark text-11">광운대 홈페이지 프로젝트</div>
                    <div className="text-center font-medium text-typography-dark text-11">
                      <span className="inline-flex items-center font-bold">
                        <span className="w-3 h-3 rounded-sm mr-2 bg-yellow-400"></span>
                        MAPPING
                      </span>
                    </div>
                    <div className="text-center font-medium text-typography-dark text-11">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                      실패
                    </div>
                    <div className="text-center font-medium text-typography-dark text-11">산학협력단</div>
                  </div>
                  <div className="bg-white grid grid-cols-4 p-4 hover:bg-button-hover transition-colors border-t border-gray-100">
                    <div className="text-center font-medium text-typography-dark text-11">광운대 홈페이지 프로젝트</div>
                    <div className="text-center font-medium text-typography-dark text-11">
                      <span className="inline-flex items-center font-bold">
                        <span className="w-3 h-3 rounded-sm mr-2 bg-yellow-400"></span>
                        MAPPING
                      </span>
                    </div>
                    <div className="text-center font-medium text-typography-dark text-11">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                      통과
                    </div>
                    <div className="text-center font-medium text-typography-dark text-11">산학협력단</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 모바일용 간단한 통계 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto md:hidden">
            <div className="flex flex-col items-center justify-between w-full h-[200px] px-6 py-6 rounded-[20px] bg-[#F5F5F5] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
              <div className="mb-0 flex items-center justify-center w-16 h-16 rounded-[16px] bg-[#D5B8D5]">
                <ProjectIcon width={40} height={40} />
              </div>
              <div className="text-[12px] font-bold text-[#191919]">{hero.stats.testsDone.label}</div>
              <div className="flex items-end">
                <span className="text-[40px] font-extrabold text-[#191919] leading-none">4</span>
                <span className="text-[14px] font-bold ml-1 text-[#191919]">개</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between w-full h-[200px] px-6 py-6 rounded-[20px] bg-[#F5F5F5] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
              <div className="mb-0 flex items-center justify-center w-16 h-16 rounded-[16px] bg-[#D5B8D5]">
                <TestIcon width={40} height={40} />
              </div>
              <div className="text-[12px] font-bold text-[#191919]">{hero.stats.dailyVisitors.label}</div>
              <div className="flex items-end">
                <span className="text-[40px] font-extrabold text-[#191919] leading-none">160</span>
                <span className="text-[14px] font-bold ml-1 text-[#191919]">개</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between w-full h-[200px] px-6 py-6 rounded-[20px] bg-[#F5F5F5] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
              <div className="mb-0 flex items-center justify-center w-16 h-16 rounded-[16px] bg-[#D5B8D5]">
                <IncompleteIcon width={40} height={40} />
              </div>
              <div className="text-[12px] font-bold text-[#191919]">{hero.stats.avgTime.label}</div>
              <div className="flex items-end">
                <span className="text-[40px] font-extrabold text-[#191919] leading-none">0</span>
                <span className="text-[14px] font-bold ml-1 text-[#191919]">개</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
