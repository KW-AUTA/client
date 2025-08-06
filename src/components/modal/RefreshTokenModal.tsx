import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/constants';

import { toast } from 'react-toastify';

interface RefreshTokenModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onLogout: () => void;
}

const RefreshTokenModal: React.FC<RefreshTokenModalProps> = ({ open, onClose, onSuccess, onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshToken = async () => {
    setIsLoading(true);
    try {
      // 리프레시 API를 통해 새로운 액세스 토큰 발급
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || 'http://219.255.242.174:8080/api/v1'}${API_ENDPOINTS.AUTH.REFRESH}`,
        {},
        { withCredentials: true }
      );

      const newAccessToken = response.data.data?.accessToken;
      if (newAccessToken) {
        // 새 토큰 저장
        localStorage.setItem('token', newAccessToken);

        toast.success('토큰이 성공적으로 갱신되었습니다!');
        onSuccess();
        onClose();
      } else {
        throw new Error('새 액세스 토큰을 받지 못했습니다.');
      }
    } catch (error: any) {
      console.error('토큰 갱신 실패:', error);

      if (error.response?.status === 401) {
        toast.error('리프레시 토큰이 만료되었습니다. 다시 로그인해주세요.');
        // 리프레시 토큰도 만료된 경우 로그아웃 처리
        onLogout();
      } else {
        toast.error('토큰 갱신에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">세션 만료</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" disabled={isLoading}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 mb-4">계속 서비스를 이용하시겠습니까?</p>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            onClick={handleRefreshToken}
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? '처리중...' : '계속 이용'}
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefreshTokenModal;
