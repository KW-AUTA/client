import Button from '@/components/ui/button/Button';
import { ROUTES } from '@/constants';
import ProjectPageTable from '@/pages/project/_components/projectDetail/ProjectPageTable';
import ProjectSummaryGraph from '@/pages/project/_components/projectDetail/ProjectSummaryGraph';
import { ProjectDetailData } from '@/types/project.type';
import { useNavigate, useParams } from 'react-router-dom';

interface TestResultProps {
  projectDetail: ProjectDetailData;
}
export default function TestResult({ projectDetail }: TestResultProps) {
  const navigate = useNavigate();
  const { projectId } = useParams();

  return (
    <div>
      <div className="flex justify-between">
        <p className="font-bold text-14 text-typography-dark pl-4">테스트 결과</p>
        <Button
          text="테스트 리포트 바로가기"
          className="border-none bg-[#5CA585]/90 backdrop-blur-lg text-white hover:bg-[#5CA585] shadow-md h-9 px-6 rounded-lg transition-all duration-300"
          onClick={() => {
            navigate(ROUTES.TEST_DETAIL.replace(':projectId', String(projectId)));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
      <div className="flex gap-8 mt-4 mb-6 h-72 children:shadow-custom children:rounded-15 children:bg-transparent">
        {projectDetail.testSummary && <ProjectSummaryGraph testSummary={projectDetail.testSummary} />}
        <ProjectPageTable pages={projectDetail?.pages || []} />
      </div>
    </div>
  );
}
