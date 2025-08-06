import React from 'react';

const TestTokenButton: React.FC = () => {
  const expireAccessToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const parts = token.split('.');
      const payload = JSON.parse(atob(parts[1]));

      // exp를 현재 시간보다 1시간 전으로 설정
      payload.exp = Math.floor(Date.now() / 1000) - 3600;

      const fakeToken = parts[0] + '.' + btoa(JSON.stringify(payload)) + '.' + parts[2];
      localStorage.setItem('token', fakeToken);

      alert('액세스 토큰이 만료로 설정되었습니다. 페이지를 새로고침하세요.');
    }
  };

  const expireRefreshToken = () => {
    // 리프레시 토큰 쿠키 삭제
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    alert('리프레시 토큰이 삭제되었습니다.');
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
      <button onClick={expireAccessToken} style={{ margin: '2px', padding: '5px' }}>
        액세스 토큰 만료
      </button>
      <br />
      <button onClick={expireRefreshToken} style={{ margin: '2px', padding: '5px' }}>
        리프레시 토큰 삭제
      </button>
      <br />
      <button onClick={resetTokens} style={{ margin: '2px', padding: '5px' }}>
        모든 토큰 리셋
      </button>
    </div>
  );
};

export default TestTokenButton;
