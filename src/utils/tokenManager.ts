import axiosInstance from '@/services/api/axios';
import { API_ENDPOINTS } from '@/constants';
import { store } from '@/store/redux/store';
import { setToken, logout } from '@/store/redux/reducers/auth';
import { toast } from 'react-toastify';
import { RefreshTokenResponse } from '@/types/auth.type';

// 토큰 만료 시간 (2시간 = 7200초)
const TOKEN_EXPIRY_TIME = 2 * 60 * 60 * 1000; // 2시간을 밀리초로

// 자동 토큰 재발급 타이머
let autoRefreshTimer: NodeJS.Timeout | null = null;

// 타이머 상태 확인을 위한 export
export const getAutoRefreshTimer = () => autoRefreshTimer;

/**
 * JWT 토큰에서 만료 시간을 추출하는 함수
 */
export const getTokenExpiryTime = (token: string): number | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return payload.exp * 1000; // 초를 밀리초로 변환
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('토큰 파싱 오류:', error);
    }
    return null;
  }
};

/**
 * 토큰이 만료되었는지 확인하는 함수
 */
export const isTokenExpired = (token: string): boolean => {
  const expiryTime = getTokenExpiryTime(token);
  if (!expiryTime) return true;

  return Date.now() >= expiryTime;
};

/**
 * 토큰이 곧 만료될 예정인지 확인하는 함수 (5분 전)
 */
export const isTokenExpiringSoon = (token: string): boolean => {
  const expiryTime = getTokenExpiryTime(token);
  if (!expiryTime) return true;

  const fiveMinutes = 5 * 60 * 1000; // 5분을 밀리초로
  return Date.now() >= expiryTime - fiveMinutes;
};

/**
 * 리프레시 토큰 쿠키가 존재하는지 확인하는 함수
 */
export const hasRefreshTokenCookie = (): boolean => {
  return document.cookie.includes('refreshToken=');
};

/**
 * 리프레시 토큰 쿠키 값을 가져오는 함수
 */
export const getRefreshTokenFromCookie = (): string | null => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'refreshToken' && value) {
      return value;
    }
  }
  return null;
};

/**
 * 쿠키에서 리프레시 토큰 만료 시간을 확인하는 함수
 */
export const isRefreshTokenExpired = (): boolean => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'refreshToken' && value) {
      // 쿠키의 만료 시간을 확인 (Max-Age 또는 Expires)
      // 실제로는 서버에서 설정한 만료 시간을 확인해야 하지만,
      // 클라이언트에서는 쿠키 존재 여부로만 판단
      return false;
    }
  }
  return true;
};

/**
 * accessToken 재발급 함수 (reissue API 호출)
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    // 리프레시 토큰 쿠키 확인
    if (!hasRefreshTokenCookie()) {
      if (import.meta.env.DEV) {
        console.log('리프레시 토큰 쿠키가 없습니다.');
      }
      // refreshToken이 없으면 팝업창 띄우기
      handleTokenExpiration();
      return null;
    }

    // 리프레시 토큰이 만료되었는지 확인
    if (isRefreshTokenExpired()) {
      if (import.meta.env.DEV) {
        console.log('리프레시 토큰이 만료되었습니다.');
      }
      handleTokenExpiration();
      return null;
    }

    const response = await axiosInstance.post<RefreshTokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      {},
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const newAccessToken = response.data.data?.accessToken;
    if (!newAccessToken) {
      throw new Error('새 액세스 토큰을 받지 못했습니다.');
    }

    // 새 accessToken 저장
    localStorage.setItem('token', newAccessToken);
    store.dispatch(setToken(newAccessToken));

    if (import.meta.env.DEV) {
      console.log('accessToken 재발급 성공:', new Date().toLocaleString());
      console.log('새 accessToken:', newAccessToken.substring(0, 20) + '...');
    }
    return newAccessToken;
  } catch (error: any) {
    if (import.meta.env.DEV) {
      console.error('accessToken 재발급 실패:', error);
    }

    if (error.response?.status === 401) {
      // refreshToken이 만료되었거나 유효하지 않은 경우
      if (import.meta.env.DEV) {
        console.log('refreshToken이 만료되었거나 유효하지 않습니다.');
      }
      handleTokenExpiration();
    }

    return null;
  }
};

/**
 * 토큰 만료 시 처리 함수
 */
