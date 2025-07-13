import Button from '@/components/ui/button/Button';
import ErrorIcon from '@/assets/images/error.png';

interface ErrorStateProps {
  onOpenTestModal: () => void; // 모달만 열기
  isRunningTest?: boolean;
}

export default function ErrorState({ onOpenTestModal, isRunningTest = false }: ErrorStateProps) {
  return (
    <section className="rounded-15 w-full bg-transparent">
      <div className="relative flex flex-col items-center justify-center h-64 bg-red_2 rounded-xl border border-red-500 gap-4">
        <div className="flex gap-3 items-center">
          <img src={ErrorIcon} alt="" />
          <p className="text-typography-dart font-bold text-20"> 테스트 요청 실패</p>
        </div>
        <p className="text-typography-gray">다시 테스트 요청을 실행해주세요.</p>
        <div className="pt-2">
          <Button
            text={isRunningTest ? '테스트 시작 중...' : '테스트 다시하기'}
            onClick={onOpenTestModal}
            disabled={isRunningTest}
            className="w-96 text-16 border-none bg-red_1 text-white hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 animate-color-change-red"
          />
        </div>
      </div>
    </section>
  );
}
