import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
  text?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'default' | 'primary' | 'outline';
}

export default function Button({
  children,
  text,
  className = '',
  disabled,
  leftIcon,
  rightIcon,
  onClick,
  variant = 'default',
  ...props
}: ButtonProps) {
  // variant별 기본 스타일
  const variantClasses = {
    default: 'bg-white/60 backdrop-blur-md ring-1 ring-gray-200/50 text-typography-dark hover:bg-white/80',
    primary: 'bg-[#5CA585]/90 backdrop-blur-md ring-1 ring-white/40 text-white hover:bg-[#5CA585]',
    outline:
      'bg-white/60 backdrop-blur-md ring-2 ring-[#5CA585]/60 text-[#5CA585] hover:bg-white/80 hover:ring-[#5CA585]'
  };

  const baseClasses = `
    rounded-xl
    text-11
    font-medium
    transition-all
    duration-300
    shadow-md
    hover:shadow-lg
    disabled:opacity-50
    disabled:cursor-not-allowed
    flex
    justify-center
    items-center
    py-2 
    px-4
    ${!className?.includes('bg-') && !className?.includes('ring-') ? variantClasses[variant] : ''}
  `;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button className={`${baseClasses} ${className ?? ''}`} disabled={disabled} onClick={handleClick} {...props}>
      {leftIcon && <span className="flex items-center mr-1">{leftIcon}</span>}
      {text || children}
      {rightIcon && <span className="flex items-center ml-1">{rightIcon}</span>}
    </button>
  );
}
