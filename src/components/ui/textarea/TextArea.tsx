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
        <label
          htmlFor={textareaId}
          className={`block mb-2 ml-2 font-bold text-14 text-typography-dark ${labelClassName}`}>
          {label}
          {required && <span> (*필수)</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`w-full bg-background border-[0.5px] border-typography-gray rounded-15 px-4 py-3 placeholder:text-typography-gray focus:border-none focus:shadow-custom focus:outline-none ${className}`}
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
