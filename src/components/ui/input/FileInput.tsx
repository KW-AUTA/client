import { ChangeEvent, InputHTMLAttributes, useEffect, useId, useState, ReactNode } from 'react';
import UploadIcon from '@/assets/icons/upload.svg';

interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'accept'> {
  label?: string;
  name?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  labelButton?: ReactNode;
  disableLabelClick?: boolean;
  fileName?: string | null;
  onChange?: (file: File | null) => void;
}

export default function FileInput({
  label,
  name,
  className = '',
  labelClassName = '',
  labelButton,
  disableLabelClick = true,
  required = false,
  fileName,
  onChange,
  disabled,
  ...props
}: FileInputProps) {
  const inputId = useId();
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fileName) {
      setSelectedFileName(fileName);
    }
  }, [fileName]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop()?.toLowerCase();

      if (fileExtension === 'json') {
        setSelectedFileName(fileName);
        setError(null);
        if (onChange) {
          onChange(file);
        }
      } else {
        setSelectedFileName(null);
        e.target.value = '';
        const errorMessage = '*.json 파일만 업로드 가능합니다.';
        setError(errorMessage);
        if (onChange) {
          onChange(null);
        }

        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } else {
      setSelectedFileName(null);
      setError(null);
      if (onChange) {
        onChange(null);
      }
    }
  };

  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (disableLabelClick) {
      e.preventDefault();
    }
  };

  return (
    <div>
      {label && (
        <div className="flex items-center gap-4 mb-2 ml-2">
          <label
            htmlFor={disableLabelClick ? undefined : inputId}
            className={`font-medium text-14 text-neutral-700 ${disableLabelClick ? 'cursor-default' : 'cursor-pointer'} ${labelClassName}`}
            onClick={handleLabelClick}>
            {label}
            {required && <span className="text-[#5CA585]"> (*필수)</span>}
          </label>
          {labelButton && <div className="flex items-center">{labelButton}</div>}
        </div>
      )}
      <label
        htmlFor={inputId}
        className={`w-full bg-white/60 backdrop-blur-md ring-1 ring-gray-200/50 rounded-xl px-4 py-3 flex items-center gap-2 
          shadow-[0_2px_8px_rgba(0,0,0,0.08)]
          transition-all duration-300
          ${
            disabled
              ? 'bg-gray-100/80 cursor-not-allowed opacity-60'
              : 'cursor-pointer hover:bg-white/75 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]'
          } ${className}`}>
        <input
          id={inputId}
          type="file"
          name={name}
          accept=".json"
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
          {...props}
        />
        <img src={UploadIcon} alt="upload icon" className={`w-4 h-4 ${disabled ? 'opacity-50' : ''}`} />
        <span className={`${selectedFileName ? 'text-neutral-800 font-medium' : 'text-neutral-400'} truncate`}>
          {selectedFileName || '파일 업로드'}
        </span>
      </label>

      {error && (
        <p className="text-red-600 text-sm mt-2 ml-2 bg-red-50/80 backdrop-blur-md ring-1 ring-red-200/50 rounded-lg px-3 py-1.5 inline-block">
          {error}
        </p>
      )}
    </div>
  );
}
