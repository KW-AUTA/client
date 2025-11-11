import Button from '@/components/ui/button/Button';

interface NotStartedStateProps {
  onOpenTestModal: () => void;
  isRunningTest?: boolean;
}

export default function NotStartedStateSection({ onOpenTestModal, isRunningTest = false }: NotStartedStateProps) {
  return (
    <section className="rounded-2xl w-full">
      <div className="flex flex-col items-center justify-center h-64 bg-blue-50/60 backdrop-blur-lg ring-1 ring-blue-200/50 rounded-2xl shadow-md gap-4">
        <div className="flex flex-col gap-3 items-center">
          <p className="text-typography-gray">프로젝트 설정이 완료되었습니다.</p>
          <p className="text-blue-600 font-medium">지금 바로 자동화 테스트를 시작해보세요! 🚀</p>
        </div>
        <div className="pt-2">
          <Button
            text={isRunningTest ? '테스트 시작 중...' : '테스트 시작하기'}
            onClick={onOpenTestModal}
            disabled={isRunningTest}
            className="w-96 text-16 border-none bg-blue-500/90 backdrop-blur-lg text-white hover:bg-blue-500 active:bg-blue-500 disabled:opacity-50 shadow-md transition-all duration-300"
          />
        </div>
      </div>
    </section>
  );
}
