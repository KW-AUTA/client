import { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { FailComponent, InteractionFail, RoutingFail, TestDetail } from '@/types/test.type';
import { useGetPageIssue } from '@/store/queries/test/useTestQueries';
import { useGetProjectDetail } from '@/store/queries/project/useProjectQueries';
import CheckBoxes, { Filters } from '@/pages/test/_components/testDetail/page-issue/CheckBoxes';
import IssueContents from '@/pages/test/_components/testDetail/page-issue/IssueContents';
import IssueTabBar, { TabMeta } from '@/pages/test/_components/testDetail/page-issue/IssueTabBar';
import PageButtons from '@/pages/test/_components/testDetail/page-issue/PageButtons';
import GoToFigmaButton from '@/pages/test/_components/testDetail/page-issue/GoToFigmaButton';

interface PageIssueSectionProps {
  testDetail: TestDetail;
}

export default function PageIssueSection({ testDetail }: PageIssueSectionProps) {
  const params = useParams();
  const projectId = params.projectId;
  const pages = testDetail.pages;
  const [activeTab, setActiveTab] = useState(0);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    routing: true,
    interaction: true,
    mapping: true
  });
  const pageId = pages[activeTab]?.pageId ?? 0;

  const { data: projectDetail } = useGetProjectDetail(Number(projectId));
  const { data: issueData, isLoading: isPending, isError } = useGetPageIssue(pageId);

  if (isPending) {
    return <div className="py-20 text-center">페이지 이슈 로딩 중...</div>;
  }
  if (isError || !issueData) {
    return <div className="py-20 text-center text-red-500">페이지 이슈 불러오기 실패</div>;
  }

  const tabMeta: TabMeta[] = [];

  if (filters.routing && issueData.routingTest?.fail) {
    issueData.routingTest.fail.forEach((item: RoutingFail, index: number) => {
      tabMeta.push({
        category: 'routing',
        index,
        label: item.failReason
      });
    });
  }
  if (filters.mapping && issueData.mappingTest?.failComponents) {
    issueData.mappingTest.failComponents.forEach((item: FailComponent, index: number) => {
      tabMeta.push({
        category: 'mapping',
        index,
        label: item.failReason
      });
    });
  }
  if (filters.interaction && issueData.interactionTest?.fail) {
    issueData.interactionTest.fail.forEach((item: InteractionFail, index: number) => {
      tabMeta.push({
        category: 'interaction',
        index,
        label: item.failReason
      });
    });
  }
  if (tabMeta.length === 0) {
    return (
      <div className="space-y-2">
        <PageButtons
          pages={pages}
          activePageIndex={activePageIndex}
          onSelectPage={(pageId: number) => {
            setActivePageIndex(pageId);
          }}
        />
        <CheckBoxes filters={filters} onChange={setFilters} />
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
          setActiveTab(0);
        }}
      />
      <CheckBoxes filters={filters} onChange={setFilters} />
      <section className="shadow-custom rounded-15 pt-7 px-10 pb-4 space-y-4">
        <IssueTabBar tabMeta={tabMeta} activeTab={activeTab} onSelectTab={(idx) => setActiveTab(idx)} />
        <IssueContents issueData={issueData} tabMeta={tabMeta[activeTab]} />
        <GoToFigmaButton figmaUrl={projectDetail?.figmaUrl} />
      </section>
    </div>
  );
}
