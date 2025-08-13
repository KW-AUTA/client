import { useState, useEffect } from 'react';
import { getTokenStatus, manualTokenRefresh, getAutoRefreshTimer } from '@/utils/tokenManager';
import Button from './button/Button';

const TestTokenButton = () => {
  const [tokenStatus, setTokenStatus] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // 초기 토큰 상태 확인
    updateTokenStatus();

    // 5초마다 토큰 상태 업데이트
    const interval = setInterval(updateTokenStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateTokenStatus = () => {
    const status = getTokenStatus();
    setTokenStatus(status);
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      const result = await manualTokenRefresh();
      alert(result.message);
      updateTokenStatus();
    } catch (error) {
      alert('토큰 재발급 중 오류가 발생했습니다.');
    } finally {
      setIsRefreshing(false);
    }
  };

  if (import.meta.env.PROD) {
    return null; // 프로덕션 환경에서는 표시하지 않음
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <h3 className="text-sm font-semibold mb-2 text-gray-700">🔐 토큰 상태 모니터</h3>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">토큰 상태:</span>
          <span
            className={`font-medium ${
              tokenStatus?.status === 'VALID'
                ? 'text-green-600'
                : tokenStatus?.status === 'EXPIRING_SOON'
                  ? 'text-yellow-600'
                  : 'text-red-600'
            }`}>
            {tokenStatus?.status || '확인 중...'}
          </span>
        </div>

        {tokenStatus?.message && <div className="text-xs text-gray-500 mt-1">{tokenStatus.message}</div>}
      </div>

      <div className="mt-3 space-y-2">
        <Button onClick={handleManualRefresh} disabled={isRefreshing} className="w-full text-xs py-1">
          {isRefreshing ? '재발급 중...' : '수동 accessToken 재발급'}
        </Button>

        <Button onClick={updateTokenStatus} className="w-full text-xs py-1">
          상태 새로고침
        </Button>
      </div>
    </div>
  );
};

export default TestTokenButton;
