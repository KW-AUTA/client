import { useState, useEffect, useRef } from 'react';
import GlassCard from '../components/atoms/GlassCard';
import { X, Check, Route, Brain } from 'lucide-react';

/**
 * 기술적 특징 섹션 - 발표 슬라이드 형식
 * 기존 테스트 도구 vs AUTA 비교 + UI/UX 테스트 기능 설명
 */
export const TechnicalFeatures = () => {
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

  const comparisonRows = [
    {
      label: 'TEST UNIT',
      existing: 'DOM 요소',
      auta: '시각적 컴포넌트 + UX 플로우'
    },
    {
      label: 'DATA',
      existing: '코드 스크립트',
      auta: ['Figma JSON', '(개발과 피그마 관리간을 통합)']
    },
    {
      label: 'ANALYSIS',
      existing: ['위치/이벤트', '단일 기준'],
      auta: ['YOLO + OCR + LLM', '종합 분석']
    },
    {
      label: 'UX',
      existing: '불가',
      auta: '시각화 리포트 가능'
    }
  ];

  return (
    <section 
      id="technical-features" 
      className="relative py-32 md:py-40"
      ref={containerRef}>
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        {/* 섹션 헤더 */}
        <div className="mb-12 text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 mb-4 whitespace-nowrap">
            기존 테스트 도구와 차별화된 AUTA의 혁신적인 접근 방식
          </h2>
          <p className="text-sm md:text-base text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            코드 기반 자동화의 한계를 넘어, Figma 디자인 데이터를 직접 활용하여 UI/UX를 종합적으로 검증합니다. 
            YOLO, OCR, LLM을 결합한 AI 분석으로 시각적 컴포넌트부터 사용자 경험까지 자동으로 평가합니다.
          </p>
        </div>

        {/* 메인 콘텐츠 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 mb-8">
          {/* 좌측: 비교 표 */}
          <div className="flex items-stretch">
            <GlassCard 
              className="p-3 md:p-4 w-full flex flex-col"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
              }}
            >
              <table className="w-full text-base flex-1">
                <thead>
                  <tr className="border-b-2 border-neutral-300">
                    <th className="py-1.5 px-2 text-left font-bold text-neutral-900 w-[120px]"></th>
                    <th className="py-1.5 px-2 text-center font-bold text-neutral-900">기존 테스트 도구</th>
                    <th className="py-1.5 px-2 text-center font-bold text-neutral-900">AUTA</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, idx) => (
                    <tr 
                      key={idx}
                      className="border-b border-neutral-100 hover:bg-white/50 transition-colors"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: `opacity 0.6s ease-out ${idx * 0.06 + 0.2}s, transform 0.6s ease-out ${idx * 0.06 + 0.2}s`
                      }}
                    >
                      <td className="py-2 px-2 text-left align-middle">
                        <span className="text-sm font-medium text-neutral-500 tracking-widest uppercase whitespace-nowrap">
                          {row.label}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-center align-middle">
                        <div className="flex flex-col items-center gap-1">
                          <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                          {Array.isArray(row.existing) ? (
                            <div className="flex flex-col items-center gap-0.5">
                              <span className="text-neutral-700 text-sm leading-tight">{row.existing[0]}</span>
                              <span className="text-neutral-700 text-sm leading-tight">{row.existing[1]}</span>
                            </div>
                          ) : (
                            <span className="text-neutral-700 text-sm leading-tight break-words max-w-[140px]">{row.existing}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-2 text-center align-middle">
                        <div className="flex flex-col items-center gap-1">
                          <Check className="w-4 h-4 text-[#5CA585] flex-shrink-0" />
                          {Array.isArray(row.auta) ? (
                            <div className="flex flex-col items-center gap-0.5">
                              <span className="text-neutral-900 font-medium text-sm leading-tight">{row.auta[0]}</span>
                              <span className="text-neutral-900 font-medium text-sm leading-tight">{row.auta[1]}</span>
                            </div>
                          ) : (
                            <span className="text-neutral-900 font-medium text-sm leading-tight break-words max-w-[180px]">{row.auta}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </div>

          {/* 우측: 기능 카드 2개 스택 */}
          <div className="space-y-4 flex flex-col h-full">
            {/* 카드 A - UI 테스트 */}
            <GlassCard
              className="p-4 md:p-5 hoverEffect flex-1 h-full"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#5CA585]/20 flex items-center justify-center">
                  <Route className="w-5 h-5 text-[#5CA585]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    UI 테스트
                  </h3>
                  <p className="text-xs text-neutral-600">
                    화면·컴포넌트 일치 검증
                  </p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-neutral-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#5CA585] mt-1 font-bold">•</span>
                  <span><strong>Routing</strong> (화면 이동)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5CA585] mt-1 font-bold">•</span>
                  <span><strong>Interaction</strong> (버튼·내비 등 상호작용)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5CA585] mt-1 font-bold">•</span>
                  <span><strong>Component Matching</strong> (컴포넌트 매칭)</span>
                </li>
              </ul>
              <p className="text-sm text-neutral-600 leading-relaxed">
                3가지 테스트를 자동 수행해, 화면 간 흐름과 시각적 일치를 동시에 점검합니다.
              </p>
            </GlassCard>

            {/* 카드 B - UX 테스트 */}
            <GlassCard
              className="p-4 md:p-5 hoverEffect flex-1 h-full"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#5CA585]/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-[#5CA585]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    UX 테스트
                  </h3>
                  <p className="text-xs text-neutral-600">
                    휴리스틱 경험 분석 포함
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-neutral-700">
                <p className="leading-relaxed">
                  AUTA는 Figma 레이아웃과 시각적 정보를 LLM에 입력하여 <strong>Nielsen 10원칙</strong> 기준의 위반 가능성을 탐지합니다.
                </p>
                <p className="leading-relaxed">
                  결과는 <strong>근거 캡처 + 권고 문장</strong>으로 리포트됩니다.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* 하단: 주석형 설명 박스 */}
        <GlassCard
          className="p-6 md:p-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out 0.7s, transform 0.8s ease-out 0.7s'
          }}
        >
          <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
            <p>
              <strong>AUTA는 Figma 프로토타입의 인터랙션 정보를 직접 해석</strong>하여 한 개의 홈페이지 URL만으로 UI 테스트 탐색을 수행합니다.
            </p>
            <p>
              별도의 스크립트 작성 없이도 디자인 상의 숨은 상태(hover, 뒤로 가기, 오버레이)를 그대로 재현하며, 실제 화면의 설계 환경을 자동으로 탐색·검증할 수 있습니다.
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default TechnicalFeatures;
