import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetProjectDetail } from '@/store/queries/project/useProjectQueries';
import { useRunTest } from '@/store/queries/test/useTestMutations';
import CommonModal from '@/components/modal/CommonModal';
import PageLoader from '@/components/ui/loader/PageLoader';
import DesignSourceSection from '@/pages/project/_components/projectForm/DesignSourceSection';
import ProjectTitle from '@/pages/project/_components/ProjectTitle';
import ProjectInfo from '@/pages/project/_components/projectDetail/ProjectInfo';
import ProjectControlButtons from '@/pages/project/_components/projectDetail/ProjectControlButtons';
import NotStartedStateSection from '@/pages/project/_components/projectDetail/NotStartedStateSection';
import InProgressStateSection from '@/pages/project/_components/projectDetail/InProgressStateSection';
import CompletedStateSection from '@/pages/project/_components/projectDetail/CompletedStateSection';
import ErrorState from '@/pages/project/_components/projectDetail/ErrorState';

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const { data: projectDetail, isPending, isError, refetch } = useGetProjectDetail(Number(projectId));
  const { mutate: runTestMutation, isPending: isRunningTest } = useRunTest();
  const [isRunTestModalOpen, setIsRunTestModalOpen] = useState(false);

  const handleRunTest = () => {
    runTestMutation(Number(projectId), {
      onSuccess: () => {
        toast.success('테스트 실행이 시작되었습니다.\n완료까지 몇 분 소요될 수 있습니다.');
        refetch();
      },
      onError: () => {
        toast.error('테스트 실행 요청이 실패했습니다.\n다시 시도해주세요.');
      }
    });
    setIsRunTestModalOpen(false);
  };

  const handleOpenTestModal = () => {
    setIsRunTestModalOpen(true);
  };

  const handleCloseTestModal = () => {
    setIsRunTestModalOpen(false);
  };

  // projectStatus별 렌더링 함수
  const renderProjectStatusSection = () => {
    const status = projectDetail?.projectInfo?.projectStatus;

    switch (status) {
      case 'NOT_STARTED':
        return <NotStartedStateSection onOpenTestModal={handleOpenTestModal} isRunningTest={isRunningTest} />;
      case 'IN_PROGRESS':
        return <InProgressStateSection />;
      case 'COMPLETED':
        return <CompletedStateSection projectDetail={projectDetail} />;
      case 'ERROR':
        return <ErrorState onOpenTestModal={handleOpenTestModal} isRunningTest={isRunningTest} />;
      default:
        return <NotStartedStateSection onOpenTestModal={handleOpenTestModal} isRunningTest={isRunningTest} />;
    }
  };

  if (isPending) return <PageLoader />;
  if (isError) return <div className="py-20 text-center text-red-500">오류가 발생했습니다.</div>;

  return (
    <div className="w-[90%] flex flex-col m-auto">
      <ProjectTitle />
      <ProjectInfo {...projectDetail?.projectInfo} />
      <span className="border border-typography-gray my-4"></span>

      <section>{renderProjectStatusSection()}</section>

      <DesignSourceSection
        {...projectDetail?.figmaInfo}
        containerClassName="border-none shadow-custom rounded-15 px-6 pt-6 pb-8 space-y-4"
        disabled
      />

      <ProjectControlButtons
        projectId={Number(projectId)}
        {...projectDetail?.projectInfo}
        onOpenTestModal={handleOpenTestModal}
      />

      <CommonModal
        isOpen={isRunTestModalOpen}
        onClose={handleCloseTestModal}
        onConfirm={handleRunTest}
        title="테스트 실행"
        cancelText="취소">
        {projectDetail?.projectInfo?.projectName}에 대해 테스트를 실행하시겠습니까?
      </CommonModal>
    </div>
  );
}
