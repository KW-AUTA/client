import axiosInstance from '@/services/api/axios';
import { API_ENDPOINTS } from '@/constants';
import { store } from '@/store/redux/store';
import { setToken, logout } from '@/store/redux/reducers/auth';
import { toast } from 'react-toastify';
import { RefreshTokenResponse } from '@/types/auth.type';

// 토큰 만료 시간 (1시간 = 3600초)
const TOKEN_EXPIRY_TIME = 60 * 60 * 1000; // 1시간을 밀리초로

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
 * 토큰 재발급 함수
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    // 리프레시 토큰 쿠키 확인
    if (!hasRefreshTokenCookie()) {
      if (import.meta.env.DEV) {
        console.log('리프레시 토큰 쿠키가 없습니다.');
      }
      return null;
    }

    const response = await axiosInstance.post<RefreshTokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      {},
      { withCredentials: true }
    );

    const newAccessToken = response.data.data?.accessToken;
    if (!newAccessToken) {
      throw new Error('새 액세스 토큰을 받지 못했습니다.');
    }

    // 새 토큰 저장
    localStorage.setItem('token', newAccessToken);
    store.dispatch(setToken(newAccessToken));

    if (import.meta.env.DEV) {
      console.log('토큰 재발급 성공:', new Date().toLocaleString());
    }
    return newAccessToken;
  } catch (error: any) {
    if (import.meta.env.DEV) {
      console.error('토큰 재발급 실패:', error);
    }

    if (error.response?.status === 401) {
      // 리프레시 토큰이 만료된 경우
      if (import.meta.env.DEV) {
        console.log('리프레시 토큰이 만료되었습니다.');
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
 * 자동 토큰 재발급 타이머 설정
 */
export const startAutoTokenRefresh = () => {
  // 기존 타이머가 있다면 제거
  stopAutoTokenRefresh();

  // 1시간마다 토큰 재발급
  autoRefreshTimer = setInterval(async () => {
    const currentToken = localStorage.getItem('token');

    if (currentToken && hasRefreshTokenCookie()) {
      console.log('자동 토큰 재발급 시작:', new Date().toLocaleString());
      await refreshAccessToken();
    } else {
      if (import.meta.env.DEV) {
        console.log('토큰이 없거나 리프레시 토큰 쿠키가 없어 자동 재발급을 건너뜁니다.');
      }
    }
  }, TOKEN_EXPIRY_TIME);

  if (import.meta.env.DEV) {
    console.log('자동 토큰 재발급 타이머가 시작되었습니다. (1시간 간격)');
  }
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
 * 토큰 상태 초기화 및 자동 재발급 시작
 */
export const initializeTokenManager = () => {
  const currentToken = localStorage.getItem('token');

  if (currentToken && hasRefreshTokenCookie()) {
    // 토큰이 있고 쿠키도 있으면 자동 재발급 시작
    startAutoTokenRefresh();

    // 토큰이 곧 만료될 예정이면 즉시 재발급
    if (isTokenExpiringSoon(currentToken)) {
      if (import.meta.env.DEV) {
        console.log('토큰이 곧 만료될 예정입니다. 즉시 재발급합니다.');
      }
      refreshAccessToken();
    }
  } else {
    if (import.meta.env.DEV) {
      console.log('토큰이나 리프레시 토큰이 없어 자동 재발급을 시작하지 않습니다.');
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
