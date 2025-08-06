import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

const AnimatedCard = ({ children, className = '', delay = 0, direction = 'up', duration = 500 }: AnimatedCardProps) => {
  const getTransformClass = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-8';
      case 'down':
        return '-translate-y-8';
      case 'left':
        return 'translate-x-8';
      case 'right':
        return '-translate-x-8';
      default:
        return 'translate-y-8';
    }
  };

  return (
    <div
      className={`opacity-0 ${getTransformClass()} transition-all duration-${duration} ease-out ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
      onAnimationStart={(e) => {
        const target = e.target as HTMLElement;
        target.style.opacity = '1';
        target.style.transform = 'translate(0, 0)';
      }}>
      {children}
    </div>
  );
};

export default AnimatedCard;
