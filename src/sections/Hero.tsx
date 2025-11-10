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

          {/* 실제 대시보드 위젯 (스크롤 뉘앙스 - 뭉쳐진 레이아웃 + 그래프) */}
          <div 
            ref={dashboardRef}
            className={`relative w-full max-w-6xl mx-auto mt-20 mb-12 hidden md:block h-[650px] transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Overview 카드 3개 (상단 중앙, 겹쳐짐) */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 flex gap-3 transition-all duration-700 delay-100 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {/* 진행 중인 프로젝트 */}
              <div className="flex flex-col items-center md:items-start justify-between w-[200px] h-[180px] px-6 py-5 rounded-[20px] bg-[#F5F5F5] shadow-[0_0_4px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] z-30 transform translate-y-[-10px] rotate-[-1deg]">
                <div className="mb-0 flex items-center justify-center w-14 h-14 rounded-[16px] bg-[#D5B8D5]">
                  <ProjectIcon width={35} height={35} />
                </div>
                <div className="text-[14px] font-bold text-[#191919]">진행 중인 프로젝트</div>
                <div className="flex items-end">
                  <span className="text-[36px] font-extrabold text-[#191919] leading-none">4</span>
                  <span className="text-[16px] font-bold ml-1 text-[#191919]">개</span>
                </div>
              </div>

              {/* 완료된 테스트 */}
              <div className="flex flex-col items-center md:items-start justify-between w-[200px] h-[180px] px-6 py-5 rounded-[20px] bg-[#F5F5F5] shadow-[0_0_4px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] z-40">
                <div className="mb-0 flex items-center justify-center w-14 h-14 rounded-[16px] bg-[#D5B8D5]">
                  <TestIcon width={35} height={35} />
                </div>
                <div className="text-[14px] font-bold text-[#191919]">완료된 테스트</div>
                <div className="flex items-end">
                  <span className="text-[36px] font-extrabold text-[#191919] leading-none">160</span>
                  <span className="text-[16px] font-bold ml-1 text-[#191919]">개</span>
                </div>
              </div>

              {/* 미완료된 테스트 */}
              <div className="flex flex-col items-center md:items-start justify-between w-[200px] h-[180px] px-6 py-5 rounded-[20px] bg-[#F5F5F5] shadow-[0_0_4px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] z-30 transform translate-y-[10px] rotate-[1deg]">
                <div className="mb-0 flex items-center justify-center w-14 h-14 rounded-[16px] bg-[#D5B8D5]">
                  <IncompleteIcon width={35} height={35} />
                </div>
                <div className="text-[14px] font-bold text-[#191919]">미완료 테스트</div>
                <div className="flex items-end">
                  <span className="text-[36px] font-extrabold text-[#191919] leading-none">0</span>
                  <span className="text-[16px] font-bold ml-1 text-[#191919]">개</span>
                </div>
              </div>
            </div>

            {/* 통계 위젯 4개 (좌측 상단, 겹쳐짐) */}
            <div className={`absolute top-24 left-0 transition-all duration-700 delay-200 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <div className="bg-white rounded-[10px] shadow-[0_0_4px_rgba(0,0,0,0.25)] p-4 w-48 mb-3 z-20 transform rotate-[-1deg]">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-[#191919]">Total Users</p>
                  <span className="text-xs text-green-600 font-bold">+1.2%</span>
                </div>
                <p className="text-xl font-bold text-[#191919]">332</p>
              </div>
              <div className="bg-white rounded-[10px] shadow-[0_0_4px_rgba(0,0,0,0.25)] p-4 w-48 mb-3 z-30 transform translate-x-4 translate-y-[-8px] rotate-[1deg]">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-[#191919]">New Users</p>
                  <span className="text-xs text-red-600 font-bold">-0.5%</span>
                </div>
                <p className="text-xl font-bold text-[#191919]">162</p>
              </div>
              <div className="bg-white rounded-[10px] shadow-[0_0_4px_rgba(0,0,0,0.25)] p-4 w-48 mb-3 z-20 transform rotate-[-1deg]">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-[#191919]">Avg. Time</p>
                  <span className="text-xs text-green-600 font-bold">+0.8%</span>
                </div>
                <p className="text-lg font-bold text-[#191919]">13:12</p>
              </div>
              <div className="bg-white rounded-[10px] shadow-[0_0_4px_rgba(0,0,0,0.25)] p-4 w-48 z-30 transform translate-x-4 translate-y-[-8px] rotate-[1deg]">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-[#191919]">Revenue</p>
                  <span className="text-xs text-red-600 font-bold">-0.2%</span>
                </div>
                <p className="text-xl font-bold text-[#191919]">$6.18K</p>
              </div>
            </div>

            {/* 도넛 차트 - Conversion Rate (우측 상단, 겹쳐짐) */}
            <div className={`absolute top-24 right-0 bg-white rounded-[10px] shadow-[0_0_4px_rgba(0,0,0,0.25)] p-5 w-56 z-30 transform translate-x-[-12px] translate-y-[-10px] rotate-[1deg] transition-all duration-700 delay-300 ${
              isVisible ? 'translate-x-[-12px] translate-y-[-10px] opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              <p className="text-xs font-bold text-[#191919] mb-3">Conversion Rate</p>
              <div className="flex items-center justify-center mb-3">
                <div className="w-24 h-24 relative">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="48" cy="48" r="42" fill="none" stroke="#EFF5EE" strokeWidth="10" />
                    <circle 
                      cx="48" 
                      cy="48" 
                      r="42" 
                      fill="none" 
                      stroke="#5FD84A" 
                      strokeWidth="10"
                      strokeDasharray="264"
                      strokeDashoffset="53"
                      strokeLinecap="round"
                    />
                    <circle 
                      cx="48" 
                      cy="48" 
                      r="42" 
                      fill="none" 
                      stroke="#B8D84A" 
                      strokeWidth="10"
                      strokeDasharray="264"
                      strokeDashoffset="105"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-[#191919]">80%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#5FD84A]"></div>
                  <span className="text-xs text-[#191919]">5.4%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#B8D84A]"></div>
                  <span className="text-xs text-[#191919]">2.1%</span>
                </div>
              </div>
            </div>

            {/* 막대 차트 - Data Analytics (중앙 하단, 겹쳐짐) */}
            <div className={`absolute bottom-16 left-1/2 -translate-x-1/2 bg-white rounded-[10px] shadow-[0_0_4px_rgba(0,0,0,0.25)] p-5 w-80 z-20 transform translate-y-[-15px] rotate-[-1deg] transition-all duration-700 delay-400 ${
              isVisible ? 'translate-y-[-15px] opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-bold text-[#191919]">Data Analytics</p>
                <span className="text-xs text-[#5FD84A] font-bold">+34%</span>
              </div>
              <div className="h-24 flex items-end space-x-1.5">
                {[40, 60, 45, 75, 55, 80, 65].map((height, idx) => (
                  <div key={idx} className="flex-1">
                    <div 
                      className="w-full bg-gradient-to-t from-[#5FD84A] to-[#B8D84A] rounded-t transition-all duration-300 hover:opacity-80"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 영역 차트 - Test Statistics (우측 하단, 겹쳐짐) */}
            <div className={`absolute bottom-0 right-0 bg-white rounded-[10px] shadow-[0_0_4px_rgba(0,0,0,0.25)] p-5 w-56 z-30 transform translate-x-[-10px] translate-y-[-12px] rotate-[1deg] transition-all duration-700 delay-500 ${
              isVisible ? 'translate-x-[-10px] translate-y-[-12px] opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-xs font-bold text-[#191919] mb-3">Test Statistics</p>
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-xs text-[#191919]">TOTAL</span>
                  </div>
                  <span className="text-base font-bold text-[#191919]">89%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    <span className="text-xs text-[#191919]">ROUTING</span>
                  </div>
                  <span className="text-base font-bold text-[#191919]">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-xs text-[#191919]">INTERACTION</span>
                  </div>
                  <span className="text-base font-bold text-[#191919]">80%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-[#191919]">COMPONENT</span>
                  </div>
                  <span className="text-base font-bold text-[#191919]">90%</span>
                </div>
              </div>
              {/* 영역 차트 */}
              <div className="h-16 relative">
                <svg className="w-full h-full">
                  <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#5FD84A" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#5FD84A" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 48 L 20 42 L 40 38 L 60 35 L 80 32 L 100 30 L 120 28 L 140 26 L 160 24 L 180 22 L 200 20 L 220 18 L 224 48 Z"
                    fill="url(#areaGradient)"
                  />
                  <path
                    d="M 0 48 L 20 42 L 40 38 L 60 35 L 80 32 L 100 30 L 120 28 L 140 26 L 160 24 L 180 22 L 200 20 L 220 18"
                    stroke="#5FD84A"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            {/* 프로젝트 관리 테이블 (좌측 하단, 겹쳐짐) */}
            <div className={`absolute bottom-0 left-0 bg-white rounded-[10px] shadow-[0_0_4px_rgba(0,0,0,0.25)] w-72 z-10 transform translate-y-[8px] rotate-[-1deg] transition-all duration-700 delay-600 ${
              isVisible ? 'translate-y-[8px] opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="text-sm font-extrabold text-[#222] mb-3 px-4 pt-4">프로젝트 관리</div>
              <div className="overflow-hidden">
                <div className="grid grid-cols-2 bg-background shadow-custom rounded-t-[10px] p-3 gap-2 text-xs">
                  <div className="font-bold text-typography-dark text-center">프로젝트 명</div>
                  <div className="font-bold text-typography-dark text-center">상태</div>
                </div>
                <div className="space-y-0">
                  <div className="bg-white grid grid-cols-2 p-3 hover:bg-button-hover transition-colors border-t border-gray-100 text-xs">
                    <div className="text-center font-medium text-typography-dark truncate">AUTA 테스트</div>
                    <div className="text-center font-medium text-typography-dark">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                      완료
                    </div>
                  </div>
                  <div className="bg-white grid grid-cols-2 p-3 hover:bg-button-hover transition-colors border-t border-gray-100 text-xs">
                    <div className="text-center font-medium text-typography-dark truncate">Jane의 프로젝트</div>
                    <div className="text-center font-medium text-typography-dark">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                      완료
                    </div>
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
