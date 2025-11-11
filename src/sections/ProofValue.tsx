import MetricCards from '../components/molecules/MetricCards';
import translations from '@/locales/ko-v4.json';

/**
 * v4 Proof & Value 섹션 (증거 기반)
 * 성능 지표 + 작동 구조
 */
export const ProofValue = () => {
  const { proof } = translations;

  return (
    <section 
      id="proof-value" 
      className="relative py-32 md:py-40">
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

        {/* 모델 성능 카드 */}
        <div>
          <MetricCards />
        </div>
      </div>
    </section>
  );
};

export default ProofValue;

