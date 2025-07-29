import LLMResult from '@/pages/project/_components/projectDetail/LLMResult';
import TestResult from '@/pages/project/_components/projectDetail/TestResult';
import { ProjectDetailData } from '@/types/project.type';

interface CompleteStateProps {
  projectDetail: ProjectDetailData;
}
export default function CompletedStateSection({ projectDetail }: CompleteStateProps) {
  return (
    <section>
      <LLMResult projectDetail={projectDetail} />
      <TestResult projectDetail={projectDetail} />
    </section>
  );
}
