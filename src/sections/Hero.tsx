import { Link } from 'react-router-dom';
import { PlayCircle, CheckCircle, Users, Zap, TrendingUp, BarChart3 } from 'lucide-react';
import { ROUTES } from '@/constants';
import Badge from '../components/atoms/Badge';
import GlassCard from '../components/atoms/GlassCard';
import translations from '@/locales/ko-v4.json';

/**
 * v4 Hero 섹션 (Above the fold, Floating Glass 위젯 포함)
 * 참고 이미지 스타일 적용
 */
export const Hero = () => {
  const { hero } = translations;

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
      style={{
        background: 'linear-gradient(135deg, #F7FBF8 0%, #E8F5E9 50%, #F0F8F1 100%)'
      }}>
      
      {/* 배경 블러 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-sage/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1120px] mx-auto px-5 md:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto relative">
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

          {/* Floating Stats 위젯 (참고 이미지 스타일) */}
          <div className="relative h-80 hidden md:block">
            {/* 왼쪽 상단 - Total Tests */}
            <GlassCard className="absolute top-0 left-0 p-6 w-64 animate-float-cloud" hoverEffect>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-orange rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-xs text-neutral-700 font-medium">Total Subscribers</p>
                  <p className="text-2xl font-bold text-neutral-900">21,000</p>
                </div>
              </div>
            </GlassCard>

            {/* 중앙 하단 - Data Analytics */}
            <GlassCard className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-x-16 p-6 w-80 animate-float-cloud" hoverEffect>
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm font-bold text-neutral-900">Data Analytics</p>
                  <span className="text-xs text-brand-blue font-bold">+34%</span>
                </div>
                <div className="h-24 flex items-end space-x-2">
                  {[40, 60, 45, 75, 55, 80, 65].map((height, idx) => (
                    <div 
                      key={idx}
                      className="flex-1 bg-gradient-to-t from-brand-blue to-brand-blue/50 rounded-t-lg transition-all duration-300 hover:opacity-80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* 오른쪽 상단 - Sales Stats */}
            <GlassCard className="absolute top-8 right-0 p-6 w-64 animate-float-cloud" hoverEffect>
              <div>
                <p className="text-xs text-neutral-700 font-medium mb-3">Sales Stats</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-20 h-20 relative">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="40" cy="40" r="35" fill="none" stroke="#EFF5EE" strokeWidth="8" />
                      <circle 
                        cx="40" 
                        cy="40" 
                        r="35" 
                        fill="none" 
                        stroke="#5FD84A" 
                        strokeWidth="8"
                        strokeDasharray="220"
                        strokeDashoffset="44"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-neutral-900">80%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-brand-blue">800+</p>
                    <p className="text-xs text-neutral-700">Daily Visitors</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* 오른쪽 중앙 - Instagram Stats (추가) */}
            <GlassCard className="absolute top-1/2 right-12 -translate-y-1/2 p-5 w-52 animate-float-cloud" hoverEffect>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-neutral-700">Instagram</p>
                  <p className="text-lg font-bold text-neutral-900">1.2k</p>
                </div>
              </div>
            </GlassCard>
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
