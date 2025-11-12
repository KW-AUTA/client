import Button from '@/components/ui/button/Button';
import LinearProgressBar from '@/components/ui/progressBar/LinearProgressBar';
import { TestData } from '@/types/test.type';
import { calculatePercentage } from '@/utils/useCalculateTestPercentage';

interface TestListItemProps {
  data: TestData;
  handleClickRegisterButton: (projectId: number) => void;
}

export default function TestListItem({ data, handleClickRegisterButton }: TestListItemProps) {
  const {
    projectName: projectName = '테스트 프로젝트 이름',
    projectCreatedDate = '',
    successRoutingTest = 0,
    successInteractionTest = 0,
    successMappingTest = 0,
    totalRoutingTest = 0,
    totalInteractionTest = 0,
    totalMappingTest = 0
  } = data || {};

  // 테스트 성공률 계산
  const routingPercentage = calculatePercentage(successRoutingTest, totalRoutingTest);
  const interactionPercentage = calculatePercentage(successInteractionTest, totalInteractionTest);
  const mappingPercentage = calculatePercentage(successMappingTest, totalMappingTest);

  // 총 테스트 계산
  const totalTests = totalRoutingTest + totalInteractionTest + totalMappingTest;
  const successTests = successRoutingTest + successInteractionTest + successMappingTest;

  return (
    <div
      onClick={() => handleClickRegisterButton(data.projectId)}
      className="bg-white/80 backdrop-blur-lg ring-1 ring-white/40 rounded-2xl shadow-md pt-5 px-6 pb-4 space-y-3 hover:bg-white/90 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <span className="w-[15px] h-[15px] rounded-full bg-[#5CA585] shadow-sm"></span>
          <p className="font-semibold text-16">{projectName}</p>
        </div>
        <p className="font-medium text-11 text-neutral-500">{projectCreatedDate}</p>
      </div>
      <ul className="space-y-4 py-2">
        <li className="space-y-1">
          <p className="font-semibold text-11">라우팅 테스트</p>
          <LinearProgressBar
            value={routingPercentage}
            success={successRoutingTest}
            total={totalRoutingTest}
            color="bg-teal_1"
          />
        </li>
        <li className="space-y-1">
          <p className="font-semibold text-11">인터랙션 테스트</p>
          <LinearProgressBar
            value={interactionPercentage}
            success={successInteractionTest}
            total={totalInteractionTest}
            color="bg-purple_1"
          />
        </li>
        <li className="space-y-1">
          <p className="font-semibold text-11">컴포넌트 테스트</p>
          <LinearProgressBar
            value={mappingPercentage}
            success={successMappingTest}
            total={totalMappingTest}
            color="bg-brown_1"
          />
        </li>
      </ul>
      <p className="font-medium text-11 text-neutral-600 py-2">
        총 테스트 {successTests}/{totalTests} 통과
      </p>
      <Button
        text="보기"
        className="w-full bg-[#5CA585]/90 backdrop-blur-lg text-white hover:bg-[#5CA585] border-none shadow-sm transition-all duration-300"
      />
    </div>
  );
}
