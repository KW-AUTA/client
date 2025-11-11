import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'brand' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Badge 컴포넌트 (v4 Glass 스타일)
 */
export const Badge = ({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) => {
  const variantClasses = {
    default: 'bg-neutral-100 text-neutral-700',
    brand: 'bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-orange-100 text-orange-700'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
