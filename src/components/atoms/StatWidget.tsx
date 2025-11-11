import { ReactNode } from 'react';
import GlassCard from './GlassCard';

interface StatWidgetProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  note?: string;
  className?: string;
}

/**
 * Floating Stats 위젯 (Hero 섹션용)
 * Glass morphism 스타일
 */
export const StatWidget = ({ label, value, icon, note, className = '' }: StatWidgetProps) => {
  return (
    <GlassCard className={`p-4 ${className}`} hoverEffect>
      <div className="flex items-center space-x-3">
        {icon && <div className="flex-shrink-0 text-brand-blue">{icon}</div>}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-neutral-700 font-medium">{label}</p>
          <p className="text-lg font-bold text-neutral-900 mt-0.5">{value}</p>
          {note && <p className="text-[10px] text-neutral-300 mt-1">{note}</p>}
        </div>
      </div>
    </GlassCard>
  );
};

export default StatWidget;
