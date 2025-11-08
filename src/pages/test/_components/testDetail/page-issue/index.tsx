import { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { TestDetail } from '@/types/test.type';
import { useGetPageIssue } from '@/store/queries/test/useTestQueries';
import { useGetProjectDetail } from '@/store/queries/project/useProjectQueries';
import CheckBoxes, { Filters } from '@/pages/test/_components/testDetail/page-issue/CheckBoxes';
import PageButtons from '@/pages/test/_components/testDetail/page-issue/PageButtons';
import GoToFigmaButton from '@/pages/test/_components/testDetail/page-issue/GoToFigmaButton';
import PageLoader from '@/components/ui/loader/PageLoader';
import IssueDropdown from '@/pages/test/_components/testDetail/page-issue/IssueDropdown';
import { useIssueData } from '@/pages/test/_hooks/useIssueData';

interface PageIssueSectionProps {
  testDetail: TestDetail;
}

export default function PageIssueSection({ testDetail }: PageIssueSectionProps) {
  const params = useParams();
  const projectId = params.projectId;
  const pages = testDetail.pages;
  const [selectedIssueIndex, setSelectedIssueIndex] = useState(0); // 현재 선택된 이슈 인덱스
  const [activePageIndex, setActivePageIndex] = useState(0); // 현재 선택된 페이지 인덱스
  const [filters, setFilters] = useState<Filters>({
    routing: true,
    interaction: true,
    mapping: true
  });
  const pageId = pages[activePageIndex]?.pageId ?? 0;

  const { data: projectDetail } = useGetProjectDetail(Number(projectId));
  const { data: issueData, isLoading: isPending, isError } = useGetPageIssue(pageId);

  const { issueCounts, tabMeta } = useIssueData(issueData || {}, filters);

  if (isPending) {
    return <PageLoader />;
  }
  if (isError || !issueData) {
    return <div className="py-20 text-center text-red-500">페이지 이슈 불러오기 실패</div>;
  }

  if (tabMeta.length === 0) {
    return (
      <div>
        <PageButtons
          pages={pages}
          activePageIndex={activePageIndex}
          onSelectPage={(pageId: number) => {
            setActivePageIndex(pageId);
          }}
        />
        <CheckBoxes filters={filters} onChange={setFilters} issueCounts={issueCounts} />
        <section className="shadow-custom p-6 rounded-15">
          <p className="border border-dashed border-typography-gray p-4 rounded-15 w-full min-h-[200px] h-full flex justify-center items-center">
            해당 테스트에 대해 검출된 이슈가 없습니다.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageButtons
        pages={pages}
        activePageIndex={activePageIndex}
        onSelectPage={(pageId: number) => {
          setActivePageIndex(pageId);
        }}
      />
      <CheckBoxes filters={filters} onChange={setFilters} issueCounts={issueCounts} />

      <section className="shadow-custom rounded-15 pt-7 px-10 pb-4 space-y-4">
        <IssueDropdown
          tabMeta={tabMeta}
          selectedIssueIndex={selectedIssueIndex}
          onSelectIssue={(index: number) => setSelectedIssueIndex(index)}
          issueData={issueData}
        />
        <GoToFigmaButton figmaUrl={projectDetail?.figmaUrl} />
      </section>
    </div>
  );
}
