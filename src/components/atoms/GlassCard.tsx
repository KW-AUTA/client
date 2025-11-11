import { ReactNode, forwardRef } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

/**
 * Glass morphism 카드 컴포넌트
 * v4 디자인 시스템 기본 빌딩 블록
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', hoverEffect = false, style, onClick }, ref) => {
    const baseClasses = 'bg-white/70 backdrop-blur-2xl ring-1 ring-white/40 rounded-2xl shadow-lg';
    const hoverClasses = hoverEffect ? 'transition-all duration-300 hover:bg-white/80 hover:shadow-2xl hover:scale-[1.02] hover:ring-white/50' : '';

    return (
      <div ref={ref} className={`${baseClasses} ${hoverClasses} ${className}`} style={style} onClick={onClick}>
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;

