import Input from '@/components/ui/input/Input';
import FileInput from '@/components/ui/input/FileInput';
import { ChangeEvent } from 'react';

interface DesignSourceProps {
  rootFigmaPage: string;
  fileName?: string | null;
  figmaUrl: string;
  serviceUrl: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFileChange?: (file: File | null) => void;
  disabled?: boolean;
  containerClassName?: string;
}

export default function DesignSourceSection({
  figmaUrl = '',
  serviceUrl = '',
  rootFigmaPage = '',
  onChange,
  onFileChange,
  disabled = false,
  containerClassName = 'bg-white/80 backdrop-blur-lg ring-1 ring-white/40 shadow-md rounded-2xl px-6 pt-6 pb-8 space-y-4',
  fileName
}: DesignSourceProps) {
  return (
    <div>
      <h2 className="font-bold text-14 text-typography-dark pl-4 py-3">디자인 소스</h2>
      <div className={containerClassName}>
        <FileInput
          label="피그마 시안 파일"
          name="figmaFile"
          onChange={onFileChange}
          disabled={disabled}
          required
          fileName={fileName}
          labelButton={
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="border-0 border-b border-[#5CA585] text-[#5CA585] hover:text-[#4a8a6e] font-medium text-11 transition-colors duration-300"
              href="https://www.youtube.com/watch?v=pZ-hYhXEerU">
              업로드 방법
            </a>
          }
        />
        <Input
          label="피그마 시안 URL"
          name="figmaUrl"
          value={figmaUrl}
          required
          onChange={onChange}
          disabled={disabled}
          labelClassName="font-medium text-11"
          className={`h-8 rounded-lg transition-all duration-300 ${
            disabled
              ? 'bg-gray-100/80 text-typography-gray'
              : 'bg-white/60 ring-1 ring-gray-200/50 focus:ring-[#5CA585]/50 focus:bg-white/80'
          }`}
          type="url"
        />
        <Input
          label="배포된 서비스 URL"
          name="serviceUrl"
          value={serviceUrl}
          required
          onChange={onChange}
          disabled={disabled}
          labelClassName="font-medium text-11"
          className={`h-8 rounded-lg transition-all duration-300 ${
            disabled
              ? 'bg-gray-100/80 text-typography-gray'
              : 'bg-white/60 ring-1 ring-gray-200/50 focus:ring-[#5CA585]/50 focus:bg-white/80'
          }`}
          type="url"
        />
        <Input
          label="피그마 루트 페이지"
          name="rootFigmaPage"
          value={rootFigmaPage}
          required
          onChange={onChange}
          disabled={disabled}
          labelClassName="font-medium text-11"
          className={`h-8 rounded-lg transition-all duration-300 ${
            disabled
              ? 'bg-gray-100/80 text-typography-gray'
              : 'bg-white/60 ring-1 ring-gray-200/50 focus:ring-[#5CA585]/50 focus:bg-white/80'
          }`}
          type="text"
        />
      </div>
    </div>
  );
}
