import GlassCard from '../components/atoms/GlassCard';
import translations from '@/locales/ko-v4.json';

/**
 * Matching Example 섹션
 * 디자인 vs 구현 비교 시각적 예시
 */
export const MatchingExample = () => {
  const { matching } = translations;

  return (
    <section 
      id="matching-example" 
      className="relative py-32 md:py-40">
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
            {matching.title}
          </h2>
          <p className="text-lg text-neutral-700">
            {matching.subtitle}
          </p>
        </div>

        {/* 예시 갤러리 뼈대 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matching.examples.map((example, idx) => (
            <GlassCard key={idx} className="p-6" hoverEffect>
              <div className="aspect-video bg-neutral-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-neutral-400 text-sm">
                  {example.placeholder || '이미지 영역'}
                </span>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">
                {example.title}
              </h3>
              <p className="text-sm text-neutral-700">
                {example.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MatchingExample;

