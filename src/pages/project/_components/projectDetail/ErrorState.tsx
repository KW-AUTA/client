import Button from '@/components/ui/button/Button';
import ErrorIcon from '@/assets/images/error.png';

interface ErrorStateProps {
  onOpenTestModal: () => void;
  isRunningTest?: boolean;
}

export default function ErrorState({ onOpenTestModal, isRunningTest = false }: ErrorStateProps) {
  return (
    <section className="rounded-2xl w-full">
      <div className="relative flex flex-col items-center justify-center h-64 bg-red-50/60 backdrop-blur-lg ring-1 ring-red-200/50 rounded-2xl shadow-md gap-4">
        <div className="flex gap-3 items-center">
          <img src={ErrorIcon} alt="" className="w-12 h-12" />
          <p className="text-typography-dark font-bold text-20">테스트 요청 실패</p>
        </div>
        <p className="text-typography-gray">다시 테스트 요청을 실행해주세요.</p>
        <div className="pt-2">
          <Button
            text={isRunningTest ? '테스트 시작 중...' : '테스트 다시하기'}
            onClick={onOpenTestModal}
            disabled={isRunningTest}
            className="w-96 text-16 border-none bg-red-500/90 backdrop-blur-lg text-white hover:bg-red-500 active:bg-red-600 disabled:opacity-50 shadow-md transition-all duration-300"
          />
        </div>
      </div>
    </section>
  );
}
