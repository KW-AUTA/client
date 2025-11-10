import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

/**
 * Glass morphism 카드 컴포넌트
 * v4 디자인 시스템 기본 빌딩 블록
 */
export const GlassCard = ({ children, className = '', hoverEffect = false }: GlassCardProps) => {
  const baseClasses = 'bg-white/60 backdrop-blur-xl ring-1 ring-white/30 rounded-2xl shadow-glass';
  const hoverClasses = hoverEffect ? 'transition-all duration-300 hover:bg-white/70 hover:shadow-xl hover:scale-[1.02]' : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;

