import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { PlayCircle, TrendingUp, CheckCircle2, AlertCircle, BarChart3, PieChart } from 'lucide-react';
import { ROUTES } from '@/constants';
import Badge from '../components/atoms/Badge';
import GlassCard from '../components/atoms/GlassCard';
import translations from '@/locales/ko-v4.json';
import LinearProgressBar2 from '@/components/ui/progressBar/LinearProgressBar2';
import CircleProgressBar from '@/components/ui/progressBar/CircleProgressBar';
import { colors } from '@/styles/theme/colors';

/**
 * v4 Hero 섹션 (Above the fold, Glassmorphism 대시보드)
 * Glassmorphism 기반 데이터 인사이트 대시보드
 */
export const Hero = () => {
  const { hero } = translations;
  const [isVisible, setIsVisible] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  // 테스트 결과 데이터 (기존 LinearProgressBar2용)
  const testResultsData = [
    { label: 'ROUTING', value: 100, color: colors.teal_1 },
    { label: 'INTERACTION', value: 80, color: colors.purple_1 },
    { label: 'COMPONENT', value: 90, color: colors.brown_1 }
  ];

  // 테스트 통계 데이터 (기존 CircleProgressBar용)
  const testStatsData = [
    { label: 'TOTAL', value: 89, color: '#E48989' },
    { label: 'ROUTING', value: 100, color: colors.teal_1 },
    { label: 'INTERACTION', value: 80, color: colors.purple_1 },
    { label: 'COMPONENT', value: 90, color: colors.brown_1 }
  ];

  // 세이지 그린 컬러 팔레트
  const sageGreen = '#5CA585';
  const neutralBg = '#f8faf9';
  const neutralLight = '#e9f3ef';

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-24 pb-32"
      style={{
        background: `linear-gradient(135deg, ${neutralBg} 0%, ${neutralLight} 50%, ${neutralBg} 100%)`
      }}>
      
      {/* 배경 블러 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#5CA585]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#5CA585]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#5CA585]/10 rounded-full blur-3xl" />
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
              <button className="bg-[#5CA585] hover:bg-[#5CA585]/90 text-white text-lg px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
                {hero.primary}
              </button>
            </Link>
            <a href="#video-tutorial">
              <button className="flex items-center space-x-2 text-[#5CA585] hover:text-[#5CA585]/80 text-lg font-medium transition-colors">
                <PlayCircle className="w-6 h-6" />
                <span>{hero.secondary}</span>
              </button>
            </a>
          </div>

          {/* Glassmorphism 대시보드 위젯 */}
          <div 
            ref={dashboardRef}
            className={`relative w-full max-w-6xl mx-auto mt-20 mb-12 hidden md:block transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* 대시보드 그리드 레이아웃 */}
            <div className="grid grid-cols-12 gap-4">
              {/* LLM UX/UI 평가 (좌측 상단) */}
              <div className={`col-span-3 transition-all duration-700 delay-100 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <GlassCard className="p-6 h-full" hoverEffect>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#5CA585]/20">
                      <TrendingUp className="w-5 h-5 text-[#5CA585]" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900">LLM UX/UI 평가</h3>
                  </div>
                  <div className="flex flex-col items-center justify-center py-6 border-2 border-[#5CA585] rounded-xl bg-[#5CA585]/10">
                    <p className="text-5xl font-bold text-[#5CA585] mb-2">85</p>
                    <div className="text-xs text-center">
                      <p className="font-semibold text-neutral-900">점수</p>
                      <p className="text-neutral-600">100점 만점</p>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Overview 카드들 (중앙 상단) */}
              <div className={`col-span-6 grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                {/* 진행 중인 프로젝트 */}
                <GlassCard className="p-6" hoverEffect>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#5CA585]/20">
                      <BarChart3 className="w-5 h-5 text-[#5CA585]" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900">진행 중인 프로젝트</h3>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-extrabold text-neutral-900">4</span>
                    <span className="text-lg font-bold text-neutral-600 mb-1">개</span>
                  </div>
                </GlassCard>

                {/* 완료된 테스트 */}
                <GlassCard className="p-6" hoverEffect>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#5CA585]/20">
                      <CheckCircle2 className="w-5 h-5 text-[#5CA585]" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900">완료된 테스트</h3>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-extrabold text-neutral-900">160</span>
                    <span className="text-lg font-bold text-neutral-600 mb-1">개</span>
                  </div>
                </GlassCard>
              </div>

              {/* 테스트 통계 (우측 상단) */}
              <div className={`col-span-3 transition-all duration-700 delay-300 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <GlassCard className="p-6 h-full" hoverEffect>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#5CA585]/20">
                      <PieChart className="w-5 h-5 text-[#5CA585]" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900">테스트 통계</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {testStatsData.map((stat, idx) => (
                      <CircleProgressBar
                        key={idx}
                        value={stat.value}
                        label={stat.label}
                        color={stat.color}
                        size={64}
                        thickness={6}
                      />
                    ))}
                  </div>
                </GlassCard>
              </div>

              {/* 테스트 결과 그래프 카드 (중앙, Routing/Interaction/Component) */}
              <div className={`col-span-8 transition-all duration-700 delay-400 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <GlassCard className="p-6" hoverEffect>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-[#5CA585]/20">
                      <BarChart3 className="w-5 h-5 text-[#5CA585]" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900">테스트 결과</h3>
                  </div>
                  <div className="flex flex-col gap-5">
                    {testResultsData.map((result, idx) => (
                      <LinearProgressBar2
                        key={idx}
                        value={result.value}
                        label={result.label}
                        color={result.color}
                      />
                    ))}
                  </div>
                </GlassCard>
              </div>

              {/* 컴포넌트 이슈 (우측 중앙) */}
              <div className={`col-span-4 transition-all duration-700 delay-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <GlassCard className="p-6 h-full" hoverEffect>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#5CA585]/20">
                      <AlertCircle className="w-5 h-5 text-[#5CA585]" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900">컴포넌트 이슈</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-red-50/80 border border-red-200/50 rounded-lg p-3 backdrop-blur-sm">
                      <div className="text-xs font-bold text-red-800 mb-1">X, Y 좌표 오차</div>
                      <div className="text-[10px] text-red-700">컴포넌트 이름: 협력기관1</div>
                    </div>
                    <div className="bg-blue-50/80 border border-blue-200/50 rounded-lg p-3 backdrop-blur-sm">
                      <div className="text-xs font-bold text-blue-800 mb-1">해결 제안</div>
                      <div className="text-[10px] text-blue-700">Figma 프레임 확인 필요</div>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* 프로젝트 관리 테이블 (하단 좌측) */}
              <div className={`col-span-4 transition-all duration-700 delay-600 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <GlassCard className="p-6" hoverEffect>
                  <h3 className="text-sm font-bold text-neutral-900 mb-4">프로젝트 관리</h3>
                  <div className="overflow-hidden rounded-lg">
                    <div className="grid grid-cols-2 bg-[#e9f3ef]/50 p-2 gap-2 text-xs font-bold text-neutral-900">
                      <div className="text-center">프로젝트 명</div>
                      <div className="text-center">상태</div>
                    </div>
                    <div className="space-y-0">
                      <div className="grid grid-cols-2 p-2 hover:bg-white/30 transition-colors border-t border-[#e9f3ef] text-xs">
                        <div className="text-center font-medium text-neutral-900 truncate">AUTA 테스트</div>
                        <div className="text-center font-medium text-neutral-900">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                          완료
                        </div>
                      </div>
                      <div className="grid grid-cols-2 p-2 hover:bg-white/30 transition-colors border-t border-[#e9f3ef] text-xs">
                        <div className="text-center font-medium text-neutral-900 truncate">Jane의 프로젝트</div>
                        <div className="text-center font-medium text-neutral-900">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                          완료
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* 테스트 관리 테이블 (하단 중앙) */}
              <div className={`col-span-8 transition-all duration-700 delay-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <GlassCard className="p-6" hoverEffect>
                  <h3 className="text-sm font-bold text-neutral-900 mb-4">테스트 관리</h3>
                  <div className="overflow-hidden rounded-lg">
                    <div className="grid grid-cols-3 bg-[#e9f3ef]/50 p-2 gap-2 text-xs font-bold text-neutral-900">
                      <div className="text-center">프로젝트 명</div>
                      <div className="text-center">유형</div>
                      <div className="text-center">성공 여부</div>
                    </div>
                    <div className="space-y-0">
                      <div className="grid grid-cols-3 p-2 hover:bg-white/30 transition-colors border-t border-[#e9f3ef] text-xs">
                        <div className="text-center font-medium text-neutral-900 truncate">광운대 홈페이지</div>
                        <div className="text-center font-medium text-neutral-900">
                          <span className="inline-flex items-center font-bold">
                            <span className="w-2 h-2 rounded-sm mr-1 bg-yellow-400"></span>
                            MAPPING
                          </span>
                        </div>
                        <div className="text-center font-medium text-neutral-900">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></span>
                          실패
                        </div>
                      </div>
                      <div className="grid grid-cols-3 p-2 hover:bg-white/30 transition-colors border-t border-[#e9f3ef] text-xs">
                        <div className="text-center font-medium text-neutral-900 truncate">광운대 홈페이지</div>
                        <div className="text-center font-medium text-neutral-900">
                          <span className="inline-flex items-center font-bold">
                            <span className="w-2 h-2 rounded-sm mr-1 bg-yellow-400"></span>
                            MAPPING
                          </span>
                        </div>
                        <div className="text-center font-medium text-neutral-900">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                          통과
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>

          {/* 모바일용 간단한 통계 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto md:hidden">
            <GlassCard className="p-6" hoverEffect>
              <div className="flex flex-col items-center justify-between h-full">
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-[16px] bg-[#5CA585]/20">
                  <BarChart3 className="w-8 h-8 text-[#5CA585]" />
                </div>
                <div className="text-sm font-bold text-neutral-900 mb-2">진행 중인 프로젝트</div>
                <div className="flex items-end">
                  <span className="text-4xl font-extrabold text-neutral-900 leading-none">4</span>
                  <span className="text-lg font-bold ml-1 text-neutral-600">개</span>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-6" hoverEffect>
              <div className="flex flex-col items-center justify-between h-full">
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-[16px] bg-[#5CA585]/20">
                  <CheckCircle2 className="w-8 h-8 text-[#5CA585]" />
                </div>
                <div className="text-sm font-bold text-neutral-900 mb-2">완료된 테스트</div>
                <div className="flex items-end">
                  <span className="text-4xl font-extrabold text-neutral-900 leading-none">160</span>
                  <span className="text-lg font-bold ml-1 text-neutral-600">개</span>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-6" hoverEffect>
              <div className="flex flex-col items-center justify-between h-full">
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-[16px] bg-[#5CA585]/20">
                  <AlertCircle className="w-8 h-8 text-[#5CA585]" />
                </div>
                <div className="text-sm font-bold text-neutral-900 mb-2">미완료 테스트</div>
                <div className="flex items-end">
                  <span className="text-4xl font-extrabold text-neutral-900 leading-none">0</span>
                  <span className="text-lg font-bold ml-1 text-neutral-600">개</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
