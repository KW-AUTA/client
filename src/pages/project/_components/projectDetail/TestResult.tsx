import ProjectPageTable from '@/pages/project/_components/projectDetail/ProjectPageTable';
import ProjectSummaryGraph from '@/pages/project/_components/projectDetail/ProjectSummaryGraph';
import { ProjectDetailData } from '@/types/project.type';

interface TestResultProps {
  projectDetail: ProjectDetailData;
}
export default function TestResult({ projectDetail }: TestResultProps) {
  return (
    <div>
      <p className="font-bold text-14 text-typography-dark pl-4">테스트 결과</p>
      <div className="flex gap-8 mt-4 mb-6 h-72 children:shadow-custom children:rounded-15 children:bg-transparent">
        {projectDetail.testSummary && <ProjectSummaryGraph testSummary={projectDetail.testSummary} />}
        <ProjectPageTable pages={projectDetail?.pages || []} />
      </div>
    </div>
  );
}
