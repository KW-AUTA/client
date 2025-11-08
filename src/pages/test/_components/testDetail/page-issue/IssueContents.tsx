import type { PageIssue } from '@/types/test.type';
import type { TabMeta } from './IssueDropdown';

interface IssueContentsProps {
  issueData: PageIssue;
  tabMeta: TabMeta;
}

export default function IssueContents({ issueData, tabMeta }: IssueContentsProps) {
  const { category, index } = tabMeta;

  let failItem:
    | { expectedDestination: string; actualDestination: string; failReason: string; detailInfo: string }
    | { componentName: string; failReason: string; detailInfo: string }
    | { expectedAction: string; actualAction: string; failReason: string; detailInfo: string };

  if (category === 'routing') {
    failItem = issueData.routingTest.fail[index];
  } else if (category === 'mapping') {
    failItem = issueData.mappingTest.failComponents[index];
  } else {
    failItem = issueData.interactionTest.fail[index];
  }

  return (
    <div className="pt-6 pb-2 space-y-8">
      <div className="border-[1.5px] border-[#FF0000] rounded-[15px] bg-[#FF0000]/10 py-[22px] px-6 space-y-4">
        <p className="font-bold text-14 text-typography-dark">{(failItem as { failReason: string }).failReason}</p>
        {category === 'routing' && (
          <div className="space-y-2">
            <p className="font-medium text-11 text-typography-dark">
              <span>기대 페이지:</span> {(failItem as { expectedDestination: string }).expectedDestination}
            </p>
            <p className="font-medium text-11 text-typography-dark">
              <span>실제 페이지:</span> {(failItem as { actualDestination: string }).actualDestination}
            </p>
            <p className="font-medium text-11 text-typography-dark">
              <span>실패 이유:</span> {(failItem as { failReason: string }).failReason}
            </p>
          </div>
        )}

        {category === 'mapping' && (
          <div className="space-y-2">
            <p className="font-medium text-11 text-typography-dark">
              <span>컴포넌트 이름:</span> {(failItem as { componentName: string }).componentName}
            </p>
            <p className="font-medium text-11 text-typography-dark">
              <span>실패 이유:</span> {(failItem as { failReason: string }).failReason}
            </p>
          </div>
        )}

        {category === 'interaction' && (
          <div className="space-y-2">
            <p className="font-medium text-11 text-typography-dark">
              <span>기대 동작:</span> {(failItem as { expectedAction: string }).expectedAction}
            </p>
            <p className="font-medium text-11 text-typography-dark">
              <span>실제 동작:</span> {(failItem as { actualAction: string }).actualAction}
            </p>
            <p className="font-medium text-11 text-typography-dark">
              <span>실패 이유:</span> {(failItem as { failReason: string }).failReason}
            </p>
          </div>
        )}
      </div>

      {/* TODO: LLM 개발 완료되면 수정하기 */}
      <div className="border-[1.5px] border-[#0000FF] rounded-[15px] bg-[#0000FF]/10 py-[22px] px-6 space-y-2">
        <p className="font-bold text-14 text-typography-dark">해결 제안</p>
        <p className="font-medium text-11 text-typography-dark">{(failItem as { detailInfo: string }).detailInfo}</p>
      </div>
    </div>
  );
}
