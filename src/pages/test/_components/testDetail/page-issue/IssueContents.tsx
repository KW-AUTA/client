import type { PageIssue } from '@/types/test.type';
import type { TabMeta } from './IssueDropdown';

interface IssueContentsProps {
  issueData: PageIssue;
  tabMeta: TabMeta;
}

export default function IssueContents({ issueData, tabMeta }: IssueContentsProps) {
  const { category, index } = tabMeta;

  let failItem:
    | { expectedDestination: string; actualDestination: string; failReason: string }
    | { componentName: string; failReason: string }
    | { expectedAction: string; actualAction: string; failReason: string };

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
        <p className="font-medium text-11 text-typography-dark">
          요소 클릭 시 예상된 경로(/dashboard)로 이동하지 않고 /error 페이지로 리디렉션되었습니다. 버튼 혹은 링크에
          연결된 라우팅 설정이 올바르지 않거나, 조건문 내부 로직에서 예외가 발생했을 가능성이 있습니다. 먼저 해당 트리거
          요소의 클릭 이벤트 핸들러 또는 라우터 설정을 점검해보시기 바랍니다. <br />
          <br />
          또한, 접근 권한이나 로그인 세션 등의 조건에 따라 /dashboard로의 이동이 차단되었는지도 확인이 필요합니다.
          페이지 이동 시점의 콘솔 로그와 네트워크 응답을 함께 점검하면 문제 원인을 식별할 수 있습니다. 불일치가
          반복된다면, 테스트 대상 요소의 selector 또는 조건 분기 로직을 리팩터링하는 것이 권장됩니다.
        </p>
      </div>
    </div>
  );
}
