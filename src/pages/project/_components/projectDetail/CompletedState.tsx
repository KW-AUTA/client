import ProjectPageTable from '@/pages/project/_components/projectDetail/ProjectPageTable';
import ProjectSummaryGraph from '@/pages/project/_components/projectDetail/ProjectSummaryGraph';
import { ProjectDetailData } from '@/types/project.type';

interface CompleteStateProps {
  projectDetail: ProjectDetailData;
}
export default function CompletedState({ projectDetail }: CompleteStateProps) {
  return (
    <section className="flex gap-8 mt-4 mb-6 h-72 children:shadow-custom children:rounded-15 children:bg-transparent">
      {projectDetail.testSummary && <ProjectSummaryGraph testSummary={projectDetail.testSummary} />}
      <ProjectPageTable pages={projectDetail?.pages || []} />
    </section>
  );
}