export const handleTokenExpiration = () => {
  localStorage.removeItem('token');
  store.dispatch(logout());
  toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');
  window.location.href = '/landing';
};

/**
 * 자동 토큰 재발급 타이머 설정 (사용하지 않음)
 * @deprecated 자동 재발급은 사용하지 않습니다. 필요할 때만 수동으로 호출하세요.
 */
export const startAutoTokenRefresh = () => {
  if (import.meta.env.DEV) {
    console.log('자동 토큰 재발급은 사용하지 않습니다. 필요할 때만 수동으로 호출하세요.');
  }
  // 자동 재발급을 사용하지 않음
};

/**
 * 자동 토큰 재발급 타이머 중지
 */
export const stopAutoTokenRefresh = () => {
  if (autoRefreshTimer) {
    clearInterval(autoRefreshTimer);
    autoRefreshTimer = null;
    if (import.meta.env.DEV) {
      console.log('자동 토큰 재발급 타이머가 중지되었습니다.');
    }
  }
};

/**
 * 토큰 상태 초기화 (자동 재발급 없음)
 */
export const initializeTokenManager = () => {
  const currentToken = localStorage.getItem('token');

  if (currentToken && hasRefreshTokenCookie()) {
    if (import.meta.env.DEV) {
      console.log('토큰이 유효합니다. 필요할 때만 수동으로 재발급하세요.');
    }

    // 토큰이 곧 만료될 예정이면 경고만 표시 (자동 재발급하지 않음)
    if (isTokenExpiringSoon(currentToken)) {
      if (import.meta.env.DEV) {
        console.log('토큰이 곧 만료될 예정입니다. 필요시 수동으로 재발급하세요.');
      }
    }
  } else {
    if (import.meta.env.DEV) {
      console.log('토큰이나 리프레시 토큰이 없습니다.');
    }
  }
};

/**
 * 로그아웃 시 토큰 관리 정리
 */
export const cleanupTokenManager = () => {
  stopAutoTokenRefresh();
  localStorage.removeItem('token');
};

/**
 * 토큰 상태를 확인하는 함수
 */
export const getTokenStatus = () => {
  const currentToken = localStorage.getItem('token');
  const hasRefreshCookie = hasRefreshTokenCookie();

  if (!currentToken) {
    return { status: 'NO_TOKEN', message: '액세스 토큰이 없습니다.' };
  }

  if (!hasRefreshCookie) {
    return { status: 'NO_REFRESH_TOKEN', message: '리프레시 토큰 쿠키가 없습니다.' };
  }

  if (isTokenExpired(currentToken)) {
    return { status: 'EXPIRED', message: '액세스 토큰이 만료되었습니다. 필요시 수동으로 재발급하세요.' };
  }

  if (isTokenExpiringSoon(currentToken)) {
    return { status: 'EXPIRING_SOON', message: '액세스 토큰이 곧 만료될 예정입니다. 필요시 수동으로 재발급하세요.' };
  }

  return { status: 'VALID', message: '액세스 토큰이 유효합니다.' };
};

/**
 * 수동으로 accessToken 재발급을 시도하는 함수
 */
export const manualTokenRefresh = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const newToken = await refreshAccessToken();
    if (newToken) {
      return { success: true, message: 'accessToken 재발급이 완료되었습니다.' };
    } else {
      return { success: false, message: 'accessToken 재발급에 실패했습니다.' };
    }
  } catch (error) {
    return { success: false, message: 'accessToken 재발급 중 오류가 발생했습니다.' };
  }
};
