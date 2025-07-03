import Button from '@/components/ui/button/Button';

interface NotStartedStateProps {
  onOpenTestModal: () => void; // 모달만 열기
  isRunningTest?: boolean;
}

export default function NotStartedState({ onOpenTestModal, isRunningTest = false }: NotStartedStateProps) {
  return (
    <div className="shadow-custom rounded-15 p-6 w-full">
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 gap-4">
        <div className="flex flex-col gap-3 items-center">
          <p className="text-typography-gray">프로젝트 설정이 완료되었습니다.</p>
          <p className="text-blue-600 font-medium">지금 바로 자동화 테스트를 시작해보세요! 🚀</p>
        </div>

        <div className="pt-2">
          <Button
            text={isRunningTest ? '테스트 시작 중...' : '테스트 시작하기'}
            onClick={onOpenTestModal}
            disabled={isRunningTest}
            className="w-96 text-16 border-none bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
}
