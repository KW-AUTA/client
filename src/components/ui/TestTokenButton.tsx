import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/constants';
import { RefreshTokenResponse } from '@/types/auth.type';
import {
  refreshAccessToken,
  startAutoTokenRefresh,
  stopAutoTokenRefresh,
  hasRefreshTokenCookie,
  getTokenExpiryTime,
  isTokenExpiringSoon,
  getAutoRefreshTimer
} from '@/utils/tokenManager';

const TestTokenButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  // 쿠키 수동 설정 함수 (개발용)
  const setCookieManually = () => {
    // 테스트용 리프레시 토큰 쿠키 설정 (Secure 속성 없이)
    document.cookie =
      'refreshToken=test-refresh-token-12345; path=/; max-age=604800; SameSite=Lax; domain=219.255.242.174';
    console.log('수동 쿠키 설정 완료');
    console.log('설정된 쿠키:', document.cookie);
    alert('✅ 테스트용 리프레시 토큰 쿠키가 설정되었습니다!\n쿠키: ' + document.cookie);
  };

  // 쿠키 확인 함수 (개발용)
  const checkCookies = () => {
    const cookies = document.cookie;
    console.log('현재 쿠키:', cookies);
    console.log('쿠키에 refreshToken 포함 여부:', cookies.includes('refreshToken'));
    alert(
      `현재 쿠키:\n${cookies || '쿠키가 없습니다.'}\n\nrefreshToken 포함: ${cookies.includes('refreshToken') ? '예' : '아니오'}`
    );
  };

  // 로그인 함수 (리프레시 토큰 쿠키 받기)
  const loginToGetRefreshToken = async () => {
    setIsLoading(true);
    try {
      console.log('로그인 시작...');
      console.log('현재 쿠키 (로그인 전):', document.cookie);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || 'http://219.255.242.174:8080/api/v1'}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // 중요: 쿠키를 받기 위해 필요
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'testPassword'
          })
        }
      );

      console.log('응답 헤더:', response.headers);
      console.log('Set-Cookie 헤더:', response.headers.get('set-cookie'));

      const data = await response.json();
      console.log('로그인 응답:', data);

      if (data.data?.accessToken) {
        // 액세스 토큰 저장
        localStorage.setItem('token', data.data.accessToken);
        console.log('새 액세스 토큰 저장됨:', data.data.accessToken);
        console.log('localStorage 확인:', localStorage.getItem('token'));

        // 쿠키 확인 (약간의 지연 후)
        setTimeout(() => {
          console.log('쿠키 확인 (로그인 후):', document.cookie);
          alert(
            `✅ 로그인 성공!\n\n액세스 토큰: ${data.data.accessToken.substring(0, 20)}...\n쿠키: ${document.cookie || '쿠키가 없습니다'}`
          );
        }, 100);
      } else {
        throw new Error('로그인 실패: ' + (data.message || '알 수 없는 오류'));
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('❌ 로그인에 실패했습니다.\n' + (error instanceof Error ? error.message : '알 수 없는 오류'));
    } finally {
      setIsLoading(false);
    }
  };

  const expireAccessTokenAndRefresh = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('❌ 액세스 토큰이 없습니다. 먼저 로그인해주세요.');
      return;
    }

    // 쿠키 확인
    if (!hasRefreshTokenCookie()) {
      alert('❌ 리프레시 토큰 쿠키가 없습니다. "쿠키 수동 설정 (개발용)" 버튼을 먼저 클릭해주세요.');
      return;
    }

    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));

    // exp를 현재 시간보다 1시간 전으로 설정
    payload.exp = Math.floor(Date.now() / 1000) - 3600;

    const fakeToken = parts[0] + '.' + btoa(JSON.stringify(payload)) + '.' + parts[2];
    localStorage.setItem('token', fakeToken);
    console.log('액세스 토큰 만료 설정 완료');

    // 즉시 토큰 재발급 시도
    setIsLoading(true);
    try {
      console.log('토큰 재발급 테스트 시작...');
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        console.log('새 액세스 토큰 저장됨:', newAccessToken);
        alert('✅ 액세스 토큰이 성공적으로 갱신되었습니다!\n새 토큰: ' + newAccessToken.substring(0, 20) + '...');
      } else {
        throw new Error('새 액세스 토큰을 받지 못했습니다.');
      }
    } catch (error: any) {
      console.error('토큰 재발급 실패:', error);
      alert(
        `❌ 토큰 재발급에 실패했습니다.\n\n에러: ${error.response?.data?.message || error.message}\n\n해결방법: "쿠키 수동 설정 (개발용)" 버튼을 클릭한 후 다시 시도해주세요.`
      );
    } finally {
      setIsLoading(false);
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
        alert('✅ 예상대로 리프레시 토큰 갱신에 실패했습니다. 자동 재시도 후 로그아웃 처리됩니다.');
        // 자동으로 랜딩 페이지로 이동
        window.location.href = '/landing';
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

  // 토큰 정보 확인
  const checkTokenInfo = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('토큰이 없습니다.');
      return;
    }

    try {
      // JWT 토큰 디코딩
      const parts = token.split('.');
      const payload = JSON.parse(atob(parts[1]));

      const expiryTime = getTokenExpiryTime(token);
      const isExpiringSoon = isTokenExpiringSoon(token);
      const hasCookie = hasRefreshTokenCookie();

      const expiryDate = expiryTime ? new Date(expiryTime).toLocaleString() : '알 수 없음';
      const timeLeft = expiryTime ? Math.max(0, Math.floor((expiryTime - Date.now()) / 1000 / 60)) : 0;

      // 토큰 발급 시간 계산
      const issuedAt = payload.iat ? new Date(payload.iat * 1000).toLocaleString() : '알 수 없음';
      const tokenDuration = payload.exp && payload.iat ? Math.floor((payload.exp - payload.iat) / 60) : 0;

      alert(
        `토큰 정보:\n\n` +
          `발급 시간: ${issuedAt}\n` +
          `만료 시간: ${expiryDate}\n` +
          `토큰 유효 기간: ${tokenDuration}분\n` +
          `남은 시간: ${timeLeft}분\n` +
          `곧 만료: ${isExpiringSoon ? '예' : '아니오'}\n` +
          `리프레시 쿠키: ${hasCookie ? '있음' : '없음'}\n\n` +
          `서버 설정 토큰 만료 시간: ${tokenDuration}분`
      );
    } catch (error) {
      alert('토큰 파싱에 실패했습니다: ' + error);
    }
  };

  // 자동 토큰 재발급 시작/중지
  const toggleAutoRefresh = () => {
    if (getAutoRefreshTimer()) {
      stopAutoTokenRefresh();
      alert('자동 토큰 재발급이 중지되었습니다.');
    } else {
      startAutoTokenRefresh();
      alert('자동 토큰 재발급이 시작되었습니다. (1시간 간격)');
    }
  };

  // 개발 환경에서만 표시 (배포 환경에서는 완전히 제거)
  if (import.meta.env.PROD || import.meta.env.NODE_ENV === 'production') {
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
        borderRadius: '5px',
        maxWidth: '300px'
      }}>
      <h4>토큰 테스트 (개발용)</h4>

      {/* 로그인 버튼 추가 */}
      <button
        onClick={loginToGetRefreshToken}
        disabled={isLoading}
        style={{
          margin: '2px',
          padding: '5px',
          backgroundColor: isLoading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          width: '100%'
        }}>
        {isLoading ? '로그인 중...' : '로그인 (리프레시 토큰 받기)'}
      </button>

      <button
        onClick={checkCookies}
        style={{
          margin: '2px',
          padding: '5px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          width: '100%'
        }}>
        쿠키 확인
      </button>

      <button
        onClick={setCookieManually}
        style={{
          margin: '2px',
          padding: '5px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          width: '100%'
        }}>
        쿠키 수동 설정 (개발용)
      </button>

      <hr style={{ margin: '8px 0' }} />

      <button
        onClick={checkTokenInfo}
        style={{
          margin: '2px',
          padding: '5px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          width: '100%'
        }}>
        토큰 정보 확인
      </button>

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
          cursor: isLoading ? 'not-allowed' : 'pointer',
          width: '100%'
        }}>
        {isLoading ? '처리중...' : '액세스 토큰 만료 + 리프레시'}
      </button>

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
          cursor: isLoading ? 'not-allowed' : 'pointer',
          width: '100%'
        }}>
        {isLoading ? '처리중...' : '리프레시 토큰 만료 테스트'}
      </button>

      <hr style={{ margin: '8px 0' }} />

      <button
        onClick={expireRefreshToken}
        style={{
          margin: '2px',
          padding: '5px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          width: '100%'
        }}>
        리프레시 토큰만 삭제
      </button>

      <button
        onClick={resetTokens}
        style={{
          margin: '2px',
          padding: '5px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          width: '100%'
        }}>
        모든 토큰 리셋
      </button>

      <hr style={{ margin: '8px 0' }} />

      <button
        onClick={toggleAutoRefresh}
        style={{
          margin: '2px',
          padding: '5px',
          backgroundColor: getAutoRefreshTimer() ? '#dc3545' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          width: '100%'
        }}>
        {getAutoRefreshTimer() ? '자동 재발급 중지' : '자동 재발급 시작'}
      </button>
    </div>
  );
};

export default TestTokenButton;
