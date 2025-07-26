import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';
import Textarea from '@/components/ui/textarea/TextArea';
import DesignSourceSection from '@/pages/project/_components/projectForm/DesignSourceSection';
import { GenerateProject, ProjectDetailData } from '@/types/project.type';
import { getFormattedToday } from '@/utils/format';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

interface ProjectCreateFormPropsType {
  username?: string;
  initialValues?: GenerateProject | ProjectDetailData;
  mode?: 'create' | 'modify';
  onSubmit: (data: GenerateProject, actionType: 'register' | 'test', figmaFile: File | null) => void;
  onCancel: () => void;
  isRegisterLoading?: boolean;
  isTestLoading?: boolean;
}

export default function ProjectCreateForm({
  username,
  initialValues,
  mode = 'create',
  onSubmit,
  onCancel,
  isRegisterLoading,
  isTestLoading
}: ProjectCreateFormPropsType) {
  const [formData, setFormData] = useState<GenerateProject>({
    projectName: '',
    expectedTestExecution: '',
    projectEnd: '',
    description: '',
    figmaUrl: '',
    serviceUrl: '',
    rootFigmaPage: '',
    figmaFile: null,
    fileName: null
  });

  const [figmaFile, setFigmaFile] = useState<File | null>(null);

  console.log('d', initialValues);

  // mode에 따른 텍스트 설정
  const buttonTexts = useMemo(() => {
    const baseText = mode === 'modify' ? '수정' : '등록';
    return {
      primary: isRegisterLoading ? `${baseText} 중...` : baseText,
      secondary: isTestLoading ? `${baseText} 및 테스트 중...` : `${baseText} 후 테스트 생성하기`
    };
  }, [mode, isRegisterLoading, isTestLoading]);

  // ProjectDetailData를 GenerateProject로 변환하는 함수
  // 프로젝트 세부 api 응답 구조가 바껴서 매칭이 안돼 변환하는 작업이 필요해서 함수를 추가적으로 정의해주었습니다..!
  const convertDetailToGenerate = (detail: ProjectDetailData): GenerateProject => {
    return {
      projectName: detail.projectInfo.projectName,
      expectedTestExecution: detail.projectInfo.testExecutionTime,
      projectEnd: detail.projectInfo.projectEnd,
      description: detail.projectInfo.description,
      figmaUrl: detail.figmaInfo.figmaUrl,
      serviceUrl: detail.figmaInfo.serviceUrl,
      rootFigmaPage: detail.figmaInfo.rootFigmaPage,
      administrator: detail.projectInfo.projectAdmin,
      fileName: detail.figmaInfo.fileName,
      figmaFile: null
    };
  };

  // initialValue가 변경될 때 formData 업데이트
  useEffect(() => {
    if (initialValues) {
      let convertedData: GenerateProject;

      // ProjectDetailData인지 GenerateProject인지 확인
      if ('projectInfo' in initialValues) {
        // ProjectDetailData인 경우 변환
        convertedData = convertDetailToGenerate(initialValues as ProjectDetailData);
      } else {
        // GenerateProject인 경우 그대로 사용
        convertedData = {
          ...(initialValues as GenerateProject),
          fileName: (initialValues as GenerateProject).fileName || null
        };
      }

      setFormData(convertedData);
      setFigmaFile(convertedData.figmaFile || null);
    }
  }, [initialValues]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (file: File | null) => {
    setFigmaFile(file);

    setFormData((prev) => ({
      ...prev,
      fileName: file?.name || null
    }));
  };

  const handleRegisterProject = () => {
    onSubmit(formData, 'register', figmaFile);
  };

  const handleRegisterAndTest = () => {
    onSubmit(formData, 'test', figmaFile);
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="space-y-5">
        <Input label="프로젝트명" required name="projectName" value={formData.projectName} onChange={handleChange} />
        <Input
          label="프로젝트 관리자"
          required
          name="username"
          value={username}
          disabled
          className="bg-button-hover text-typography-gray"
        />
        <div className="flex gap-4 children:w-full">
          <Input
            label="테스트 예상 시작일"
            name="expectedTestExecution"
            className=""
            value={formData.expectedTestExecution}
            onChange={handleChange}
            type="date"
            min={getFormattedToday()}
          />
          <Input
            label="프로젝트 마감일"
            name="projectEnd"
            className="w-full"
            value={formData.projectEnd}
            required
            type="date"
            onChange={handleChange}
            min={getFormattedToday()}
          />
        </div>
        <Textarea label="설명" name="description" value={formData.description} onChange={handleChange} />
      </section>

      <section className="flex flex-col gap-5">
        <DesignSourceSection
          figmaUrl={formData.figmaUrl}
          serviceUrl={formData.serviceUrl}
          rootFigmaPage={formData.rootFigmaPage}
          fileName={formData.fileName}
          onChange={handleChange}
          onFileChange={handleFileChange}
        />

        <div className="flex justify-center gap-10 children:px-8 children:font-medium">
          <Button
            text={buttonTexts.primary}
            type="button"
            onClick={handleRegisterProject}
            disabled={isRegisterLoading}
          />
          {mode === 'create' && (
            <Button
              text={buttonTexts.secondary}
              type="button"
              onClick={handleRegisterAndTest}
              disabled={isRegisterLoading}
            />
          )}
          <Button text="취소" type="button" data-submit-type="cancel" onClick={onCancel} disabled={isRegisterLoading} />
        </div>
      </section>
    </div>
  );
}
