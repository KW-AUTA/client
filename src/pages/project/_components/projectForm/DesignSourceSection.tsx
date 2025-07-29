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
  containerClassName = 'border-[0.5px] border-typography-gray rounded-15 px-6 pt-6 pb-8 space-y-4',
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
              className="border-0 border-b border-blue-500 text-blue-500 hover:text-blue-700 font-medium text-11"
              href="https://www.youtube.com/embed/pZ-hYhXEerU?autoplay=0&mute=1&loop=1&playlist=pZ-hYhXEerU">
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
          className={`h-8 rounded-md ${disabled ? 'bg-gray_2 text-typography-gray' : ''}`}
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
          className={`h-8 rounded-md ${disabled ? 'bg-gray_2 text-typography-gray' : ''}`}
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
          className={`h-8 rounded-md ${disabled ? 'bg-gray_2 text-typography-gray' : ''}`}
          type="text"
        />
      </div>
    </div>
  );
}
