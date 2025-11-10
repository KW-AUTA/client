import { Link2, Search, FileBarChart } from 'lucide-react';
import GlassCard from '../components/atoms/GlassCard';
import translations from '@/locales/ko-v4.json';

/**
 * v4 How It Works 섹션 (3단계만)
 */
export const HowItWorks = () => {
  const { how } = translations;
  const icons = [Link2, Search, FileBarChart];

  return (
    <section 
      id="how-it-works" 
      className="py-22 md:py-26 bg-white">
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
            {how.title}
          </h2>
          <p className="text-lg text-neutral-700">
            {how.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {how.steps.map((step, idx) => {
            const Icon = icons[idx];
            return (
              <GlassCard key={idx} className="p-8 text-center" hoverEffect>
                <div className="w-16 h-16 bg-brand-blue text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.num}
                </div>
                <Icon className="w-12 h-12 text-brand-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {step.desc}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

