import { useMemo } from 'react';
import { Filters } from '@/pages/test/_components/testDetail/page-issue/CheckBoxes';
import { TabMeta } from '@/pages/test/_components/testDetail/page-issue/IssueDropdown';
import { FailComponent, InteractionFail, PageIssue, RoutingFail } from '@/types/test.type';

export const useIssueData = (issueData: PageIssue, filters: Filters) => {
  // 카테고리별 이슈 개수 계산
  const issueCounts = useMemo(
    () => ({
      routing: issueData?.routingTest?.fail?.length || 0,
      mapping: issueData?.mappingTest?.failComponents?.length || 0,
      interaction: issueData?.interactionTest?.fail?.length || 0
    }),
    [issueData]
  );

  const tabMeta = useMemo(() => {
    const meta: TabMeta[] = [];

    if (filters.routing && issueData.routingTest?.fail) {
      issueData.routingTest.fail.forEach((_: RoutingFail, index: number) => {
        meta.push({
          category: 'routing',
          index,
          label: `라우팅 이슈 ${index + 1}`
        });
      });
    }
    if (filters.mapping && issueData.mappingTest?.failComponents) {
      issueData.mappingTest.failComponents.forEach((_: FailComponent, index: number) => {
        meta.push({
          category: 'mapping',
          index,
          label: `컴포넌트 매핑 이슈 ${index + 1}`
        });
      });
    }
    if (filters.interaction && issueData.interactionTest?.fail) {
      issueData.interactionTest.fail.forEach((_: InteractionFail, index: number) => {
        meta.push({
          category: 'interaction',
          index,
          label: `인터렉션 이슈 ${index + 1}`
        });
      });
    }

    return meta;
  }, [issueData, filters]);

  return { issueCounts, tabMeta };
};
