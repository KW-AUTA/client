import { ChangeEvent, TextareaHTMLAttributes, useId } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  rows?: number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onEnterPress?: () => void;
}

export default function Textarea({
  label,
  name,
  value,
  className = '',
  labelClassName = '',
  required = false,
  rows = 4,
  onChange,
  onEnterPress,
  ...props
}: TextareaProps) {
  const textareaId = useId();

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <div>
      {label && (
        <label htmlFor={textareaId} className={`block mb-2 ml-2 font-bold text-14 text-neutral-700 ${labelClassName}`}>
          {label}
          {required && <span className="text-[#5CA585]"> (*필수)</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`w-full bg-white/60 backdrop-blur-md ring-1 ring-gray-200/50 rounded-xl px-4 py-3
          text-neutral-800
          placeholder:text-neutral-400
          shadow-[0_2px_8px_rgba(0,0,0,0.08)]
          hover:bg-white/75 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
          focus:bg-white/80 focus:ring-2 focus:ring-[#5CA585]/30 focus:outline-none focus:shadow-[0_4px_16px_rgba(0,0,0,0.12)]
          transition-all duration-300
          resize-none
          ${className}`}
        value={value}
        name={name}
        onChange={onChange}
        onKeyUp={handleKeyUp}
        required={required}
        rows={rows}
        {...props}
      />
    </div>
  );
}
