import { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
  placeholder?: string;
};

export default function Select({ value, onChange, options, className = '', placeholder = '' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const displayText = options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div className="relative w-full min-w-[100px]">
      <button
        type="button"
        className={`w-full max-h-[35px] rounded-xl py-2 px-4 cursor-pointer flex justify-between items-center font-medium text-11 text-typography-dark shadow-md hover:shadow-lg transition-all duration-300 ${
          className || 'bg-white/60 backdrop-blur-md ring-1 ring-gray-200/50 hover:bg-white/75'
        }`}
        onClick={() => setIsOpen((prev) => !prev)}>
        <span>{displayText}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute left-0 right-0 z-10 mt-2 bg-white/95 backdrop-blur-xl ring-1 ring-white/40 rounded-2xl shadow-2xl overflow-hidden">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="py-2.5 px-4 cursor-pointer font-medium text-11 text-typography-dark hover:bg-[#5CA585]/20 transition-colors duration-200 first:pt-3 last:pb-3">
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
