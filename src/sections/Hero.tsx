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

          {/* 실제 대시보드 위젯 (스크롤 뉘앙스 - 실제 AUTA 서비스 내용, 중앙 집중 겹침) */}
          <div 
            ref={dashboardRef}
            className={`relative w-full max-w-5xl mx-auto mt-20 mb-12 hidden md:block h-[500px] transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Overview 카드 2개 (상단 중앙, 거의 완전히 겹침) */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 flex transition-all duration-700 delay-100 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {/* 진행 중인 프로젝트 */}
              <div className="flex flex-col items-center md:items-start justify-between w-[180px] h-[160px] px-5 py-4 rounded-[20px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)] z-30 transform translate-y-[-8px] translate-x-[-30px] rotate-[-3deg]">
                <div className="mb-0 flex items-center justify-center w-12 h-12 rounded-[16px] bg-[#D5B8D5]">
                  <ProjectIcon width={30} height={30} />
                </div>
                <div className="text-[12px] font-bold text-[#191919]">진행 중인 프로젝트</div>
                <div className="flex items-end">
                  <span className="text-[32px] font-extrabold text-[#191919] leading-none">4</span>
                  <span className="text-[14px] font-bold ml-1 text-[#191919]">개</span>
                </div>
              </div>

              {/* 완료된 테스트 */}
              <div className="flex flex-col items-center md:items-start justify-between w-[180px] h-[160px] px-5 py-4 rounded-[20px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)] z-40 transform translate-y-[8px] translate-x-[30px] rotate-[3deg]">
                <div className="mb-0 flex items-center justify-center w-12 h-12 rounded-[16px] bg-[#D5B8D5]">
                  <TestIcon width={30} height={30} />
                </div>
                <div className="text-[12px] font-bold text-[#191919]">완료된 테스트</div>
                <div className="flex items-end">
                  <span className="text-[32px] font-extrabold text-[#191919] leading-none">160</span>
                  <span className="text-[14px] font-bold ml-1 text-[#191919]">개</span>
                </div>
              </div>
            </div>

            {/* LLM UX/UI 평가 결과 (좌측 상단, 중앙으로 더 가깝게) */}
            <div className={`absolute top-8 left-1/2 -translate-x-[280px] bg-white rounded-[15px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] w-48 z-50 transform translate-x-[-15px] translate-y-[-10px] rotate-[2deg] transition-all duration-700 delay-200 ${
              isVisible ? 'translate-x-[-15px] translate-y-[-10px] opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <p className="text-xs font-bold text-[#191919] mb-3 px-4 pt-4">LLM UX/UI 평가</p>
              <div className="flex flex-col items-center justify-center gap-2 border-[#97AF8F] border-2 bg-[#97AF8F]/30 mx-4 mb-4 aspect-square">
                <p className="font-bold text-[36px] text-[#3C69EE]">85</p>
                <div className="text-xs flex flex-col items-center">
                  <p className="font-bold">점수</p>
                  <p className="text-[#8c8c8c]">100점 만점</p>
                </div>
              </div>
            </div>

            {/* 테스트 결과 막대 그래프 (중앙 상단, Overview 카드 바로 아래 겹침) */}
            <div className={`absolute top-24 left-1/2 -translate-x-1/2 bg-white rounded-[15px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-5 w-64 z-35 transform translate-y-[0px] rotate-[-1deg] transition-all duration-700 delay-300 ${
              isVisible ? 'translate-y-[0px] opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-xs font-bold text-[#191919] mb-4">테스트 결과</p>
              <div className="space-y-3">
                {/* ROUTING */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-[#191919]">ROUTING</span>
                    <span className="text-xs font-bold text-[#191919]">100%</span>
                  </div>
                  <div className="h-3 bg-[#DDDDDD] rounded-full overflow-hidden">
                    <div className="h-full bg-[#4ECDC4] rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                {/* INTERACTION */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-[#191919]">INTERACTION</span>
                    <span className="text-xs font-bold text-[#191919]">80%</span>
                  </div>
                  <div className="h-3 bg-[#DDDDDD] rounded-full overflow-hidden">
                    <div className="h-full bg-[#9991F4] rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                {/* COMPONENT */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-[#191919]">COMPONENT</span>
                    <span className="text-xs font-bold text-[#191919]">90%</span>
                  </div>
                  <div className="h-3 bg-[#DDDDDD] rounded-full overflow-hidden">
                    <div className="h-full bg-[#C9A961] rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 원형 진행률 바 - Test Statistics (우측 상단, 중앙으로 더 가깝게) */}
            <div className={`absolute top-8 left-1/2 translate-x-[280px] bg-white rounded-[15px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-5 w-56 z-50 transform translate-x-[15px] translate-y-[-10px] rotate-[2deg] transition-all duration-700 delay-400 ${
              isVisible ? 'translate-x-[15px] translate-y-[-10px] opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              <p className="text-xs font-bold text-[#191919] mb-3">테스트 통계</p>
              <div className="grid grid-cols-2 gap-3">
                {/* TOTAL */}
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-2">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#DDDDDD" strokeWidth="6" />
                      <circle 
                        cx="32" 
                        cy="32" 
                        r="28" 
                        fill="none" 
                        stroke="#E48989" 
                        strokeWidth="6"
                        strokeDasharray="176"
                        strokeDashoffset="19"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#191919]">89%</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#191919]">TOTAL</span>
                </div>
                {/* ROUTING */}
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-2">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#DDDDDD" strokeWidth="6" />
                      <circle 
                        cx="32" 
                        cy="32" 
                        r="28" 
                        fill="none" 
                        stroke="#4ECDC4" 
                        strokeWidth="6"
                        strokeDasharray="176"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#191919]">100%</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#191919]">ROUTING</span>
                </div>
                {/* INTERACTION */}
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-2">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#DDDDDD" strokeWidth="6" />
                      <circle 
                        cx="32" 
                        cy="32" 
                        r="28" 
                        fill="none" 
                        stroke="#9991F4" 
                        strokeWidth="6"
                        strokeDasharray="176"
                        strokeDashoffset="35"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#191919]">80%</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#191919]">INTERACTION</span>
                </div>
                {/* COMPONENT */}
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-2">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#DDDDDD" strokeWidth="6" />
                      <circle 
                        cx="32" 
                        cy="32" 
                        r="28" 
                        fill="none" 
                        stroke="#C9A961" 
                        strokeWidth="6"
                        strokeDasharray="176"
                        strokeDashoffset="18"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#191919]">90%</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#191919]">COMPONENT</span>
                </div>
              </div>
            </div>

            {/* 프로젝트 관리 테이블 (좌측 하단, 중앙으로 더 가깝게) */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-[320px] bg-white rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] w-64 z-40 transform translate-x-[-15px] translate-y-[10px] rotate-[-2deg] transition-all duration-700 delay-500 ${
              isVisible ? 'translate-x-[-15px] translate-y-[10px] opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="text-xs font-extrabold text-[#222] mb-2 px-3 pt-3">프로젝트 관리</div>
              <div className="overflow-hidden">
                <div className="grid grid-cols-2 bg-background shadow-custom rounded-t-[10px] p-2 gap-2 text-[10px]">
                  <div className="font-bold text-typography-dark text-center">프로젝트 명</div>
                  <div className="font-bold text-typography-dark text-center">상태</div>
                </div>
                <div className="space-y-0">
                  <div className="bg-white grid grid-cols-2 p-2 hover:bg-button-hover transition-colors border-t border-gray-100 text-[10px]">
                    <div className="text-center font-medium text-typography-dark truncate">AUTA 테스트</div>
                    <div className="text-center font-medium text-typography-dark">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                      완료
                    </div>
                  </div>
                  <div className="bg-white grid grid-cols-2 p-2 hover:bg-button-hover transition-colors border-t border-gray-100 text-[10px]">
                    <div className="text-center font-medium text-typography-dark truncate">Jane의 프로젝트</div>
                    <div className="text-center font-medium text-typography-dark">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                      완료
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 테스트 관리 테이블 (중앙 하단, 다른 위젯과 겹침) */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] w-80 z-30 transform translate-y-[0px] rotate-[-1deg] transition-all duration-700 delay-600 ${
              isVisible ? 'translate-y-[0px] opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="text-xs font-extrabold text-[#222] mb-2 px-3 pt-3">테스트 관리</div>
              <div className="overflow-hidden">
                <div className="grid grid-cols-3 bg-background shadow-custom rounded-t-[10px] p-2 gap-2 text-[10px]">
                  <div className="font-bold text-typography-dark text-center">프로젝트 명</div>
                  <div className="font-bold text-typography-dark text-center">유형</div>
                  <div className="font-bold text-typography-dark text-center">성공 여부</div>
                </div>
                <div className="space-y-0">
                  <div className="bg-white grid grid-cols-3 p-2 hover:bg-button-hover transition-colors border-t border-gray-100 text-[10px]">
                    <div className="text-center font-medium text-typography-dark truncate">광운대 홈페이지</div>
                    <div className="text-center font-medium text-typography-dark">
                      <span className="inline-flex items-center font-bold">
                        <span className="w-2 h-2 rounded-sm mr-1 bg-yellow-400"></span>
                        MAPPING
                      </span>
                    </div>
                    <div className="text-center font-medium text-typography-dark">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></span>
                      실패
                    </div>
                  </div>
                  <div className="bg-white grid grid-cols-3 p-2 hover:bg-button-hover transition-colors border-t border-gray-100 text-[10px]">
                    <div className="text-center font-medium text-typography-dark truncate">광운대 홈페이지</div>
                    <div className="text-center font-medium text-typography-dark">
                      <span className="inline-flex items-center font-bold">
                        <span className="w-2 h-2 rounded-sm mr-1 bg-yellow-400"></span>
                        MAPPING
                      </span>
                    </div>
                    <div className="text-center font-medium text-typography-dark">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                      통과
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 테스트 세부 관리 - 이슈 카드 (우측 하단, 중앙으로 더 가깝게) */}
            <div className={`absolute bottom-0 left-1/2 translate-x-[320px] bg-white rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] w-64 z-50 transform translate-x-[15px] translate-y-[10px] rotate-[2deg] transition-all duration-700 delay-700 ${
              isVisible ? 'translate-x-[15px] translate-y-[10px] opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="text-xs font-extrabold text-[#222] mb-2 px-3 pt-3">컴포넌트 이슈</div>
              <div className="px-3 pb-3 space-y-2">
                <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                  <div className="text-[10px] font-bold text-red-800 mb-1">X, Y 좌표 오차</div>
                  <div className="text-[9px] text-red-700">컴포넌트 이름: 협력기관1</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                  <div className="text-[10px] font-bold text-blue-800 mb-1">해결 제안</div>
                  <div className="text-[9px] text-blue-700">Figma 프레임 확인 필요</div>
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
