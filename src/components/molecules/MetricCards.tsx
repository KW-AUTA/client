import { useState, useEffect, useRef } from 'react';
import GlassCard from '../atoms/GlassCard';
import translations from '@/locales/ko-v4.json';

/**
 * 모델 성능 카드 (막대그래프 + 카드 뒤집기 효과)
 * 포스터 수치 그대로 표기
 */
export const MetricCards = () => {
  const { metrics } = translations.proof;
  const [isVisible, setIsVisible] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
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

  const handleCardClick = (idx: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) {
        newSet.delete(idx);
      } else {
        newSet.add(idx);
      }
      return newSet;
    });
  };

  return (
    <div ref={containerRef} className="h-full flex flex-col">
      <div className="mb-4 flex-shrink-0">
        <h3 className="text-2xl font-bold text-neutral-900 mb-2 text-center">
          모델 성능
        </h3>
        <p className="text-sm text-neutral-600 text-center leading-relaxed">
          {metrics.note}
        </p>
        <p className="text-sm text-neutral-600 text-center leading-relaxed mt-1">
          높은 정밀도와 재현율로 디자인과 구현 간의 불일치를 신뢰성 있게 탐지합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
        {metrics.items.map((metric, idx) => {
          const value = typeof metric.value === 'number' ? metric.value : 0;
          const maxValue = 100;
          const percentage = (value / maxValue) * 100;
          const isFlipped = flippedCards.has(idx);
          
          // 색상 결정 (값에 따라)
          const getBarColor = () => {
            if (value >= 70) return 'bg-[#5CA585]'; // 진한 녹색
            if (value >= 50) return 'bg-[#7BC99A]'; // 연한 녹색
            return 'bg-[#9DD4B0]'; // 더 연한 녹색
          };

          // 성능 평가 태그 결정
          const getPerformanceTag = () => {
            if (value >= 70) return { text: '우수', color: 'bg-[#5CA585] text-white' };
            if (value >= 60) return { text: '양호', color: 'bg-[#7BC99A] text-white' };
            if (value >= 50) return { text: '보통', color: 'bg-[#9DD4B0] text-white' };
            return { text: '개선 필요', color: 'bg-neutral-500 text-white' };
          };

          const performanceTag = getPerformanceTag();

          return (
            <div
              key={idx}
              className="relative h-full"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease-out ${idx * 0.1}s, transform 0.6s ease-out ${idx * 0.1}s`,
                perspective: '1000px'
              }}
            >
              <div
                className="relative w-full h-full cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s ease-in-out'
                }}
                onClick={() => handleCardClick(idx)}
              >
                {/* 앞면 */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <GlassCard className="p-6 hoverEffect h-full relative">
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
                        className={`${getBarColor()} h-full rounded-full transition-all duration-1000 ease-out`}
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
                    </div>
                    
                    {/* 우측 하단 안내 텍스트 */}
                    <div className="absolute bottom-4 right-4">
                      <span className="text-[10px] text-neutral-400">클릭하여 설명 보기</span>
                    </div>
                  </GlassCard>
                </div>

                {/* 뒷면 */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <GlassCard className="p-3 hoverEffect h-full flex flex-col relative">
                    {/* 상단: 지표명과 수치 */}
                    <div className="flex items-start justify-between mb-1 flex-shrink-0">
                      <div className="text-sm font-bold text-neutral-900">
                        {metric.label}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${performanceTag.color}`}>
                          {performanceTag.text}
                        </span>
                        <div className="text-base font-bold text-brand-blue">
                          {value}
                        </div>
                      </div>
                    </div>
                    
                    {/* 중앙: 설명 내용 */}
                    <div className="flex-1 flex items-center justify-center min-h-0">
                      <p 
                        className="text-xs text-neutral-600 leading-tight text-center break-keep px-1"
                        style={{
                          wordBreak: 'keep-all',
                          overflowWrap: 'break-word',
                          textWrap: 'balance'
                        }}
                      >
                        {metric.description || metric.desc}
                      </p>
                    </div>
                    
                    {/* 우측 하단 안내 텍스트 */}
                    <div className="absolute bottom-2 right-2 flex-shrink-0">
                      <span className="text-[10px] text-neutral-400">클릭하여 뒤로 가기</span>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MetricCards;
