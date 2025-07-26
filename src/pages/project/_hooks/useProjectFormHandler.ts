import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTES } from '@/constants';
import { GenerateProject } from '@/types/project.type';
import { useRunTest } from '@/store/queries/test/useTestMutations';
import { useGenerateProject, useUpdateProject } from '@/store/queries/project/useProjectMutations';
import { useUserProfile } from '@/store/queries/user/useUserQueries';
import { useGetProjectDetail } from '@/store/queries/project/useProjectQueries';
import { useState } from 'react';

interface UseProjectFromHandlerProps {
  mode: 'create' | 'modify';
}

export const useProjectFormHandler = ({ mode }: UseProjectFromHandlerProps) => {
  const navigate = useNavigate();
  const { projectId } = useParams(); // URL에서 projectId 가져오기
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // API 호출 함수 정의
  const { mutate: generateProject, isPending: isRegisterLoading } = useGenerateProject();
  const { mutate: updateProject } = useUpdateProject(Number(projectId));
  const { mutate: runTest, isPending: isTestLoading } = useRunTest();
  const { data: userData, isPending: isUserDataLoading, isError: isUserDataError } = useUserProfile();
  const {
    data: projectDetail,
    isPending: isProjectLoading,
    isError: isProjectError
  } = useGetProjectDetail(Number(projectId));

  // 등록만 하는 경우, 등록 후 테스트까지 돌리는 경우 타입 정의
  const handleNavigate = (actionType: 'register' | 'test', responseProjectId?: number) => {
    if (actionType === 'register') {
      navigate(ROUTES.PROJECT_DETAIL.replace(':projectId', String(responseProjectId)));
    } else if (actionType === 'test') {
      navigate(ROUTES.TESTS);
    }
  };
  // FormData 생성
  const createFormData = (formData: GenerateProject, actionType: 'register' | 'test', figmaFile: File | null) => {
    const data = new FormData();

    const requestData = {
      projectName: formData.projectName,
      expectedTestExecution: formData.expectedTestExecution || null,
      projectEnd: formData.projectEnd,
      description: formData.description,
      figmaUrl: formData.figmaUrl,
      serviceUrl: formData.serviceUrl,
      rootFigmaPage: formData.rootFigmaPage,
      administrator: userData?.administrator || null,
      actionType: actionType,
      fileName: figmaFile?.name || formData.fileName || null,
      ...(mode === 'modify' && { projectId: Number(projectId) })
    };

    data.append('request', new Blob([JSON.stringify(requestData)], { type: 'application/json' }), 'request.json');

    if (figmaFile && figmaFile instanceof File && figmaFile.size > 0) {
      data.append('file', figmaFile, figmaFile.name);
    } else {
      // 빈 파일 생성 -> 백엔드에서 빈 파일로 받으면 기존 파일 유지해줘야 할 듯
      const emptyJsonFile = new File(['{}'], formData?.fileName || 'empty.json', {
        type: 'application/json'
      });
      data.append('file', emptyJsonFile);
    }

    return data;
  };

  // 프로젝트 제출 처리
  const handleProjectSubmit = (formData: GenerateProject, actionType: 'register' | 'test', figmaFile: File | null) => {
    // 생성 모드일 땐 파일 필수로 업로드
    if (mode === 'create' && (!figmaFile || figmaFile.size === 0)) {
      toast.error('피그마 파일을 업로드해주세요.');
      return;
    }

    const data = createFormData(formData, actionType, figmaFile);
    const mutation = mode === 'create' ? generateProject : updateProject;

    mutation(data, {
      onSuccess: (response) => {
        const successMessage = mode === 'create' ? '프로젝트 생성이 완료되었습니다' : '프로젝트 수정이 완료되었습니다';

        toast.success(successMessage);

        const responseProjectId = response.data?.projectId || Number(projectId);

        if (actionType === 'test' && responseProjectId) {
          runTest(responseProjectId);
        }

        handleNavigate(actionType, responseProjectId);
      },
      onError: (error) => {
        toast.error(error.message || '요청 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    });
  };

  // 프로젝트 생성/수정 취소 모달 핸들러
  const handleCancelProject = () => {
    setIsCancelModalOpen(true);
  };

  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const handleConfirmCancelProject = () => {
    setIsCancelModalOpen(false);

    if (mode === 'create') {
      navigate(ROUTES.HOME);
    } else {
      navigate(ROUTES.PROJECT_DETAIL.replace(':projectId', String(projectId)));
    }
  };

  // mode를 나눠놨으므로 return문 밖에서 여기서 계산해서 밖에서 그냥 변수 갖다 쓰기
  const isPending = mode === 'create' ? isUserDataLoading : isUserDataLoading || isProjectLoading;
  const isError = mode === 'create' ? isUserDataError || !userData : isUserDataError || !userData || isProjectError;
  const username =
    mode === 'create' ? userData?.username : projectDetail?.projectInfo?.projectAdmin || userData?.username;
  const initialValues = mode === 'modify' ? projectDetail : undefined;

  const isRegisterPending = mode === 'create' && isRegisterLoading;

  return {
    isPending,
    isError,
    username,
    initialValues,
    handleProjectSubmit,
    handleCancelProject,
    isRegisterLoading: isRegisterPending,
    isTestLoading,
    isCancelModalOpen,
    handleCloseCancelModal,
    handleConfirmCancelProject
  };
};
