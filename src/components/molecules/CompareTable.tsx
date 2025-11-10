import React, { useState, useEffect, useRef } from 'react';
import GlassCard from '../atoms/GlassCard';
import translations from '@/locales/ko-v4.json';

/**
 * 효율 비교 테이블 (포스터 수치) + 막대그래프
 */
export const CompareTable = () => {
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

  // 효율 비교 데이터를 숫자로 변환 (비교용)
  const getEfficiencyValue = (rowIndex: number, cellIndex: number): number => {
    const row = compare.rows[rowIndex];
    if (!row || cellIndex === 0) return 0;
    
    const cell = row[cellIndex];
    if (cellIndex === 1) {
      // 기존 QA: 시간은 30분, 커버리지는 30%, 인원은 1명
      if (rowIndex === 0) return 30; // 시간
      if (rowIndex === 1) return 30; // 커버리지
      if (rowIndex === 2) return 1; // 인원
    } else if (cellIndex === 2) {
      // AUTA: 시간은 2분, 커버리지는 100%, 인원은 0명
      if (rowIndex === 0) return 2; // 시간
      if (rowIndex === 1) return 100; // 커버리지
      if (rowIndex === 2) return 0; // 인원
    }
    return 0;
  };

  const getMaxValue = (rowIndex: number): number => {
    if (rowIndex === 0) return 30; // 시간
    if (rowIndex === 1) return 100; // 커버리지
    if (rowIndex === 2) return 1; // 인원
    return 100;
  };

  return (
    <GlassCard 
      className="p-6 md:p-8"
      ref={containerRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
      } as React.CSSProperties}
    >
      <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
        {compare.title}
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-neutral-300">
              {compare.headers.map((header, idx) => (
                <th 
                  key={idx} 
                  className={`py-3 px-4 font-bold text-neutral-900 ${idx === 0 ? 'text-left' : 'text-center'}`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compare.rows.map((row, rowIdx) => {
              const existingValue = getEfficiencyValue(rowIdx, 1);
              const autaValue = getEfficiencyValue(rowIdx, 2);
              const maxValue = getMaxValue(rowIdx);
              
              // 시간의 경우 역수로 계산 (작을수록 좋음)
              const existingPercentage = rowIdx === 0 
                ? ((maxValue - existingValue) / maxValue) * 100
                : (existingValue / maxValue) * 100;
              const autaPercentage = rowIdx === 0
                ? ((maxValue - autaValue) / maxValue) * 100
                : (autaValue / maxValue) * 100;

              return (
                <tr key={rowIdx} className="border-b border-neutral-100 hover:bg-white/50 transition-colors">
                  {row.map((cell, cellIdx) => (
                    <td 
                      key={cellIdx}
                      className={`py-4 px-4 ${cellIdx === 0 ? 'text-left font-medium text-neutral-700' : 'text-center'}`}>
                      {cellIdx === 0 ? (
                        <div>{cell}</div>
                      ) : (
                        <div className="space-y-2">
                          <div className={`${cellIdx === 1 ? 'text-red-600' : 'text-brand-blue font-bold'}`}>
                            {cell}
                          </div>
                          {/* 막대그래프 */}
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden relative">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                cellIdx === 1 ? 'bg-red-400' : 'bg-brand-blue'
                              }`}
                              style={{
                                width: isVisible 
                                  ? `${cellIdx === 1 ? existingPercentage : autaPercentage}%` 
                                  : '0%',
                                transitionDelay: `${rowIdx * 0.15 + cellIdx * 0.1 + 0.3}s`
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-neutral-300 mt-4 text-right">
        {compare.source}
      </p>
    </GlassCard>
  );
};

export default CompareTable;
