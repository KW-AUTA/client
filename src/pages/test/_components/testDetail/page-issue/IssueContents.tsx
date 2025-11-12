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
      {/* 실패 이슈 */}
      <div className="bg-red-50/80 backdrop-blur-md ring-2 ring-red-400/50 rounded-2xl shadow-md py-6 px-6 space-y-4">
        <p className="font-bold text-14 text-red-700">{(failItem as { failReason: string }).failReason}</p>

        {category === 'routing' && (
          <div className="space-y-2">
            <p className="font-medium text-11 text-neutral-700">
              <span className="font-semibold text-red-600">기대 페이지:</span>{' '}
              {(failItem as { expectedDestination: string }).expectedDestination}
            </p>
            <p className="font-medium text-11 text-neutral-700">
              <span className="font-semibold text-red-600">실제 페이지:</span>{' '}
              {(failItem as { actualDestination: string }).actualDestination}
            </p>
            <p className="font-medium text-11 text-neutral-700">
              <span className="font-semibold text-red-600">실패 이유:</span>{' '}
              {(failItem as { failReason: string }).failReason}
            </p>
          </div>
        )}

        {category === 'mapping' && (
          <div className="space-y-2">
            <p className="font-medium text-11 text-neutral-700">
              <span className="font-semibold text-red-600">컴포넌트 이름:</span>{' '}
              {(failItem as { componentName: string }).componentName}
            </p>
            <p className="font-medium text-11 text-neutral-700">
              <span className="font-semibold text-red-600">실패 이유:</span>{' '}
              {(failItem as { failReason: string }).failReason}
            </p>
          </div>
        )}

        {category === 'interaction' && (
          <div className="space-y-2">
            <p className="font-medium text-11 text-neutral-700">
              <span className="font-semibold text-red-600">기대 동작:</span>{' '}
              {(failItem as { expectedAction: string }).expectedAction}
            </p>
            <p className="font-medium text-11 text-neutral-700">
              <span className="font-semibold text-red-600">실제 동작:</span>{' '}
              {(failItem as { actualAction: string }).actualAction}
            </p>
            <p className="font-medium text-11 text-neutral-700">
              <span className="font-semibold text-red-600">실패 이유:</span>{' '}
              {(failItem as { failReason: string }).failReason}
            </p>
          </div>
        )}
      </div>

      {/* 해결 제안 */}
      <div className="bg-blue-50/80 backdrop-blur-md ring-2 ring-blue-400/50 rounded-2xl shadow-md py-6 px-6 space-y-3">
        <p className="font-bold text-14 text-blue-700">해결 제안</p>
        <p className="font-medium text-11 text-neutral-700 leading-relaxed">
          {(failItem as { detailInfo: string }).detailInfo}
        </p>
      </div>
    </div>
  );
}
