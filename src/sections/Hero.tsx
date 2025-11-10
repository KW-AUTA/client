import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { PlayCircle, CheckCircle, Users, Zap, BarChart3, Target } from 'lucide-react';
import { ROUTES } from '@/constants';
import Badge from '../components/atoms/Badge';
import GlassCard from '../components/atoms/GlassCard';
import translations from '@/locales/ko-v4.json';

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

          {/* 글래스모피즘 대시보드 위젯 (스크롤 뉘앙스) */}
          <div 
            ref={dashboardRef}
            className={`relative min-h-[600px] mt-20 hidden md:block transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Overview 카드 3개 (상단) */}
            <div className={`flex justify-center gap-4 mb-8 transition-all duration-700 delay-100 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <GlassCard className="p-6 w-64 hoverEffect">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-neutral-700 mb-2">진행 중인 프로젝트 수</p>
                  <p className="text-3xl font-bold text-neutral-900">4개</p>
                </div>
              </GlassCard>

              <GlassCard className="p-6 w-64 hoverEffect">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-blue to-brand-orange rounded-xl flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-neutral-700 mb-2">완료된 테스트 수</p>
                  <p className="text-3xl font-bold text-neutral-900">160개</p>
                </div>
              </GlassCard>

              <GlassCard className="p-6 w-64 hoverEffect">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-neutral-700 mb-2">미완료된 테스트 수</p>
                  <p className="text-3xl font-bold text-neutral-900">0개</p>
                </div>
              </GlassCard>
            </div>

            {/* 통계 위젯 4개 (중앙 상단) */}
            <div className={`grid grid-cols-4 gap-4 mb-8 transition-all duration-700 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <GlassCard className="p-5 hoverEffect">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-neutral-700 font-medium">Total Users</p>
                  <span className="text-xs text-green-600 font-bold">+1.2%</span>
                </div>
                <p className="text-2xl font-bold text-neutral-900">332</p>
              </GlassCard>

              <GlassCard className="p-5 hoverEffect">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-neutral-700 font-medium">New Users</p>
                  <span className="text-xs text-red-600 font-bold">-0.5%</span>
                </div>
                <p className="text-2xl font-bold text-neutral-900">162</p>
              </GlassCard>

              <GlassCard className="p-5 hoverEffect">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-neutral-700 font-medium">Avg. Time</p>
                  <span className="text-xs text-green-600 font-bold">+0.8%</span>
                </div>
                <p className="text-2xl font-bold text-neutral-900">00:13:12</p>
              </GlassCard>

              <GlassCard className="p-5 hoverEffect">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-neutral-700 font-medium">Revenue</p>
                  <span className="text-xs text-red-600 font-bold">-0.2%</span>
                </div>
                <p className="text-2xl font-bold text-neutral-900">$6.18K</p>
              </GlassCard>
            </div>

            {/* 차트 영역 (하단) */}
            <div className={`grid grid-cols-3 gap-6 transition-all duration-700 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {/* 도넛 차트 - Conversion Rate */}
              <GlassCard className="p-6 hoverEffect">
                <p className="text-sm font-bold text-neutral-900 mb-4">Conversion Rate</p>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-32 h-32 relative">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="64" cy="64" r="56" fill="none" stroke="#EFF5EE" strokeWidth="12" />
                      <circle 
                        cx="64" 
                        cy="64" 
                        r="56" 
                        fill="none" 
                        stroke="#5FD84A" 
                        strokeWidth="12"
                        strokeDasharray="352"
                        strokeDashoffset="70"
                        strokeLinecap="round"
                      />
                      <circle 
                        cx="64" 
                        cy="64" 
                        r="56" 
                        fill="none" 
                        stroke="#B8D84A" 
                        strokeWidth="12"
                        strokeDasharray="352"
                        strokeDashoffset="140"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-neutral-900">80%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-blue"></div>
                    <span className="text-xs text-neutral-700">5.4%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-orange"></div>
                    <span className="text-xs text-neutral-700">2.1%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-sage"></div>
                    <span className="text-xs text-neutral-700">1.0%</span>
                  </div>
                </div>
              </GlassCard>

              {/* 막대 차트 - Data Analytics */}
              <GlassCard className="p-6 hoverEffect">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm font-bold text-neutral-900">Data Analytics</p>
                  <span className="text-xs text-brand-blue font-bold">+34%</span>
                </div>
                <div className="h-32 flex items-end space-x-2">
                  {[40, 60, 45, 75, 55, 80, 65].map((height, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div 
                        className="w-full bg-gradient-to-t from-brand-blue to-brand-blue/50 rounded-t-lg transition-all duration-300 hover:opacity-80"
                        style={{ height: `${height}%` }}
                      />
                      <div className="w-2 h-2 rounded-full bg-brand-blue/30"></div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* KPI 카드 - Test Stats */}
              <GlassCard className="p-6 hoverEffect">
                <p className="text-sm font-bold text-neutral-900 mb-4">Test Statistics</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span className="text-xs text-neutral-700">TOTAL</span>
                    </div>
                    <span className="text-lg font-bold text-neutral-900">89%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                      <span className="text-xs text-neutral-700">ROUTING</span>
                    </div>
                    <span className="text-lg font-bold text-neutral-900">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span className="text-xs text-neutral-700">INTERACTION</span>
                    </div>
                    <span className="text-lg font-bold text-neutral-900">80%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-xs text-neutral-700">COMPONENT</span>
                    </div>
                    <span className="text-lg font-bold text-neutral-900">90%</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* 모바일용 간단한 통계 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto md:hidden">
            <GlassCard className="p-5 text-center" hoverEffect>
              <CheckCircle className="w-8 h-8 text-brand-blue mx-auto mb-2" />
              <p className="text-xs text-neutral-700 font-medium">{hero.stats.testsDone.label}</p>
              <p className="text-xl font-bold text-neutral-900">21,000</p>
            </GlassCard>
            <GlassCard className="p-5 text-center" hoverEffect>
              <Users className="w-8 h-8 text-brand-blue mx-auto mb-2" />
              <p className="text-xs text-neutral-700 font-medium">{hero.stats.dailyVisitors.label}</p>
              <p className="text-xl font-bold text-neutral-900">800+</p>
            </GlassCard>
            <GlassCard className="p-5 text-center" hoverEffect>
              <Zap className="w-8 h-8 text-brand-blue mx-auto mb-2" />
              <p className="text-xs text-neutral-700 font-medium">{hero.stats.avgTime.label}</p>
              <p className="text-xl font-bold text-neutral-900">{hero.stats.avgTime.value}</p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
