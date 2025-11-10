import { ReactNode, forwardRef } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  style?: React.CSSProperties;
}

/**
 * Glass morphism 카드 컴포넌트
 * v4 디자인 시스템 기본 빌딩 블록
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', hoverEffect = false, style }, ref) => {
    const baseClasses = 'bg-white/60 backdrop-blur-xl ring-1 ring-white/30 rounded-2xl shadow-glass';
    const hoverClasses = hoverEffect ? 'transition-all duration-300 hover:bg-white/70 hover:shadow-xl hover:scale-[1.02]' : '';

    return (
      <div ref={ref} className={`${baseClasses} ${hoverClasses} ${className}`} style={style}>
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;

