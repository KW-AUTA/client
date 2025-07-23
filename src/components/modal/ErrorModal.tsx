import CommonModal from './CommonModal';

interface ErrorModalProps {
  open: boolean;
  message: string;
  onRetry?: () => void;
}

export default function ErrorModal({ open, message, onRetry }: ErrorModalProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };
  return (
    <CommonModal
      isOpen={open}
      onClose={handleRetry}
      onConfirm={handleRetry}
      title="에러발생"
      confirmText="재시도"
      hideCancel={true}>
      <div className="flex flex-col items-center">
        <p className="text-center text-lg text-gray-700 mb-6">{message}</p>
        {/* 버튼 스타일은 CommonModal에서 조정 */}
      </div>
    </CommonModal>
  );
}
