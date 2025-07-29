import { TestStatusType } from '@/types/test.type';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusMap: Record<string, TestStatusType> = {
  통과: 'PASSED',
  실패: 'FAILED',
  준비: 'READY',
  '실행 중': 'RUNNING',
  PASSED: 'PASSED',
  FAILED: 'FAILED',
  READY: 'READY',
  RUNNING: 'RUNNING'
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const mappedStatus: TestStatusType = statusMap[status] ?? 'READY';

  const getStatusStyle = (status: TestStatusType): string => {
    switch (status) {
      case 'PASSED':
        return `bg-green-100 text-green-600 text-11 font-medium`;
      case 'FAILED':
        return `bg-red-100 text-red-600 text-11 font-medium`;
      case 'READY':
        return `bg-gray-100 text-gray-600 text-11 font-medium`;
      case 'RUNNING':
        return `bg-blue-100 text-blue-600 text-11 font-medium`;
      default:
        return `bg-gray-100 text-gray-600 text-11 font-medium`;
    }
  };

  const getStatusText = (status: TestStatusType): string => {
    switch (status) {
      case 'PASSED':
        return `통과`;
      case 'FAILED':
        return `실패`;
      case 'READY':
        return `준비`;
      case 'RUNNING':
        return `실행 중`;
      default:
        return `준비 중`;
    }
  };

  const getDotColor = (status: TestStatusType): string => {
    switch (status) {
      case 'PASSED':
        return `bg-green-600`;
      case 'FAILED':
        return `bg-red-600`;
      case 'READY':
        return `bg-gray-600`;
      case 'RUNNING':
        return `bg-blue-600`;
      default:
        return `bg-gray-600`;
    }
  };

  return (
    <div className={`rounded-20 px-3 py-2 flex items-center w-fit ${getStatusStyle(mappedStatus)} ${className}`}>
      <span className={`w-2 h-2 rounded-full mr-2 ${getDotColor(mappedStatus)}`}></span>
      {getStatusText(mappedStatus)}
    </div>
  );
};

export default StatusBadge;
