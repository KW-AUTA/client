import { useState, useEffect, useRef } from 'react';
import GlassCard from '../components/atoms/GlassCard';
import { Link2, Search, FileText, ArrowRight } from 'lucide-react';
import translations from '@/locales/ko-v4.json';

/**
 * 작동 구조 섹션
 * AUTA의 3단계 작동 프로세스 설명
 */
export const OperatingStructure = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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
    <section 
      id="operating-structure" 
      className="relative py-32 md:py-40"
      ref={containerRef}>
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 mb-4">
            {translations.proof.flow.title}
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto mb-3 font-medium">
            {translations.proof.flow.subtitle}
          </p>
          <p className="text-sm md:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Figma 디자인 데이터를 자동으로 추출하고, AI 기반 분석을 통해 실제 구현 화면과 비교하여 불일치를 즉시 발견합니다. 
            모든 과정이 자동화되어 수동 작업 없이도 정확한 검증이 가능합니다.
          </p>
        </div>

        {/* 3단계 프로세스 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {translations.proof.flow.items.map((item, idx) => {
            const stepIcons = [Link2, Search, FileText];
            const StepIcon = stepIcons[idx] || Link2;
            
            return (
              <div key={idx} className="relative">
                <GlassCard
                  className="p-6 md:p-8 h-full hoverEffect"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `opacity 0.8s ease-out ${idx * 0.15}s, transform 0.8s ease-out ${idx * 0.15}s`
                  }}
                >
                  {/* 단계 번호 및 아이콘 */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#5CA585] to-[#4a9a73] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg relative z-10">
                        {item.step}
                      </div>
                      <div className="w-8 h-8 bg-[#5CA585]/10 rounded-lg flex items-center justify-center border border-[#5CA585]/20">
                        <StepIcon className="w-4 h-4 text-[#5CA585]" />
                      </div>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#5CA585]/30 to-transparent" />
                  </div>

                  {/* 단계 설명 */}
                  <div className="space-y-3">
                    <p className="text-base text-neutral-700 leading-relaxed font-medium">
                      {item.text}
                    </p>
                    
                    {/* 상세 설명 추가 */}
                    {idx === 0 && (
                      <div className="pt-3 border-t border-neutral-200">
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          Figma 플러그인을 통해 현재 페이지의 모든 프레임을 <strong className="text-neutral-900">JSON 형식으로 내보냅니다</strong>. 디자이너가 작업한 원본 디자인 데이터가 그대로 테스트 기준이 됩니다.
                        </p>
                      </div>
                    )}
                    
                    {idx === 1 && (
                      <div className="pt-3 border-t border-neutral-200">
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          <strong className="text-neutral-900">YOLO 모델</strong>로 UI 컴포넌트를 탐지하고, <strong className="text-neutral-900">OCR 기술</strong>로 텍스트를 추출합니다. 추출된 JSON 데이터를 분석하여 실제 화면과 비교할 준비를 합니다.
                        </p>
                      </div>
                    )}
                    
                    {idx === 2 && (
                      <div className="pt-3 border-t border-neutral-200">
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          발견된 불일치 항목을 <strong className="text-neutral-900">시각적 리포트</strong>로 저장합니다. 각 오류는 증거 캡처와 함께 저장되어, 팀원들이 쉽게 확인하고 수정할 수 있습니다.
                        </p>
                      </div>
                    )}
                  </div>
                </GlassCard>

                {/* 화살표 (데스크탑에서만 표시) */}
                {idx < translations.proof.flow.items.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10 transform -translate-y-1/2">
                    <div className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-[#5CA585]" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 추가 설명 박스 */}
        <GlassCard
          className="p-6 md:p-8 bg-gradient-to-br from-[#5CA585]/5 to-transparent"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#5CA585]" />
                자동화된 워크플로우
              </h4>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Figma에서 디자인 데이터를 추출하는 순간부터 오류 탐지까지, 모든 과정이 <strong>완전 자동화</strong>되어 있습니다. 수동 작업 없이도 정확한 검증이 가능합니다.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#5CA585]" />
                실시간 결과 확인
              </h4>
              <p className="text-sm text-neutral-700 leading-relaxed">
                테스트가 진행되는 동안 <strong>실시간으로 진행 상황</strong>을 확인할 수 있으며, 완료 즉시 상세한 리포트를 받아볼 수 있습니다.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default OperatingStructure;

