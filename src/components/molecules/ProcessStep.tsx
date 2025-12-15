import { ArrowRight, Link2, Search, FileText } from 'lucide-react';
import GlassCard from '../atoms/GlassCard';

interface ProcessStepProps {
  step: string;
  text: string;
  index: number;
  total: number;
}

/**
 * 작동 구조 프로세스 스텝
 */
export const ProcessStep = ({ step, text, index, total }: ProcessStepProps) => {
  const icons = [Link2, Search, FileText];
  const Icon = icons[index] || Link2;

  return (
    <div className="flex items-center">
      <GlassCard className="flex-1 p-4 flex items-center space-x-3" hoverEffect>
        <div className="flex-shrink-0 w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-sm">
          {step}
        </div>
        <div className="flex-shrink-0">
          <Icon className="w-5 h-5 text-brand-blue" />
        </div>
        <p className="text-sm text-neutral-700 flex-1">{text}</p>
      </GlassCard>

      {index < total - 1 && <ArrowRight className="w-5 h-5 text-neutral-300 mx-2 flex-shrink-0" />}
    </div>
  );
};

export default ProcessStep;
