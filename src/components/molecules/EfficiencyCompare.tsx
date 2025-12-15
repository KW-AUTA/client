import React, { useState, useEffect, useRef } from 'react';
import GlassCard from '../atoms/GlassCard';
import translations from '@/locales/ko-v4.json';

/**
 * 효율 비교 컴팩트 버전 (모델 성능 우측에 배치)
 */
export const EfficiencyCompare = () => {
  const { compare } = translations.proof;
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

  const getEfficiencyValue = (rowIndex: number, cellIndex: number): number => {
    const row = compare.rows[rowIndex];
    if (!row || cellIndex === 0) return 0;

    if (cellIndex === 1) {
      if (rowIndex === 0) return 30; // 시간
      if (rowIndex === 1) return 30; // 커버리지
    } else if (cellIndex === 2) {
      if (rowIndex === 0) return 2; // 시간
      if (rowIndex === 1) return 100; // 커버리지
    }
    return 0;
  };

  const getMaxValue = (rowIndex: number): number => {
    if (rowIndex === 0) return 30; // 시간
    if (rowIndex === 1) return 100; // 커버리지
    return 100;
  };

  return (
    <div ref={containerRef} className="h-full flex flex-col">
      <div className="mb-4 flex-shrink-0">
        <h3 className="text-2xl font-bold text-neutral-900 mb-2 text-center">효율 지표</h3>
        {/* <p className="text-sm text-neutral-600 text-center leading-relaxed">
                  기존 QA 대비 AUTA의 효율성
                </p> */}
        <p className="text-sm text-neutral-600 text-center leading-relaxed mt-1">
          자동화된 테스트 프로세스로
          <br />
          시간 단축 및 커버리지 향상을 제공합니다.
        </p>
      </div>

      <GlassCard
        className="p-5 flex-1 min-h-0 flex flex-col justify-center"
        style={
          {
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          } as React.CSSProperties
        }>
        <div className="space-y-4">
          {compare.rows.map((row, rowIdx) => {
            const existingValue = getEfficiencyValue(rowIdx, 1);
            const autaValue = getEfficiencyValue(rowIdx, 2);
            const maxValue = getMaxValue(rowIdx);

            const existingPercentage =
              rowIdx === 0 ? ((maxValue - existingValue) / maxValue) * 100 : (existingValue / maxValue) * 100;
            const autaPercentage =
              rowIdx === 0 ? ((maxValue - autaValue) / maxValue) * 100 : (autaValue / maxValue) * 100;

            return (
              <div key={rowIdx} className="space-y-2">
                <div className="text-sm font-bold text-neutral-900 mb-2">{row[0]}</div>

                {/* 기존 QA */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-red-600 font-medium">기존 QA</span>
                    <span className="text-red-600">{row[1]}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className="bg-red-400 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${existingPercentage}%` : '0%',
                        transitionDelay: `${rowIdx * 0.15 + 0.3}s`
                      }}
                    />
                  </div>
                </div>

                {/* AUTA */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-brand-blue font-bold">AUTA</span>
                    <span className="text-brand-blue font-bold">{row[2]}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className="bg-brand-blue h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${autaPercentage}%` : '0%',
                        transitionDelay: `${rowIdx * 0.15 + 0.4}s`
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};

export default EfficiencyCompare;
