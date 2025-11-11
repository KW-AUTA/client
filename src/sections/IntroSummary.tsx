import { useState, useEffect, useRef } from 'react';
import GlassCard from '../components/atoms/GlassCard';
import { AlertCircle, Lightbulb, TrendingUp, ArrowLeft } from 'lucide-react';

/**
 * 서론 요약 섹션 - Hero 바로 아래
 * Problem & Context를 발표 슬라이드처럼 표현
 */
export const IntroSummary = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
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

  const cards: Array<{
    label: string;
    icon: typeof AlertCircle;
    title: string;
    description: string;
    detail: string;
    color: string;
    metrics?: { time: string; reduction: string };
    expanded?: {
      headline: string;
      description: string;
      points: Array<{ title: string; desc: string }>;
      conclusion: string;
    };
  }> = [
    {
      label: 'PROBLEM',
      icon: AlertCircle,
      title: '현재 방식의 한계',
      description: '디자인이 바뀔 때마다, UI·UX 테스트는 사람이 직접 화면을 클릭해 확인합니다.',
      detail: '코드 기반 자동화는 디자이너/기획자가 쓰기 어렵고, 스크립트 유지보수가 반복됩니다.',
      color: 'text-red-500',
      expanded: {
        headline: '빠르게 바뀌는 서비스, 여전히 사람 손에 맡겨진 UI 테스트',
        description:
          '현대의 웹·앱 서비스는 하루에도 여러 번 업데이트되지만, 화면이 정말 디자인대로 구현되었는지 확인하는 일은 여전히 사람이 직접 클릭하며 눈으로 확인하는 방식에 의존하고 있습니다. 페이지와 컴포넌트가 많아질수록 테스트 범위는 현실적으로 줄어들고, 중요 화면조차 "시간이 없어서", "다음 스프린트에서"라는 이유로 검증이 미뤄집니다.',
        points: [
          {
            title: '과부하된 QA 리소스',
            desc: '반복적인 시나리오 테스트와 시각 비교에 너무 많은 시간이 소모됩니다.'
          },
          {
            title: '코드 중심 자동화의 장벽',
            desc: '기존 도구(Selenium, Cypress 등)는 스크립트 작성이 필수라, 디자이너·기획자가 직접 쓰기 어렵습니다.'
          },
          {
            title: '시각적 불일치 누락',
            desc: 'DOM 기준, 이벤트 기준 검증만으로는 픽셀, 간격, 타이포, 레이아웃 드리프트를 놓치기 쉽습니다.'
          }
        ],
        conclusion: '이 문제를 해결하려면, 코드가 아니라 디자인 그 자체를 기준으로 한 자동 검증이 필요합니다.'
      }
    },
    {
      label: 'APPROACH',
      icon: Lightbulb,
      title: 'AUTA의 방식',
      description: 'Figma 디자인 데이터를 기준(Figma JSON)으로 실제 웹 화면을 비교합니다.',
      detail: 'AI 시각 분석(예: YOLO)과 텍스트 인식으로 픽셀·레이아웃·텍스트 불일치를 자동 검출합니다.',
      color: 'text-brand-blue'
    },
    {
      label: 'PROOF',
      icon: TrendingUp,
      title: '검증된 효과',
      description: '페이지당 평균 테스트 시간 약 2분',
      detail: '수동 대비 QA 리소스 80% 이상 절감',
      metrics: {
        time: '2분',
        reduction: '80%'
      },
      color: 'text-[#5CA585]'
    }
  ];

  return (
    <section id="intro-summary" className="relative py-32 md:py-40" ref={containerRef}>
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        {/* Eyebrow 배지 */}
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 bg-white/40 backdrop-blur-sm rounded-full text-xs font-medium text-neutral-700 tracking-wider">
            디자인↔구현 불일치, 사실로 설명합니다
          </span>
        </div>

        {/* 섹션 타이틀 */}
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 mb-4 leading-tight">
            사람이 클릭하던 UI 검증,
            <br />
            이제 AI가 근거로 보여줍니다
          </h2>
        </div>

        {/* Glass 카드 3개 그리드 */}
        <div className="relative mb-12">
          <div className={`flex gap-2 md:gap-3 items-stretch flex-col md:flex-row`}>
            {cards.map((card, idx) => {
              const Icon = card.icon;
              const isExpanded = expandedCard === card.label;
              const isCollapsed = expandedCard !== null && expandedCard !== card.label;

              return (
                <div
                  key={idx}
                  className="h-full min-h-[300px] md:min-h-[320px] flex-shrink-0"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? isExpanded
                        ? 'scale(1)'
                        : isCollapsed
                          ? 'scale(1)'
                          : 'translateY(0)'
                      : 'translateY(30px)',
                    width:
                      expandedCard === 'PROBLEM'
                        ? isExpanded
                          ? 'calc(100% - 124px)'
                          : isCollapsed
                            ? '60px'
                            : 'calc((100% - 16px) / 3)'
                        : card.label === 'PROBLEM'
                          ? 'calc((100% - 16px) / 3)'
                          : 'calc((100% - 16px) / 3)',
                    transition: `width 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease-out ${idx * 0.1}s, transform 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${idx * 0.1}s`
                  }}>
                  {isCollapsed ? (
                    /* 축소된 상태: 흰색 막대 */
                    <div
                      className="h-full bg-white rounded-2xl shadow-lg w-full min-h-[300px] md:min-h-[320px] transition-all duration-[1200ms] ease-in-out"
                      style={{
                        minWidth: '60px',
                        width: '100%'
                      }}
                    />
                  ) : (
                    <GlassCard
                      className={`p-3 md:p-4 hoverEffect cursor-pointer relative h-full flex flex-col min-h-[300px] md:min-h-[320px] overflow-hidden w-full ${
                        card.label === 'PROBLEM' ? '' : ''
                      }`}
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        if (card.label === 'PROBLEM') {
                          const newState = isExpanded ? null : 'PROBLEM';
                          console.log('Clicking PROBLEM card, current state:', expandedCard, 'new state:', newState);
                          setExpandedCard(newState);
                        }
                      }}>
                      {isExpanded && card.expanded ? (
                        /* 확장된 Problem 카드 내용 */
                        <div className="space-y-3 flex-1 flex flex-col overflow-y-auto">
                          {/* 닫기 버튼 */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedCard(null);
                            }}
                            className="absolute top-2 right-2 p-2 hover:bg-white/50 rounded-full transition-colors z-10">
                            <ArrowLeft className="w-5 h-5 text-neutral-600" />
                          </button>

                          {/* 헤드라인 */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className={`w-4 h-4 ${card.color}`} />
                              <span className="text-xs font-medium text-neutral-500 tracking-widest uppercase">
                                {card.label}
                              </span>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-neutral-900 mb-3 leading-tight">
                              {card.expanded.headline}
                            </h3>
                          </div>

                          {/* 설명 문단 */}
                          <p className="text-sm text-neutral-700 leading-relaxed mb-2">{card.expanded.description}</p>

                          {/* 문제 포인트 */}
                          <div className="space-y-2">
                            {card.expanded.points.map((point, pIdx) => (
                              <div key={pIdx} className="flex gap-2">
                                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5" />
                                <div>
                                  <h4 className="text-sm font-bold text-neutral-900 mb-0.5">{point.title}</h4>
                                  <p className="text-xs text-neutral-600 leading-relaxed">{point.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* 결론 문장 */}
                          <div className="pt-2 border-t border-neutral-200 mt-auto">
                            <p className="text-sm font-medium text-neutral-900 leading-relaxed">
                              {card.expanded.conclusion}
                            </p>
                          </div>
                        </div>
                      ) : (
                        /* 기본 축소형 카드 내용 */
                        <div className="flex flex-col h-full">
                          {/* 카드 헤더 */}
                          <div className="mb-2">
                            <div className="flex items-center gap-2 mb-1.5">
                              <Icon className={`w-4 h-4 ${card.color}`} />
                              <span className="text-xs font-medium text-neutral-500 tracking-widest uppercase">
                                {card.label}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-1.5">{card.title}</h3>
                          </div>

                          {/* 카드 본문 */}
                          <div className="space-y-1.5 flex-1">
                            <p className="text-sm text-neutral-700 leading-relaxed">{card.description}</p>
                            <p className="text-sm text-neutral-600 leading-relaxed">{card.detail}</p>

                            {/* PROOF 카드의 지표 */}
                            {card.metrics && (
                              <div className="mt-3 pt-3 border-t border-neutral-200">
                                <div className="flex items-center gap-6">
                                  <div className="flex flex-col">
                                    <span className="text-2xl md:text-3xl font-bold text-[#5CA585] mb-0.5">
                                      {card.metrics.time}
                                    </span>
                                    <span className="text-xs text-neutral-500">페이지당 평균</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-2xl md:text-3xl font-bold text-[#5CA585] mb-0.5">
                                      {card.metrics.reduction}
                                    </span>
                                    <span className="text-xs text-neutral-500">리소스 절감</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </GlassCard>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSummary;
