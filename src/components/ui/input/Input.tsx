import { forwardRef, ChangeEvent, InputHTMLAttributes, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onEnterPress?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, name, value, className = '', labelClassName = '', required = false, onChange, onEnterPress, ...props },
  ref
) {
  const inputId = useId();

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className={`block mb-2 ml-2 font-bold text-14 text-neutral-700 ${labelClassName}`}>
          {label}
          {required && <span> (*필수)</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type="text"
        className={`w-full bg-white/60 backdrop-blur-md ring-1 ring-gray-200/50 rounded-xl px-4 py-3 
          text-neutral-800
          placeholder:text-neutral-400
          shadow-[0_2px_8px_rgba(0,0,0,0.08)]
          hover:bg-white/75 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
          focus:bg-white/80 focus:ring-2 focus:ring-[#5CA585]/30 focus:outline-none focus:shadow-[0_4px_16px_rgba(0,0,0,0.12)]
          transition-all duration-300
          ${className}`}
        value={value || ''}
        name={name}
        onChange={onChange}
        onKeyUp={handleKeyUp}
        required={required}
        {...props}
      />
    </div>
  );
});

export default Input;
