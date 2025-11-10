import { useState, useEffect, useRef } from 'react';
import GlassCard from '../atoms/GlassCard';
import translations from '@/locales/ko-v4.json';

/**
 * 모델 성능 카드 (막대그래프)
 * 포스터 수치 그대로 표기
 */
export const MetricCards = () => {
  const { metrics } = translations.proof;
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef}>
      <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
        {metrics.title}
      </h3>
      <p className="text-sm text-neutral-700 mb-8 text-center">
        {metrics.note}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.items.map((metric, idx) => {
          const value = typeof metric.value === 'number' ? metric.value : 0;
          const maxValue = 100;
          const percentage = (value / maxValue) * 100;
          
          // 색상 결정 (값에 따라)
          const getBarColor = () => {
            if (value >= 70) return 'bg-[#5CA585]'; // 진한 녹색
            if (value >= 50) return 'bg-[#7BC99A]'; // 연한 녹색
            return 'bg-[#9DD4B0]'; // 더 연한 녹색
          };

          return (
            <GlassCard 
              key={idx} 
              className="p-6 hoverEffect"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease-out ${idx * 0.1}s, transform 0.6s ease-out ${idx * 0.1}s`
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-bold text-neutral-900">
                  {metric.label}
                </div>
                <div className="text-2xl font-bold text-brand-blue">
                  {value}
                </div>
              </div>
              
              {/* 막대그래프 */}
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden relative">
                <div
                  className={`${getBarColor()} h-full rounded-full transition-all duration-1000 ease-out ${
                    isVisible ? 'w-full' : 'w-0'
                  }`}
                  style={{
                    width: isVisible ? `${percentage}%` : '0%',
                    transitionDelay: `${idx * 0.1 + 0.2}s`
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-neutral-500">
                  {metric.desc}
                </div>
                <div className="text-[9px] text-neutral-300">
                  *{metric.source}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

export default MetricCards;
