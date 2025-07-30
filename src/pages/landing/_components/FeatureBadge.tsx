interface FeatureBadgeProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const FeatureBadge = ({ text, variant = 'primary', size = 'md', className = '' }: FeatureBadgeProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'secondary':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'success':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'md':
        return 'px-3 py-1 text-sm';
      case 'lg':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1 text-sm';
    }
  };

  return (
    <span
      className={`inline-block font-medium rounded-full border ${getVariantClasses()} ${getSizeClasses()} ${className}`}>
      #{text}
    </span>
  );
};

export default FeatureBadge;
