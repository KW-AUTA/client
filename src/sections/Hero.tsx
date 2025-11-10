import { Link } from 'react-router-dom';
import { PlayCircle, CheckCircle, Users, Zap } from 'lucide-react';
import { ROUTES } from '@/constants';
import Badge from '../components/atoms/Badge';
import StatWidget from '../components/atoms/StatWidget';
import translations from '@/locales/ko-v4.json';

/**
 * v4 Hero 섹션 (Above the fold, Glass 위젯 포함)
 */
export const Hero = () => {
  const { hero } = translations;

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        background: 'linear-gradient(135deg, #F7FBF8 0%, #E8F5E9 50%, #F0F8F1 100%)'
      }}>
      
      {/* 배경 블러 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-sage/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1120px] mx-auto px-5 md:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="brand" className="mb-6 inline-flex">
            {hero.badge}
          </Badge>

          {/* 메인 헤드라인 */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
            {hero.title}
          </h1>

          {/* 서브헤드라인 */}
          <p className="text-lg md:text-xl text-neutral-700 mb-10 leading-relaxed max-w-3xl mx-auto">
            {hero.subtitle}
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to={ROUTES.LOGIN}>
              <button className="bg-brand-blue hover:bg-brand-blue/90 text-white text-lg px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
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

          {/* Floating Stats 위젯 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <StatWidget
              icon={<CheckCircle className="w-6 h-6" />}
              label={hero.stats.testsDone.label}
              value={hero.stats.testsDone.value}
              note={hero.stats.testsDone.note}
            />
            <StatWidget
              icon={<Users className="w-6 h-6" />}
              label={hero.stats.dailyVisitors.label}
              value={hero.stats.dailyVisitors.value}
              note={hero.stats.dailyVisitors.note}
            />
            <StatWidget
              icon={<Zap className="w-6 h-6" />}
              label={hero.stats.avgTime.label}
              value={hero.stats.avgTime.value}
              note={hero.stats.avgTime.note}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

