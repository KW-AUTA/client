import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/constants';
import { RefreshTokenResponse } from '@/types/auth.type';

const TestTokenButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const expireAccessTokenAndRefresh = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const parts = token.split('.');
      const payload = JSON.parse(atob(parts[1]));

      // exp를 현재 시간보다 1시간 전으로 설정
      payload.exp = Math.floor(Date.now() / 1000) - 3600;

      const fakeToken = parts[0] + '.' + btoa(JSON.stringify(payload)) + '.' + parts[2];
      localStorage.setItem('token', fakeToken);

      // 즉시 리프레시 API 호출
      setIsLoading(true);
      try {
        const response = await axios.post<RefreshTokenResponse>(
          `${import.meta.env.VITE_API_BASE_URL || 'http://219.255.242.174:8080/api/v1'}${API_ENDPOINTS.AUTH.REFRESH}`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.data?.accessToken;
        if (newAccessToken) {
          localStorage.setItem('token', newAccessToken);
          alert('✅ 액세스 토큰이 성공적으로 갱신되었습니다!\n새 토큰: ' + newAccessToken.substring(0, 20) + '...');
        } else {
          throw new Error('새 액세스 토큰을 받지 못했습니다.');
        }
      } catch (error) {
        console.error('리프레시 토큰 갱신 실패:', error);
        alert('❌ 리프레시 토큰 갱신에 실패했습니다. 리프레시 토큰이 만료되었거나 유효하지 않습니다.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const expireRefreshToken = () => {
    // 리프레시 토큰 쿠키 삭제
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    alert('리프레시 토큰이 삭제되었습니다.');
  };

  const testRefreshTokenExpired = async () => {
    // 먼저 리프레시 토큰 삭제
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // 액세스 토큰 만료 설정
    const token = localStorage.getItem('token');
    if (token) {
      const parts = token.split('.');
      const payload = JSON.parse(atob(parts[1]));
      payload.exp = Math.floor(Date.now() / 1000) - 3600;
      const fakeToken = parts[0] + '.' + btoa(JSON.stringify(payload)) + '.' + parts[2];
      localStorage.setItem('token', fakeToken);

      // 즉시 리프레시 API 호출 (실패 예상)
      setIsLoading(true);
      try {
        await axios.post<RefreshTokenResponse>(
          `${import.meta.env.VITE_API_BASE_URL || 'http://219.255.242.174:8080/api/v1'}${API_ENDPOINTS.AUTH.REFRESH}`,
          {},
          { withCredentials: true }
        );
        alert('❌ 예상과 다르게 성공했습니다.');
      } catch (error) {
        console.error('예상된 리프레시 토큰 갱신 실패:', error);
        alert('✅ 예상대로 리프레시 토큰 갱신에 실패했습니다. 로그아웃 처리됩니다.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetTokens = () => {
    localStorage.removeItem('token');
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    alert('모든 토큰이 삭제되었습니다.');
  };

  // 개발 환경에서만 표시
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 9999,
        background: '#f0f0f0',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px'
      }}>
      <h4>토큰 테스트 (개발용)</h4>
      <button
        onClick={expireAccessTokenAndRefresh}
        disabled={isLoading}
        style={{
          margin: '2px',
          padding: '5px',
          backgroundColor: isLoading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}>
        {isLoading ? '처리중...' : '액세스 토큰 만료 + 리프레시'}
      </button>
      <br />
      <button
        onClick={testRefreshTokenExpired}
        disabled={isLoading}
        style={{
          margin: '2px',
          padding: '5px',
          backgroundColor: isLoading ? '#ccc' : '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}>
        {isLoading ? '처리중...' : '리프레시 토큰 만료 테스트'}
      </button>
      <br />
      <button onClick={expireRefreshToken} style={{ margin: '2px', padding: '5px' }}>
        리프레시 토큰만 삭제
      </button>
      <br />
      <button onClick={resetTokens} style={{ margin: '2px', padding: '5px' }}>
        모든 토큰 리셋
      </button>
    </div>
  );
};

export default TestTokenButton;
