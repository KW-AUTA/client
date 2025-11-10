import CompareTable from '../components/molecules/CompareTable';
import MetricCards from '../components/molecules/MetricCards';
import ProcessStep from '../components/molecules/ProcessStep';
import translations from '@/locales/ko-v4.json';

/**
 * v4 Proof & Value 섹션 (증거 기반)
 * 비교표 + 성능카드 + 작동구조를 한 섹션에 통합
 */
export const ProofValue = () => {
  const { proof } = translations;

  return (
    <section 
      id="proof-value" 
      className="py-22 md:py-26 bg-neutral-50">
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
            {proof.title}
          </h2>
          <p className="text-lg text-neutral-700">
            {proof.subtitle}
          </p>
        </div>

        {/* 1. 효율 비교 테이블 */}
        <div className="mb-16">
          <CompareTable />
        </div>

        {/* 2. 모델 성능 카드 */}
        <div className="mb-16">
          <MetricCards />
        </div>

        {/* 3. 작동 구조 프로세스 */}
        <div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
            {proof.flow.title}
          </h3>
          <p className="text-sm text-neutral-700 mb-8 text-center">
            {proof.flow.subtitle}
          </p>

          <div className="flex flex-col md:flex-row items-stretch gap-4 max-w-4xl mx-auto">
            {proof.flow.items.map((item, idx) => (
              <ProcessStep 
                key={idx}
                step={item.step}
                text={item.text}
                index={idx}
                total={proof.flow.items.length}
              />
            ))}
          </div>

          <p className="text-xs text-neutral-300 mt-6 text-center">
            {proof.flow.source}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProofValue;

