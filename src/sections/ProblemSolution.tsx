import GlassCard from '../components/atoms/GlassCard';
import translations from '@/locales/ko-v4.json';

/**
 * Problem & Solution 섹션
 * 문제 제기 → AUTA의 해결책 제시
 */
export const ProblemSolution = () => {
  const { problem } = translations;

  return (
    <section 
      id="problem-solution" 
      className="relative py-32 md:py-40">
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
            {problem.title}
          </h2>
          <p className="text-lg text-neutral-700">
            {problem.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* 문제 상황 */}
          <GlassCard className="p-8" hoverEffect>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                {problem.problem.title}
              </h3>
              <ul className="space-y-3 text-neutral-700">
                {problem.problem.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-red-500 font-bold mt-1">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>

          {/* AUTA의 해결책 */}
          <GlassCard className="p-8" hoverEffect>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                {problem.solution.title}
              </h3>
              <ul className="space-y-3 text-neutral-700">
                {problem.solution.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-brand-blue font-bold mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;

